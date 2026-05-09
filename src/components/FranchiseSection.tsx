import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import Bee from "@/components/Bee";
import iceCreamCart from "@/assets/franchise/ice-cream-cart.webp";
import iceCreamParlour from "@/assets/franchise/ice-cream-parlour.webp";
import cafeBanner from "@/assets/cafe-image.webp";
import cafeOutlet from "@/assets/cafe-outlet.webp";
import sectionBg from "@/assets/website-banners/mission-2026-banner/banner.webp";

type ModelKey = "basic" | "medium" | "bigger";

const modelImages: Record<ModelKey, string> = {
  basic: iceCreamCart,
  medium: iceCreamParlour,
  bigger: cafeBanner,
};

const modelMeta: Record<
  ModelKey,
  {
    name: string;
    tagline: string;
    investment: string;
    cardFeatures: string[];
    features: string[];
  }
> = {
  basic: {
    name: "Ice Cream Cart",
    tagline: "Affordable Investment",
    investment: "₹4-5L",
    cardFeatures: [
      "Custom branded cart",
      "Basic product range",
      "Low investment start",
    ],
    features: [
      "Small retail footprint",
      "Basic yet profitable product range",
      "Training & operational support",
      "Marketing materials and launch support",
      "Location flexibility with territory focus",
    ],
  },
  medium: {
    name: "Ice Cream Parlour",
    tagline: "Mid-size Investment",
    investment: "₹15-20L",
    cardFeatures: [
      "Flagship parlour setup",
      "Premium interior design",
      "Regional exclusivity",
    ],
    features: [
      "Medium-sized, high-footfall parlour",
      "Full product portfolio",
      "Comprehensive training for staff",
      "Strong marketing and launch campaigns",
      "Territory exclusivity",
      "Dedicated account manager",
      "Ice cream counter and dine‑in capability",
    ],
  },
  bigger: {
    name: "Cafe Honeyman",
    tagline: "Premium Investment",
    investment: "₹25-30L",
    cardFeatures: [
      "Full product range",
      "Territory exclusivity",
      "Dedicated account manager",
    ],
    features: [
      "Flagship cafe outlet with dine‑in",
      "Complete product portfolio including beverages & food",
      "Extensive training and onboarding program",
      "Full marketing and branding package",
      "Regional exclusivity",
      "Scope for multiple outlets",
      "Ice cream parlour + cafe hybrid model",
      "Priority support around the clock",
    ],
  },
};

const FranchiseSection = () => {
  const { pathname } = useLocation();
  const [selectedModel, setSelectedModel] = useState<ModelKey | null>(null);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedModel(null);
    };
    if (selectedModel) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [selectedModel]);

  return (
    <section
      id="franchise-models"
      className="py-16 md:py-20 text-white relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.85), rgba(15, 15, 15, 0.85)), url(${sectionBg})`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* Left column – premium card (Cafe Honeyman) */}
          <div className="flex-[1.1] flex">
            <div className="w-full bg-[#f5f0e1] border-4 border-[#f0980a] rounded-xl text-[#222] flex flex-col overflow-hidden shadow-xl">
              <div className="relative p-1">
                <img
                  src={modelImages.bigger}
                  alt={modelMeta.bigger.name}
                  className="w-full h-[280px] sm:h-[320px] md:h-[380px] object-cover rounded-t-lg object-top"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#f0980a] text-white font-semibold text-lg sm:text-xl md:text-2xl px-4 py-2 sm:px-6 sm:py-2.5 rounded-full whitespace-nowrap z-10 shadow-md">
                  {modelMeta.bigger.name.toUpperCase()}
                </div>
              </div>
              <div className="pt-10 pb-6 px-6 flex flex-col flex-1 items-center text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{modelMeta.bigger.investment}</h3>
                <p className="text-sm text-[#444] flex-1 max-w-sm">{modelMeta.bigger.tagline}</p>
                <button
                  type="button"
                  onClick={() => setSelectedModel("bigger")}
                  className="mt-5 bg-[#f0980a] hover:bg-[#3a4a35] text-white font-semibold text-xs uppercase tracking-wide py-2.5 px-6 rounded-full transition"
                >
                  Know More
                </button>
              </div>
            </div>
          </div>

          {/* Right column – header + two small cards */}
          <div className="flex-1 flex flex-col justify-between gap-6 lg:gap-8">
            <div className="text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-3">
                Our Franchise Models
              </h2>
              <p className="text-sm text-gray-300 max-w-[90%] mx-auto uppercase leading-relaxed">
                Choose the format that fits your budget and location. Join India&apos;s trusted honey‑sweetened ice cream &amp; cafe brand.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 flex-1">
              {/* Small card – Ice Cream Cart */}
              <div className="flex-1 bg-[#f5f0e1] border-4 border-[#f0980a] rounded-xl text-[#222] flex flex-col overflow-hidden shadow-lg">
                <div className="relative p-1">
                  <img
                    src={modelImages.basic}
                    alt={modelMeta.basic.name}
                    className="w-full h-[160px] sm:h-[180px] object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#f0980a] text-white font-semibold text-sm px-3 py-1.5 rounded-full whitespace-nowrap z-10 shadow-md">
                    {modelMeta.basic.name.toUpperCase()}
                  </div>
                </div>
                <div className="pt-8 pb-4 px-4 flex flex-col flex-1 items-center text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{modelMeta.basic.investment}</h3>
                  <p className="text-xs text-[#444] flex-1">{modelMeta.basic.tagline}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedModel("basic")}
                    className="mt-4 bg-[#f0980a] hover:bg-[#3a4a35] text-white font-semibold text-xs uppercase tracking-wide py-2 px-5 rounded-full transition"
                  >
                    Know More
                  </button>
                </div>
              </div>

              {/* Small card – Ice Cream Parlour */}
              <div className="flex-1 bg-[#f5f0e1] border-4 border-[#f0980a] rounded-xl text-[#222] flex flex-col overflow-hidden shadow-lg">
                <div className="relative p-1">
                  <img
                    src={modelImages.medium}
                    alt={modelMeta.medium.name}
                    className="w-full h-[160px] sm:h-[180px] object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#f0980a] text-white font-semibold text-sm px-3 py-1.5 rounded-full whitespace-nowrap z-10 shadow-md">
                    {modelMeta.medium.name.toUpperCase()}
                  </div>
                </div>
                <div className="pt-8 pb-4 px-4 flex flex-col flex-1 items-center text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{modelMeta.medium.investment}</h3>
                  <p className="text-xs text-[#444] flex-1">{modelMeta.medium.tagline}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedModel("medium")}
                    className="mt-4 bg-[#f0980a] hover:bg-[#3a4a35] text-white font-semibold text-xs uppercase tracking-wide py-2 px-5 rounded-full transition"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model detail modal */}
      {selectedModel && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedModel(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="model-modal-title"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-amber-100 bg-amber-50/50">
              <h2 id="model-modal-title" className="text-lg font-bold text-gray-900">
                {modelMeta[selectedModel].name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedModel(null)}
                className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-gray-700 flex items-center justify-center transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 min-h-0 relative bg-gradient-to-b from-amber-50/80 to-orange-50/60">
              {/* Bees in modal */}
              <Bee className="absolute top-8 right-6 z-10 pointer-events-none opacity-70" size={22} />
              <Bee className="absolute top-1/3 left-4 z-10 pointer-events-none opacity-50" size={18} />
              <Bee className="absolute bottom-32 right-8 z-10 pointer-events-none opacity-60" size={20} />
              <div className="aspect-[4/3] w-full bg-amber-50 overflow-hidden">
                <img
                  src={selectedModel === "bigger" ? cafeOutlet : modelImages[selectedModel]}
                  alt={modelMeta[selectedModel].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-amber-600 font-semibold uppercase tracking-wide mb-1">
                  Investment
                </p>
               
                <p className="text-2xl font-bold text-gray-900 mb-6">
                  {modelMeta[selectedModel].investment}
                </p>

                {/* Long-form English descriptions per model */}
                {selectedModel === "basic" && (
                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed rounded-2xl bg-amber-50/70 border border-amber-100 p-5 md:p-6 relative">
                    <p>
                      <strong>Bring the Sweetness to the Streets:</strong> The Honeyman Ice Cream Cart is a
                      low‑investment, highly mobile franchise model designed for maximum reach and
                      irresistible profitability.
                    </p>
                    <p>
                      With over <strong>100+ successful locations</strong> already thriving across India, Honeyman is
                      a trusted household name. Now you can take our signature honey‑infused ice creams
                      directly to the crowds—local markets, corporate parks, events and more.
                    </p>
                    <h3 className="font-semibold text-amber-600 mt-4">Why choose a Honeyman Ice Cream Cart?</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>The power of the Honeyman brand:</strong> Step into a rapidly expanding network of
                        180+ successful outlets with ready brand trust.
                      </li>
                      <li>
                        <strong>Low investment, high margins:</strong> Avoid heavy rentals and fit‑outs for a faster
                        ROI.
                      </li>
                      <li>
                        <strong>Guilt‑free, premium indulgence:</strong> Naturally sweetened with premium Honeyman
                        honey-based products that practically sell themselves.
                      </li>
                      
                    </ul>
                    <h3 className="font-semibold text-amber-600 mt-4">Unmatched franchisee support</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Turnkey cart setup</strong> – fully branded and ready‑to‑operate from day one.
                      </li>
                      <li>
                        <strong>Product supply & logistics</strong> – automated inventory restocking from our
                        central kitchens.
                      </li>
                      <li>
                        <strong>Marketing & digital support</strong> – local SEO, geo‑targeted ads, and social
                        campaigns.
                      </li>
                      <li>
                        <strong>Operational training</strong> – complete training on handling, service and
                        maintenance.
                      </li>
                    </ul>
                    <h3 className="font-semibold text-amber-600 mt-4">What you need to get started</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Minimal storage space for backup inventory and overnight cart parking.</li>
                      <li>Easily operated by 1–2 trained staff members.</li>
                      <li>Passion and a friendly attitude to build a profitable local business.</li>
                    </ul>
                  </div>
                )}

                {selectedModel === "medium" && (
                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed rounded-2xl bg-amber-50/70 border border-amber-100 p-5 md:p-6 relative">
                    <p>
                      <strong>Scoop up success:</strong> The Honeyman Ice Cream Parlour is a premium, brick‑and‑mortar
                      franchise designed for entrepreneurs who want to dominate the dessert market in their city.
                    </p>
                    <p>
                      With <strong>160+ successful locations</strong> across India, Honeyman already commands strong
                      trust and loyalty. Your parlour becomes the go‑to destination for honey‑infused ice creams,
                      decadent sundaes, gourmet thick shakes and more.
                    </p>
                    <h3 className="font-semibold text-amber-600 mt-4">
                      Why invest in a Honeyman Ice Cream Parlour?
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Unbeatable USP:</strong> Naturally sweetened with premium honey—health‑conscious yet
                        indulgent.
                      </li>
                      <li>
                        <strong>Expanded menu, higher revenue:</strong> Waffles, sundaes, shakes and coffee pairings
                        drive higher average bills.
                      </li>
                      <li>
                        <strong>Brand power:</strong> Join a trusted FMCG network with built‑in customer trust.
                      </li>
                      <li>
                        <strong>All‑season appeal:</strong> Comfortable interiors and a diverse menu keep footfall
                        strong all year round.
                      </li>
                    </ul>
                    <h3 className="font-semibold text-amber-600 mt-4">
                      End‑to‑end franchise support
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Store design & fit‑out with branded interiors and layouts.</li>
                      <li>Smart POS.</li>
                      <li>Aggressive local marketing and digital campaigns.</li>
                      <li>Comprehensive training for hospitality, upselling and hygiene.</li>
                      <li>Seamless supply chain for proprietary ingredients and packaging.</li>
                    </ul>
                    <h3 className="font-semibold text-amber-600 mt-4">
                      What we look for in a parlour partner
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>150–450 sq. ft. carpet area in a high‑potential location.</li>
                      <li>High streets, malls, food courts or dense residential clusters.</li>
                      <li>Ability to manage a small team of 1-2 people.</li>
                      <li>Drive to deliver a premium guest experience.</li>
                    </ul>
                  </div>
                )}

                {selectedModel === "bigger" && (
                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed rounded-2xl bg-amber-50/70 border border-amber-100 p-5 md:p-6 relative">
                    <p>
                      <strong>Brew something extraordinary:</strong> Cafe Honeyman is a premium cafe format where
                      expertly crafted coffee meets the pure sweetness of our signature honey.
                    </p>
                    <p>
                      As customers move away from artificial syrups and refined sugar, Cafe Honeyman offers a
                      sophisticated, health‑conscious alternative without compromising on taste—backed by our{" "}
                      <strong>100+ locations</strong> across India.
                    </p>
                    <h3 className="font-semibold text-amber-600 mt-4">
                      The Cafe Honeyman advantage
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>A menu unlike any other:</strong> Honey‑glazed lattes, artisanal tea, honey‑infused
                        pastries and savoury bites.
                      </li>
                      <li>
                        <strong>Dual revenue streams:</strong> Cafe and retail sales of Honeyman FMCG products.
                      </li>
                      <li>
                        <strong>Premium ambience:</strong> Warm, modern interiors built for professionals, friends and
                        families to connect.
                      </li>
                    </ul>
                    <h3 className="font-semibold text-amber-600 mt-4">
                      Next‑level support & technology
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Smart POS.</li>
                      <li>Digital marketing and local SEO to keep footfall consistent.</li>
                      <li>Turnkey design, build‑out and equipment setup.</li>
                      <li>Masterclass‑level training for baristas and service teams.</li>
                    </ul>
                    <h3 className="font-semibold text-amber-600 mt-4">
                      Ideal Cafe Honeyman partner
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>500 - 800 SQ FT in a prime, visible location.</li>
                      <li>High streets, tech parks, malls or premium neighbourhoods.</li>
                      <li>Ability to lead a 1-3 member hospitality team.</li>
                      <li>Vision to build a written‑driven, premium cafe destination.</li>
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedModel(null);
                    if (pathname === "/") {
                      setTimeout(() => {
                        document.getElementById("franchise-form")?.scrollIntoView({ behavior: "smooth" });
                      }, 150);
                    } else {
                      window.location.href = "/#franchise-form";
                    }
                  }}
                  className="block w-full text-center py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg transition shadow-lg"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FranchiseSection;
