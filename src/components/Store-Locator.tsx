import { useState, useMemo, useEffect, useRef } from "react";
import { Search, MapPin, Navigation, Store, Clock, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, Filter, Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iceCreamMarker from "@/assets/franchise/icecreamloc.png";

// Custom ice cream marker icon
const iceCreamIcon = new L.Icon({
  iconUrl: iceCreamMarker,
  iconSize: [40, 48],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48],
});

// Extended location coordinates for Indian cities
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  "sikar": { lat: 27.6094, lng: 75.1398 },
  "ludhiana": { lat: 30.9010, lng: 75.8573 },
  "punjab": { lat: 31.1471, lng: 75.3412 },
  "jalandhar": { lat: 31.3260, lng: 75.5762 },
  "gurugram": { lat: 28.4595, lng: 77.0266 },
  "gurgaon": { lat: 28.4595, lng: 77.0266 },
  "delhi": { lat: 28.6139, lng: 77.2090 },
  "noida": { lat: 28.5355, lng: 77.3910 },
  "lucknow": { lat: 26.8467, lng: 80.9462 },
  "saharanpur": { lat: 29.9680, lng: 77.5510 },
  "agra": { lat: 27.1767, lng: 78.0081 },
  "vadodara": { lat: 22.3072, lng: 73.1812 },
  "alwar": { lat: 27.5530, lng: 76.6346 },
  "kashipur": { lat: 29.2104, lng: 78.9619 },
  "rajouri": { lat: 33.3790, lng: 74.3120 },
  "vikas nagar": { lat: 30.4692, lng: 77.7757 },
  "kalaburgi": { lat: 17.3297, lng: 76.8343 },
  "bhopal": { lat: 23.2599, lng: 77.4126 },
  "faridabad": { lat: 28.4089, lng: 77.3178 },
  "mohali": { lat: 30.7046, lng: 76.7179 },
  "dhuri": { lat: 30.3681, lng: 75.8673 },
  "ghaziabad": { lat: 28.6692, lng: 77.4538 },
  "ambala": { lat: 30.3752, lng: 76.7821 },
  "sonipat": { lat: 28.9845, lng: 77.0151 },
  "hoshiarpur": { lat: 31.5320, lng: 75.9111 },
  "damoh": { lat: 23.8360, lng: 79.4418 },
  "siliguri": { lat: 26.7271, lng: 88.3953 },
  "kharar": { lat: 30.7457, lng: 76.6466 },
  "mumbai": { lat: 19.0760, lng: 72.8777 },
  "banglore": { lat: 12.9716, lng: 77.5946 },
  "bangalore": { lat: 12.9716, lng: 77.5946 },
  "madurai": { lat: 9.9252, lng: 78.1198 },
  "haldwani": { lat: 29.2183, lng: 79.5130 },
  "nashik": { lat: 19.9975, lng: 73.7898 },
  "nanded": { lat: 19.1383, lng: 77.3210 },
  "modasa": { lat: 23.4657, lng: 73.2980 },
  "ganganagar": { lat: 29.9038, lng: 73.8772 },
  "rupnagar": { lat: 30.9660, lng: 76.5330 },
  "raipur": { lat: 21.2514, lng: 81.6296 },
  "bhillai": { lat: 21.2094, lng: 81.4285 },
  "paonta sahib": { lat: 30.4399, lng: 77.6242 },
  "nalaganda": { lat: 17.4500, lng: 78.3195 },
  "hyderabad": { lat: 17.3850, lng: 78.4867 },
  "chennai": { lat: 13.0827, lng: 80.2707 },
  "pune": { lat: 18.5204, lng: 73.8567 },
  "kolkata": { lat: 22.5726, lng: 88.3639 },
  "kanpur": { lat: 26.4499, lng: 80.3319 },
  "patna": { lat: 25.5941, lng: 85.1376 },
  "jaipur": { lat: 26.9124, lng: 75.7873 },
  "ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "surat": { lat: 21.1702, lng: 72.8311 },
  "nagpur": { lat: 21.1458, lng: 79.0882 },
  "indore": { lat: 22.7196, lng: 75.8577 },
  "chandigarh": { lat: 30.7333, lng: 76.7794 },
  "shimla": { lat: 31.1048, lng: 77.1734 },
  "rishikesh": { lat: 30.0869, lng: 78.2676 },
  "default": { lat: 22.5, lng: 82.0 },
};

const getCityCoords = (city: string | undefined | null): { lat: number; lng: number } => {
  if (!city || typeof city !== 'string' || city.trim() === '') {
    return cityCoordinates["default"];
  }
  
  const normalizedCity = city.toLowerCase().trim();
  for (const [key, coords] of Object.entries(cityCoordinates)) {
    if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
      return coords;
    }
  }
  
  return cityCoordinates["default"];
};

// Component to get map instance and set it to ref, and handle initial bounds
const MapRefSetter = ({ mapRef, allStoreLocations }: { mapRef: React.MutableRefObject<any>; allStoreLocations: any[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      mapRef.current = map;
      
      // Set initial view to show all markers
      if (allStoreLocations.length > 0) {
        const validStores = allStoreLocations.filter(store => store?.City);
        if (validStores.length > 0) {
          const bounds = L.latLngBounds(
            validStores.map((store: any) => {
              const coords = getCityCoords(store.City);
              return [coords.lat, coords.lng] as L.LatLngTuple;
            })
          );
          if (bounds.isValid()) {
            setTimeout(() => {
              map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
            }, 100);
          }
        }
      }
    }
  }, [map, mapRef, allStoreLocations]);
  
  return null;
};

interface StoreLocatorProps {
  id?: string;
}

const ITEMS_PER_PAGE = 5;

const StoreLocator = ({ id }: StoreLocatorProps) => {
  const [activeTab, setActiveTab] = useState<"operative" | "coming">("operative");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedState, setSelectedState] = useState<string>("all");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storeOperatives, setStoreOperatives] = useState<any[]>([]);
  const [comingSoonStores, setComingSoonStores] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<any>(null);

  // Load JSON data with useEffect
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [storeData, comingData] = await Promise.all([
          import("@/assets/franchise/store operatives.json"),
          import("@/assets/franchise/coming-soon-store.json")
        ]);
        
        const storeArray = Array.isArray(storeData?.default) 
          ? storeData.default 
          : Array.isArray(storeData) 
            ? storeData 
            : [];
        const comingArray = Array.isArray(comingData?.default) 
          ? comingData.default 
          : Array.isArray(comingData) 
            ? comingData 
            : [];
        
        setStoreOperatives(storeArray);
        setComingSoonStores(comingArray);
      } catch (err) {
        console.error("Failed to load store data:", err);
        setError("Failed to load store data. Please try refreshing the page.");
        setStoreOperatives([]);
        setComingSoonStores([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const currentStores = useMemo(() => {
    const stores = activeTab === "operative" ? storeOperatives : comingSoonStores;
    return Array.isArray(stores) ? stores : [];
  }, [activeTab, storeOperatives, comingSoonStores]);

  const availableStates = useMemo(() => {
    if (!Array.isArray(currentStores)) return [];

    // Collect, trim and sort states case-insensitively
    const sortedStates = currentStores
      .map((store: any) => (store?.Region || store?.State || "").trim())
      .filter((state: string) => state.length > 0)
      .sort((a: string, b: string) =>
        a.localeCompare(b, "en", { sensitivity: "base" })
      );

    // Remove duplicates while preserving sorted order
    return Array.from(new Set(sortedStates));
  }, [currentStores]);

  const filteredStores = useMemo(() => {
    if (!Array.isArray(currentStores)) return [];
    
    let stores = [...currentStores] as any[];
    
    if (selectedState !== "all") {
      stores = stores.filter((store: any) => {
        const state = (store?.Region || store?.State || "").toLowerCase();
        return state === selectedState.toLowerCase();
      });
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      stores = stores.filter((store: any) => {
        const city = (store?.City || "").toLowerCase();
        const address = (store?.Address || "").toLowerCase();
        const region = (store?.Region || store?.State || "").toLowerCase();
        return city.includes(term) || address.includes(term) || region.includes(term);
      });
    }
    
    return stores;
  }, [searchTerm, currentStores, selectedState]);

  const totalPages = useMemo(() => {
    const length = Array.isArray(filteredStores) ? filteredStores.length : 0;
    return Math.ceil(length / ITEMS_PER_PAGE);
  }, [filteredStores]);
  
  const paginatedStores = useMemo(() => {
    if (!Array.isArray(filteredStores)) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStores.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStores, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, selectedState]);

  // Handle scroll offset
  useEffect(() => {
    if (isLoading) return;
    
    const handleHashScroll = () => {
      if (id && (window.location.hash === `#${id}` || window.location.hash === `#store-locator`)) {
        setTimeout(() => {
          if (sectionRef.current) {
            const isMobile = window.innerWidth < 1024;
            const headerOffset = isMobile ? 120 : 140;
            const elementPosition = sectionRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        }, 200);
      }
    };

    const timeoutId = setTimeout(handleHashScroll, 500);
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, [id, isLoading]);

  // Prepare all store locations for map
  const allStoreLocations = useMemo(() => {
    if (!Array.isArray(filteredStores)) return [];
    
    try {
      return filteredStores
        .filter((store: any) => store != null)
        .map((store: any, index: number) => {
          const coords = getCityCoords(store?.City);
          return {
            ...store,
            id: store?.["S.No"] || store?.["Sr No"] || `store-${index}`,
            lat: coords.lat,
            lng: coords.lng
          };
        });
    } catch (error) {
      console.error('Error processing store locations:', error);
      return [];
    }
  }, [filteredStores]);

  const handleStoreClick = (store: any) => {
    setSelectedStore(store);
    // Fly to the selected location
    if (mapRef.current && store?.City) {
      const coords = getCityCoords(store.City);
      mapRef.current.flyTo([coords.lat, coords.lng], 15, { 
        duration: 1,
        animate: true 
      });
    }
  };

  const getDirectionsUrl = (store: any) => {
    const fullAddress = store.Address 
      ? `${store.Address}, ${store.City}, ${store.State || store.Region}, India`
      : `${store.City}, ${store.State || store.Region}, India`;
    
    const encodedAddress = encodeURIComponent(fullAddress);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedStore(null);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setIsStateDropdownOpen(false);
    setSelectedStore(null);
  };

  // Set initial map view to show all stores
  const initialCenter = useMemo(() => {
    if (allStoreLocations.length > 0) {
      const validStores = allStoreLocations.filter(store => store?.City);
      if (validStores.length > 0) {
        const lats = validStores.map(store => getCityCoords(store.City).lat);
        const lngs = validStores.map(store => getCityCoords(store.City).lng);
        const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
        const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
        return [avgLat, avgLng] as [number, number];
      }
    }
    return [20.5937, 78.9629] as [number, number];
  }, [allStoreLocations]);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className="relative pt-16 pb-10 md:pt-20 md:pb-14 bg-cream" 
      style={{ scrollMarginTop: '140px' }}
    >
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 220px;
        }
        .leaflet-container {
          height: 100% !important;
          width: 100% !important;
          z-index: 0;
        }
        @media (max-width: 1024px) {
          .leaflet-container {
            min-height: 400px !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-honey/20 rounded-full text-honey-dark font-medium text-sm mb-4">
            Find Us Near You
          </span>
          <h2 className="section-title">Store Locator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover Honeyman stores across India
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-honey animate-spin" />
              <p className="text-muted-foreground">Loading store locations...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-honey text-foreground rounded-lg hover:bg-honey-dark transition-colors"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Panel */}
              <div className="w-full lg:w-[400px] flex flex-col border-r border-border lg:border-r lg:border-b-0 border-b max-h-[500px] lg:max-h-none">
                {/* Tabs */}
                <div className="flex border-b border-border flex-shrink-0 bg-white sticky top-0 z-20">
                  <button
                    onClick={() => {
                      setActiveTab("operative");
                      setSelectedStore(null);
                      setSearchTerm("");
                      setSelectedState("all");
                    }}
                    className={`flex-1 w-[200px] px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap ${
                      activeTab === "operative"
                        ? "bg-honey text-foreground border-b-2 border-honey-dark"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Store className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Store Operative</span>
                    <span className="sm:hidden">Operative</span>
                    <span className="bg-honey-dark/20 text-honey-dark px-1.5 sm:px-2 py-0.5 rounded-full text-xs flex-shrink-0">
                      {Array.isArray(storeOperatives) ? storeOperatives.length : 0}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("coming");
                      setSelectedStore(null);
                      setSearchTerm("");
                      setSelectedState("all");
                    }}
                    className={`flex-1 w-[200px] px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap ${
                      activeTab === "coming"
                        ? "bg-honey text-foreground border-b-2 border-honey-dark"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Coming Soon</span>
                    <span className="sm:hidden">Coming</span>
                    <span className="bg-orange-500/20 text-orange-600 px-1.5 sm:px-2 py-0.5 rounded-full text-xs flex-shrink-0">
                      {Array.isArray(comingSoonStores) ? comingSoonStores.length : 0}
                    </span>
                  </button>
                </div>

                {/* Search and State Filter */}
                <div className="p-4 border-b border-border space-y-3 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by city, address..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-honey focus:border-transparent bg-white"
                    />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-lg bg-white hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <span className={selectedState === "all" ? "text-muted-foreground" : "text-foreground font-medium"}>
                          {selectedState === "all" ? "Filter by State/Region" : selectedState}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isStateDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isStateDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => handleStateChange("all")}
                          className={`w-full text-left px-4 py-3 hover:bg-honey/10 transition-colors ${
                            selectedState === "all" ? "bg-honey/20 text-honey-dark font-medium" : "text-foreground"
                          }`}
                        >
                          All States/Regions
                        </button>
                        {availableStates.map((state) => (
                          <button
                            key={state}
                            onClick={() => handleStateChange(state)}
                            className={`w-full text-left px-4 py-3 hover:bg-honey/10 transition-colors border-t border-border/50 ${
                              selectedState === state ? "bg-honey/20 text-honey-dark font-medium" : "text-foreground"
                            }`}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Store List */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  {!Array.isArray(paginatedStores) || paginatedStores.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No stores found matching your search.</p>
                    </div>
                  ) : (
                    paginatedStores.map((store: any, index: number) => {
                      const storeId = store["S.No"] || store["Sr No"] || index;
                      const isSelected = selectedStore && 
                        ((selectedStore["S.No"] && selectedStore["S.No"] === storeId) || 
                         (selectedStore["Sr No"] && selectedStore["Sr No"] === storeId) ||
                         (!selectedStore["S.No"] && !selectedStore["Sr No"] && index === storeId));
                      
                      return (
                        <div
                          key={`${activeTab}-${storeId}-${index}`}
                          onClick={() => handleStoreClick(store)}
                          className={`p-4 border-b border-border cursor-pointer transition-all hover:bg-honey/5 ${
                            isSelected ? "bg-honey/10 border-l-4 border-l-honey" : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <img
                                src={iceCreamMarker}
                                alt="Store"
                                className="w-10 h-12 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-honey-dark text-lg">
                                Honeyman - {store.City}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                {store.Address}
                              </p>
                              <p className="text-muted-foreground text-xs mt-1">
                                {store.Region || store.State}
                              </p>
                              {activeTab === "operative" && (
                                <a
                                  href={getDirectionsUrl(store)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium mt-2 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Navigation className="w-4 h-4" />
                                  Get Directions
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              {activeTab === "coming" && (
                                <span className="inline-flex items-center gap-1 text-orange-600 text-xs font-medium mt-2">
                                  <Clock className="w-3 h-3" />
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-border bg-muted/50">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                  ? "bg-honey text-foreground"
                                  : "text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, Array.isArray(filteredStores) ? filteredStores.length : 0)} of {Array.isArray(filteredStores) ? filteredStores.length : 0} stores
                    </p>
                  </div>
                )}
              </div>

              {/* Map Panel - SIMPLIFIED */}
              <div className="flex-1 relative bg-gray-100 min-h-[320px] sm:min-h-[360px] lg:min-h-[420px] rounded-r-2xl lg:rounded-r-2xl rounded-l-2xl lg:rounded-l-none overflow-hidden w-full">
                <MapContainer
                  center={initialCenter}
                  zoom={allStoreLocations.length > 1 ? 5 : 15}
                  style={{ height: "100%", minHeight: "400px", width: "100%" }}
                  scrollWheelZoom={true}
                  zoomControl={true}
                  className="focus:outline-none z-0"
                >
                  <MapRefSetter mapRef={mapRef} allStoreLocations={allStoreLocations} />
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {allStoreLocations.map((store, index) => {
                    const coords = getCityCoords(store?.City || "");
                    if (!coords) return null;

                    return (
                      <Marker
                        key={`marker-${store.id}-${index}`}
                        position={[coords.lat, coords.lng]}
                        icon={iceCreamIcon}
                        eventHandlers={{
                          click: () => handleStoreClick(store),
                        }}
                      >
                        <Popup>
                          <div className="p-3">
                            <h3 className="font-bold text-honey-dark mb-2">
                              Honeyman - {store.City}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {store.Address}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              {store.Region || store.State}
                            </p>
                            {activeTab === "operative" && (
                              <a
                                href={getDirectionsUrl(store)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm font-medium hover:underline"
                              >
                                <Navigation className="w-4 h-4" />
                                Get Directions
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoreLocator;