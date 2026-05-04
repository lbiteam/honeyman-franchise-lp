import { useState, useEffect } from "react";

import Bee from "@/components/Bee";
import cafe3dModel from "@/assets/Cafe 3d Model copy.webp";
import honeyBg from "@/assets/honey-bg.webp";
import iconNoRoyalty from "@/assets/icon-we-set-up/no -royalty.png";
import iconPremiumQuality from "@/assets/icon-we-set-up/Premiu-quality.png";
import iconBrand from "@/assets/icon-we-set-up/Brand.png";
import iconTransparentInvestment from "@/assets/icon-we-set-up/Transparent-Investment.png";
import iconEasyToUse from "@/assets/icon-we-set-up/easy-to-use.png";
import iconComputeMarketing from "@/assets/icon-we-set-up/compute-marketing.png";
import iconPropertyLocation from "@/assets/benifts-icon/Property & location support.webp";
import iconStaffHiring from "@/assets/benifts-icon/Staff hiring & training.webp";
import iconDesignInterior from "@/assets/benifts-icon/Design & Interior.webp";
import iconMarketing from "@/assets/benifts-icon/Marketing.webp";
import iconLogistics from "@/assets/benifts-icon/Logistics & supply chain.webp";
import iconPosSupport from "@/assets/benifts-icon/POS system support.webp";

interface StoreOperative {
  City: string;
  Region?: string;
}

/* Include items with local benefit icons – used for left/right benefits (pick 6) */
const includesItems = [
  { text: "Property & location support", icon: iconPropertyLocation },
  { text: "Staff hiring & training", icon: iconStaffHiring },
  { text: "Design and Interior", icon: iconDesignInterior },
  { text: "Marketing support", icon: iconMarketing },
  { text: "Logistics & supply chain", icon: iconLogistics },
  { text: "POS system support", icon: iconPosSupport },
];

const leftIncludeItems = includesItems.slice(0, 3);
const rightIncludeItems = includesItems.slice(3, 6);

/* Why Choose Honeyman – feature cards using local assets from icon-we-set-up */
const whyChooseItems = [
  {
    title: "High margin Model",
    desc: "Low operational complexity with strong profit potential",
    icon: iconNoRoyalty,
    sizeClass: "w-14 h-14 sm:w-[72px] sm:h-[72px]",
  },
  {
    title: "Honey-based products",
    desc: "A healthier alternative to refined sugar",
    icon: iconPremiumQuality,
    sizeClass: "w-14 h-14 sm:w-[72px] sm:h-[72px]",
  },
  {
    title: "Strong Brand Identity",
    desc: "Distinct positioning with growing demand",
    icon: iconBrand,
    sizeClass: "w-14 h-14 sm:w-[72px] sm:h-[72px]",
  },

  {
    title: "Easy to Operate",
    desc: "Complete system & operational support",
    icon: iconEasyToUse,
    sizeClass: "w-14 h-14 sm:w-[72px] sm:h-[72px]",
  },
 
];

const WeSetYouUpSection = () => {
  const [operativeCities, setOperativeCities] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const module = await import("@/assets/franchise/store operatives.json");
        const data = (module?.default ?? module) as StoreOperative[] | undefined;
        if (cancelled || !Array.isArray(data)) {
          if (!cancelled && !Array.isArray(data)) setOperativeCities(["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"]);
          return;
        }
        const cities = [...new Set(data.map((s) => (s.City || "").trim()).filter(Boolean))].sort(
          (a, b) => a.localeCompare(b)
        );
        if (!cancelled) setOperativeCities(cities);
      } catch {
        if (!cancelled) setOperativeCities(["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${honeyBg})` }} id="about-us"  
    >
      <div className="absolute inset-0 bg-[#f6ebd8]/85" aria-hidden />
      {/* Bees */}
      <Bee className="absolute top-12 left-[8%] z-10 pointer-events-none opacity-80 animate-float" size={28} />
      <Bee className="absolute top-20 right-[10%] z-10 pointer-events-none opacity-70 animate-float" size={24} />
      <Bee className="absolute bottom-40 left-[12%] z-10 pointer-events-none opacity-75 animate-float" size={26} />
      <Bee className="absolute bottom-32 right-[15%] z-10 pointer-events-none opacity-65 animate-float" size={22} />
      <Bee className="absolute top-1/2 left-[5%] z-10 pointer-events-none opacity-50 animate-float" size={20} />
      <Bee className="absolute top-1/3 right-[6%] z-10 pointer-events-none opacity-60 animate-float" size={24} />

      <div className="container mx-auto px-4 md:px-6 max-w-[1200px] relative z-10">
        {/* Header – Honeyman */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border-2 border-amber-200 shadow-sm">
            You Are Never Alone
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-[#423324] mt-4 mb-2">
            We Set You Up to Succeed
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
            160+ successful franchisees didn&apos;t get there alone. Every step of your journey — from day one training to daily operations — Honeyman is beside you.
          </p>
        </div>

        {/* Benefits grid: left col (3 include items) | center image | right col (3 include items) – symmetrical icon + text */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-8 lg:gap-6 mb-14">
          <div className="flex flex-col gap-5 flex-1 w-full lg:max-w-[280px] min-w-0 items-center lg:items-stretch">
            {leftIncludeItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 justify-center text-center lg:justify-start lg:text-left py-2 px-4 rounded-[30px] hover:bg-white/50 hover:scale-[1.02] transition-all duration-300"
              >
                <img src={item.icon} alt="" className="w-11 h-11 object-contain flex-shrink-0 drop-shadow-md hover:rotate-[5deg] hover:scale-110 transition-transform" />
                <span className="font-medium text-sm text-[#333]">{item.text}</span>
              </div>
            ))}
          </div>

          <img
            src={cafe3dModel}
            alt="Cafe Honeyman"
            className="w-96 sm:w-96 flex-shrink-0 drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] animate-float order-first lg:order-none mx-auto"
          />

          <div className="flex flex-col gap-5 flex-1 w-full lg:max-w-[280px] min-w-0 items-center lg:items-stretch">
            {rightIncludeItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 justify-center text-center lg:justify-start lg:text-left py-2 px-4 rounded-[30px] hover:bg-white/50 hover:scale-[1.02] transition-all duration-300"
              >
                <img src={item.icon} alt="" className="w-11 h-11 object-contain flex-shrink-0 drop-shadow-md hover:rotate-[5deg] hover:scale-110 transition-transform" />
                <span className="font-medium text-sm text-[#333]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Honeyman – preview 12 style with honey colors */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-honey-dark text-center mb-12 mt-12">
          Why Choose Honeyman?
        </h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-16">
          {whyChooseItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-[160px] pb-4 border-b-2 border-amber-500 group"
            >
              <img
                src={item.icon}
                alt=""
                className={`${item.sizeClass ?? "w-14 h-14 sm:w-[70px] sm:h-[70px]"} object-contain mb-4 drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)] group-hover:-translate-y-1 transition-transform duration-300`}
              />
              <h3 className="text-sm font-semibold text-gray-900 leading-snug text-center min-h-[2.25rem] flex items-center justify-center">
                {item.title}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug text-center mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Journey timeline – unchanged */}
        {/* <div className="mb-20 bg-white/70 p-8 md:p-10 rounded-2xl border border-amber-100 shadow-sm">
          <h3 className="section-title text-xl md:text-2xl text-center text-[#4a5d4e] mb-8">
            Your Journey to Profitability
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative space-y-8 md:space-y-0">
            <div className="hidden md:block absolute top-6 left-[10%] w-[80%] h-1 bg-amber-200 -z-10" />
            {[
              { label: "W1", title: "Week 1-2", desc: "HQ Onboarding" },
              { label: "W3", title: "Week 3-6", desc: "Store Prep" },
              { label: "🚀", title: "Week 8", desc: "Grand Opening", rocket: true },
              { label: "M3", title: "Month 3+", desc: "Optimization" },
              { label: "💰", title: "Month 12-18", desc: "Full Payback" },
            ].map((step, i) => (
              <div key={i} className="text-center px-2 w-full md:w-1/5 relative">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border-4 shadow-md ${
                    step.rocket
                      ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white border-white text-2xl scale-110"
                      : "bg-white text-amber-600 font-extrabold border-amber-200"
                  }`}
                >
                  {step.rocket ? <i className="fas fa-rocket" /> : step.label}
                </div>
                <h4 className="font-bold text-gray-900">{step.title}</h4>
                <p className={`text-xs mt-1 ${step.rocket ? "text-amber-600 font-bold" : "text-gray-500"}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Our Operative Cities – unchanged */}
        <div className="mb-4">
          <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase tracking-wide text-[#f9b11f] text-center">
            Our Operative Cities
          </h3>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-6 text-sm">
            We are present across India. Find Honeyman in these cities.
          </p>
        </div>
        <div className="overflow-hidden relative w-full group min-h-[52px] py-2">
          <div
            className="flex w-max gap-3 items-center cities-scroll-track group-hover:[animation-play-state:paused]"
            style={{ animation: operativeCities.length > 0 ? "cities-scroll 80s linear infinite" : "none" }}
          >
            {operativeCities.length > 0 ? (
              [...operativeCities, ...operativeCities].map((city, i) => (
                <div
                  key={`${city}-${i}`}
                  className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white border-2 border-amber-200 text-amber-800 font-semibold text-sm shadow-md hover:border-amber-400 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  {city}
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-sm py-2">Loading cities…</span>
            )}
          </div>
        </div>

        <style>{`
          @keyframes cities-scroll {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .cities-scroll-track:hover { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
};

export default WeSetYouUpSection;
