import { useEffect, useMemo, useState } from "react";
import { MapPin, Navigation, ChevronDown, ChevronUp } from "lucide-react";
import storeLocatorImg from "@/assets/store-locator-img.webp";
import modelIcon from "@/assets/franchise/MODEL-ICON.webp";

type StoreOperative = {
  "S.No"?: number | string;
  City?: string;
  Region?: string;
  State?: string;
  Address?: string;
  Model?: string;
};

type ComingSoonStore = {
  "Sr No"?: number | string;
  City?: string;
  State?: string;
  Address?: string;
};

type StoreLocatorSimpleProps = {
  id?: string;
  className?: string;
};

const normalize = (value: string) =>
  value.replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim().toLowerCase();

const getDirectionsUrl = (destination: string) => {
  const encoded = encodeURIComponent(destination);
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
};

const StoreLocatorSimple = ({ id, className }: StoreLocatorSimpleProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storeOperatives, setStoreOperatives] = useState<StoreOperative[]>([]);
  const [comingSoonStores, setComingSoonStores] = useState<ComingSoonStore[]>([]);
  const [openState, setOpenState] = useState<string | null>(null); // ← single open accordion

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [storeData, comingData] = await Promise.all([
          import("@/assets/franchise/store operatives.json"),
          import("@/assets/franchise/coming-soon-store.json"),
        ]);
        setStoreOperatives(Array.isArray(storeData?.default) ? storeData.default : []);
        setComingSoonStores(Array.isArray(comingData?.default) ? comingData.default : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load store data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const availableStates = useMemo(() => {
    const operativeStates = storeOperatives.map((s) => (s.Region || s.State || "").trim()).filter(Boolean);
    const comingStates = comingSoonStores.map((s) => (s.State || "").trim()).filter(Boolean);
    return Array.from(new Set([...operativeStates, ...comingStates].sort((a, b) => a.localeCompare(b))));
  }, [storeOperatives, comingSoonStores]);

  const getOperativesForState = (state: string) =>
    storeOperatives.filter((s) => normalize(s.Region || s.State || "") === normalize(state));

  const getComingSoonForState = (state: string) =>
    comingSoonStores.filter((s) => normalize(s.State || "") === normalize(state));

  if (isLoading) {
    return (
      <section id={id} className={`relative py-12 md:py-14 bg-cream ${className ?? ""}`.trim()}>
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-muted-foreground">Loading store locations...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id={id} className={`relative py-12 md:py-14 bg-cream ${className ?? ""}`.trim()}>
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-red-500 mb-4">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`relative py-12 md:py-14 bg-cream ${className ?? ""}`.trim()}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-honey/20 rounded-full text-honey-dark font-medium text-sm mb-4">
            Find Us Near You
          </span>
          <h2 className="section-title">Store Locator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a state to see store operative locations and upcoming deals.
          </p>
        </div>

       
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="w-full bg-white">
              <img src={storeLocatorImg} alt="Store Locator Banner" className="w-full h-auto block select-none" />
            </div>

            {/* <div className="p-6">
              <div className=" flex flex-col-2  p-4  bg-honey/20 rounded-xl ">
              <div className="flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-muted-foreground mb-3 text-center text-bold text-honey-dark">Locate Near Me</label>
              <p className="text-muted-foreground text-sm text-center">find the nearest operative store <br/> based on your location</p>
              </div>
              
              </div>
            </div> */}

            <div className="p-6">
  <label className="block text-sm font-medium text-muted-foreground mb-3">
    OR SELECT YOUR STATE / REGION
  </label>

  {/* 2-column accordion grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {availableStates.map((state) => {
      const isOpen = openState === state;
      const operatives = getOperativesForState(state);
      const comingSoon = getComingSoonForState(state);

      return (
        <div
          key={state}
          className={`border border-border rounded-xl overflow-hidden transition-all ${
            isOpen ? "sm:col-span-2" : ""  // ← spans full width when open
          }`}
        >
          {/* Accordion Header */}
          <button
            type="button"
            onClick={() => setOpenState(isOpen ? null : state)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${
              isOpen
                ? "bg-honey/20 text-honey-dark font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span className="font-semibold text-sm">{state}</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Accordion Body — only shown when open */}
          {isOpen && (
            <div className="px-4 pb-4 pt-3 bg-white">

              {/* Store Operatives */}
              <h3 className="font-bold text-honey-dark text-base mb-2">Store Operative</h3>
              {operatives.length === 0 ? (
                <p className="text-muted-foreground text-sm mb-4">No operative locations found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {operatives.map((store, idx) => {
                    const city = store.City || "Unknown city";
                    const region = store.Region || store.State || "";
                    const address = store.Address || "";
                    const model = store.Model || "";
                    const destination = [address, city, region].filter(Boolean).join(", ");
                    const href = getDirectionsUrl(destination);
                    const storeKey = store["S.No"] ?? `${city}-${idx}`;

                    return (
                      <div key={storeKey} className="border border-border rounded-xl p-4 bg-muted/30">
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="font-bold text-foreground">Honeyman - {city}</div>
                            {region && <div className="text-muted-foreground text-sm mt-1">{region}</div>}
                            {model && (
                              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-honey/20 rounded-full w-fit">
                                <img src={modelIcon} alt="model-icon" className="w-12 h-12 object-cover" />
                                <span className="text-honey-dark text-base font-semibold">{model}</span>
                              </div>
                            )}
                            {address && (
                              <pre className="text-muted-foreground text-sm mt-2 whitespace-pre-wrap break-words font-sans">
                                {address}
                              </pre>
                            )}
                          </div>
                          
                            <a href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-honey text-foreground rounded-lg text-sm font-medium hover:bg-honey-dark transition w-fit"
                          >
                            <Navigation className="w-4 h-4" />
                            Get Directions
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Coming Soon */}
              <h3 className="font-bold text-orange-700 text-base mb-2">Coming Soon</h3>
              {comingSoon.length === 0 ? (
                <p className="text-muted-foreground text-sm">No coming soon deals for this state.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {comingSoon.map((store, idx) => {
                    const city = store.City || "Unknown city";
                    const stateLabel = store.State || "";
                    const address = store.Address || "";
                    const storeKey = store["Sr No"] ?? `${city}-coming-${idx}`;

                    return (
                      <div key={storeKey} className="border border-border rounded-xl p-4 bg-orange-50/60">
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="font-bold text-foreground">Honeyman - {city}</div>
                            {stateLabel && <div className="text-muted-foreground text-sm mt-1">{stateLabel}</div>}
                            {address && (
                              <pre className="text-muted-foreground text-sm mt-2 whitespace-pre-wrap break-words font-sans">
                                {address}
                              </pre>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => window.alert("Coming Soon")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition w-fit"
                          >
                            Coming Soon
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocatorSimple;