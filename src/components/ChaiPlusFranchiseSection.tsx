import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  Maximize2,
  Coffee,
  CupSoda,
  Soup,
  Leaf,
  Award,
  TrendingUp,
  ShieldCheck,
  ShoppingCart,
  Hexagon,
  Clock,
} from "lucide-react";
import teaTransparent from "@/assets/tea transparent.webp";
import chaiLogo from "@/assets/LOGO CHAI UPDATED  1NEW PNG (1).png";

type InvestmentTier = {
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  investment: string;
  size: string;
  featured?: boolean;
  payback: string;
};

const investmentTiers: InvestmentTier[] = [
  {
    badge: "Starter",
    title: "Chai Plus",
    subtitle: "Express",
    tagline: "Compact, fast, neighborhood favorite",
    investment: "₹5L – 8L",
    size: "100 – 150 sq ft",
    payback: "12 - 18 months",
  },
  {
    badge: "★ Popular",
    title: "Chai Plus",
    subtitle: "Cafe",
    tagline: "Most-chosen format for new owners",
    investment: "₹15L – 25L",
    size: "500 – 700 sq ft",
    featured: true,
    payback: "12 - 18 months",
  },
  {
    badge: "Premium",
    title: "Chai Plus",
    subtitle: "Lounge",
    tagline: "Full-experience destination cafe",
    investment: "₹50L+",
    size: "1200 – 1700 sq ft",
    payback: "12 - 18 months",
  },
];

type MenuKey = "chai" | "bev" | "food";

const menuData: Record<MenuKey, { name: string }[]> = {
  chai: [
    { name: "Desi Chai" },
    { name: "English Tea" },
    { name: "Herbal Chai" },
    { name: "Masala Cutting" },
    { name: "Saffron Kahwa" },
    { name: "Honey Tulsi Chai" },
  ],
  bev: [
    { name: "Kombucha" },
    { name: "Boba Tea" },
    { name: "Cold Brew" },
    { name: "Fresh Fruit Crush" },
    { name: "Honey Lemonade" },
    { name: "Hydration Water" },
  ],
  food: [
    { name: "Protein Bar" },
    { name: "Honey Muesli" },
    { name: "Breakfast Cereals" },
    { name: "Dark Chocolate" },
    { name: "Multigrain Cookies" },
    { name: "Honey Granola" },
  ],
};

const whyCards = [
  {
    icon: Award,
    stat: "India's Only",
    text: "Honey-sweetened café chain in the country",
  },
  {
    icon: TrendingUp,
    stat: "₹50,000 Cr+",
    text: "Indian chai market growing fast",
  },
  {
    icon: ShieldCheck,
    stat: "46+ Years",
    text: "Built on decades of brand trust",
  },
  {
    icon: Hexagon,
    stat: "Full Support",
    text: "Location, Logistics & supply marketing",
  },
  {
    icon: ShoppingCart,
    stat: "Swiggy & Zomato ",
    text: "Onboarding",
  },
];

const ChaiPlusFranchiseSection = () => {
  const [activeTab, setActiveTab] = useState<MenuKey>("chai");

  return (
    <section
      id="chai-plus-franchise"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(circle at 10% 0%, rgba(243,192,66,0.18), transparent 40%), radial-gradient(circle at 90% 100%, rgba(21,91,58,0.15), transparent 40%), linear-gradient(180deg, #fffbf0 0%, #fdf6e3 100%)",
      }}
    >
      {/* honeycomb dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(212,160,23,0.08) 2px, transparent 3px), radial-gradient(circle at 75% 75%, rgba(21,91,58,0.07) 2px, transparent 3px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        {/* ============== HERO ============== */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left – copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[#0d3b2e] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3c042] shadow-lg">
              <span className="text-[#d4a017]">❦</span>
              Honeyman Chai Plus · Franchise
              <span className="text-[#d4a017]">❦</span>
            </span>

            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-[#0d3b2e] sm:text-5xl lg:text-[64px]">
              Join the Global Revolution
              <br />
              Against{" "}
              <span className="relative inline-block italic font-normal text-[#d4a017]">
                Refined Sugar
                <span
                  aria-hidden
                  className="absolute bottom-1 left-0 -z-0 h-2 w-full rounded-full bg-[#f3c042] opacity-40"
                />
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-[#155b3a] sm:text-lg lg:mx-0">
              Healthy Chai. Happy Planet. Profitable Future. India&apos;s 1st
              honey-sweetened chai &amp; cafe brand is opening doors for
              like-minded entrepreneurs.
            </p>

            {/* Logo + CTAs */}
            <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:items-center lg:justify-start">
              <img
                src={chaiLogo}
                alt="Honeyman Chai Plus"
                className="h-16 w-auto drop-shadow-md sm:h-20"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#chai-plus-invest"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#155b3a] to-[#0d3b2e] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#f3c042] shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Explore Models
                </a>
                <Link
                  to="/#franchise-form"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#0d3b2e] bg-white/70 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#0d3b2e] backdrop-blur transition hover:bg-[#0d3b2e] hover:text-[#f3c042]"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* mini stat row */}
            {/* <div className="mt-10 grid grid-cols-3 gap-4 lg:max-w-md">
              {[
                { value: "180+", label: "Outlets" },
                { value: "25+", label: "Cities" },
                { value: "100%", label: "Natural" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#155b3a]/15 bg-white/80 px-3 py-4 text-center shadow-sm backdrop-blur"
                >
                  <div className="font-display text-2xl font-extrabold text-[#0d3b2e]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#1e7a4d]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right – tea transparent image with green halo */}
          <div className="relative flex items-center justify-center mt-10">
            {/* large soft glow */}
            <div
              aria-hidden
              className="absolute inset-0 mx-auto h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#1e7a4d]/30 via-[#155b3a]/15 to-transparent blur-3xl sm:h-[520px] sm:w-[520px]"
            />
            {/* circular green disc behind cup */}
            <div
              aria-hidden
              className="absolute h-[320px] w-[320px] rounded-full bg-gradient-to-br from-[#0d3b2e] to-[#155b3a] shadow-[0_30px_70px_-20px_rgba(13,59,46,0.6)] sm:h-[380px] sm:w-[380px]"
            />
            {/* dashed honey ring */}
            <div
              aria-hidden
              className="absolute h-[360px] w-[360px] rounded-full border-2 border-dashed border-[#f3c042]/60 sm:h-[420px] sm:w-[420px]"
            />

            <img
              src={teaTransparent}
              alt="Honeyman Chai Plus signature cup"
              className="relative z-10  w-[300px] animate-float drop-shadow-[0_25px_35px_rgba(13,59,46,0.45)] sm:w-[380px] lg:w-[440px]"
              loading="lazy"
            />

            {/* Floating honey badge */}
            <div className="absolute -right-2 top-10 z-20 hidden flex-col items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-[#f3c042] to-[#d4a017] px-4 py-3 text-center shadow-2xl sm:flex">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0d3b2e]">
                Sweetened with
              </span>
              <span className="font-display text-lg font-extrabold leading-tight text-[#0d3b2e]">
                Pure Honey
              </span>
            </div>

            {/* Floating zero sugar badge */}
            <div className="absolute -left-2 bottom-8 z-20 hidden flex-col items-center justify-center rounded-2xl border-4 border-white bg-white px-4 py-3 text-center shadow-2xl sm:flex">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1e7a4d]">
                ZERO
              </span>
              <span className="font-display text-base font-extrabold leading-tight text-[#0d3b2e]">
                Refined Sugar
              </span>
            </div>
          </div>
        </div>

        {/* ============== INVESTMENT MODELS ============== */}
        <div id="chai-plus-invest" className="mt-24 scroll-mt-24 md:mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-display text-sm font-semibold tracking-[0.25em] text-[#d4a017]">
                01 — INVEST
              </span>
              <h3 className="mt-2 font-display text-3xl font-extrabold leading-none tracking-tight text-[#0d3b2e] sm:text-4xl lg:text-[44px]">
                Choose your franchise model
              </h3>
            </div>
            <p className="max-w-sm text-sm text-[#1e7a4d] sm:text-right">
              Three formats, one philosophy. Pick the size that fits your
              ambition and city.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {investmentTiers.map((tier) => {
              const isFeatured = !!tier.featured;
              return (
                <div
                  key={tier.subtitle}
                  className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-500 ${
                    isFeatured
                      ? "scale-100 border-transparent bg-[#0d3b2e] text-[#fdf6e3] shadow-[0_30px_60px_-20px_rgba(13,59,46,0.5)] md:-translate-y-3"
                      : "border-[#155b3a]/15 bg-[#fdf6e3] hover:-translate-y-2 hover:bg-white hover:shadow-[0_25px_50px_-20px_rgba(13,59,46,0.3)]"
                  }`}
                >
                  {/* top accent strip */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-[#d4a017] to-[#f3c042] transition-transform duration-500 ${
                      isFeatured ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />

                  <span
                    className={`inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                      isFeatured
                        ? "bg-[#d4a017] text-[#0d3b2e]"
                        : "bg-[#0d3b2e] text-[#f3c042]"
                    }`}
                  >
                    {tier.badge}
                  </span>

                  <div
                    className={`mt-5 flex h-16 w-16 items-center justify-center rounded-2xl ${
                      isFeatured ? "bg-[#d4a017]/15" : "bg-[#1e7a4d]/10"
                    }`}
                  >
                    <Coffee
                      className={`h-8 w-8 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                        isFeatured ? "text-[#f3c042]" : "text-[#155b3a]"
                      }`}
                      strokeWidth={2}
                    />
                  </div>

                  <h4
                    className={`mt-5 font-display text-2xl font-extrabold leading-tight ${
                      isFeatured ? "text-white" : "text-[#0d3b2e]"
                    }`}
                  >
                    {tier.title}
                    <br />
                    {tier.subtitle}
                  </h4>
                  <p
                    className={`mt-1 text-sm ${
                      isFeatured ? "text-[#f3c042]" : "text-[#1e7a4d]"
                    }`}
                  >
                    {tier.tagline}
                  </p>

                  {/* stat rows */}
                  <div
                    className={`mt-6 flex items-center gap-3 border-t border-dashed py-3.5 ${
                      isFeatured ? "border-[#f3c042]/25" : "border-[#155b3a]/20"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                        isFeatured
                          ? "bg-[#d4a017] text-[#0d3b2e]"
                          : "bg-[#0d3b2e] text-[#f3c042]"
                      }`}
                    >
                      <IndianRupee className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                          isFeatured ? "text-[#f3c042]" : "text-[#1e7a4d]"
                        }`}
                      >
                        Investment
                      </div>
                      <div
                        className={`font-display text-lg font-bold ${
                          isFeatured ? "text-white" : "text-[#0d3b2e]"
                        }`}
                      >
                        {tier.investment}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-3 border-t border-dashed py-3.5 ${
                      isFeatured ? "border-[#f3c042]/25" : "border-[#155b3a]/20"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                        isFeatured
                          ? "bg-[#d4a017] text-[#0d3b2e]"
                          : "bg-[#0d3b2e] text-[#f3c042]"
                      }`}
                    >
                      <Maximize2 className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                          isFeatured ? "text-[#f3c042]" : "text-[#1e7a4d]"
                        }`}
                      >
                        Size
                      </div>
                      <div
                        className={`font-display text-lg font-bold ${
                          isFeatured ? "text-white" : "text-[#0d3b2e]"
                        }`}
                      >
                        {tier.size}
                      </div>
                    </div>
                   
                  </div>
                  <div
                    className={`mt-6 flex items-center gap-3 border-t border-dashed py-3.5 ${
                      isFeatured ? "border-[#f3c042]/25" : "border-[#155b3a]/20"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                        isFeatured
                          ? "bg-[#d4a017] text-[#0d3b2e]"
                          : "bg-[#0d3b2e] text-[#f3c042]"
                      }`}
                    >
                      <Clock className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                          isFeatured ? "text-[#f3c042]" : "text-[#1e7a4d]"
                        }`}
                      >
                        Payback
                      </div>
                      <div
                        className={`font-display text-lg font-bold ${
                          isFeatured ? "text-white" : "text-[#0d3b2e]"
                        }`}
                      >
                        {tier.payback}
                      </div>
                    </div>
                  </div>
                
                </div>
              );
            })}
          </div>
        </div>

        {/* ============== MENU TABS ============== */}
        <div className="mt-24 md:mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-display text-sm font-semibold tracking-[0.25em] text-[#d4a017]">
                02 — TASTE
              </span>
              <h3 className="mt-2 font-display text-3xl font-extrabold leading-none tracking-tight text-[#0d3b2e] sm:text-4xl lg:text-[44px]">
                The signature menu
              </h3>
            </div>
            <p className="max-w-sm text-sm text-[#1e7a4d] sm:text-right">
              Honey-sweetened chai, wellness drinks, and clean-label snacks. Tap
              a category to explore.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#0d3b2e] p-7 text-[#fdf6e3] shadow-2xl sm:p-10 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(243,192,66,0.18), transparent 70%)",
              }}
            />

            {/* tabs */}
            <div className="relative z-10 mb-8 flex flex-wrap gap-2">
              {[
                { key: "chai" as MenuKey, label: "Chai Specials", icon: Coffee },
                {
                  key: "bev" as MenuKey,
                  label: "Specialty Beverages",
                  icon: CupSoda,
                },
                {
                  key: "food" as MenuKey,
                  label: "Food & Wellness",
                  icon: Soup,
                },
              ].map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                      active
                        ? "border border-[#d4a017] bg-[#d4a017] text-[#0d3b2e] shadow-md"
                        : "border border-[#f3c042]/30 bg-transparent text-[#fdf6e3] hover:border-[#d4a017] hover:bg-[#f3c042]/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* menu grid */}
            <div
              key={activeTab}
              className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {menuData[activeTab].map((item, i) => (
                <div
                  key={`${activeTab}-${item.name}`}
                  className="group flex animate-fade-in items-center gap-3.5 rounded-2xl border border-[#f3c042]/15 bg-[#fdf6e3]/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a017] hover:bg-[#f3c042]/10"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Leaf
                    className="h-6 w-6 flex-shrink-0 text-[#7cb342]"
                    fill="#7cb342"
                  />
                  <span className="font-display text-base font-semibold sm:text-lg">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============== WHY US ============== */}
        <div className="mt-24 md:mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-display text-sm font-semibold tracking-[0.25em] text-[#d4a017]">
                03 — WHY
              </span>
              <h3 className="mt-2 font-display text-3xl font-extrabold leading-none tracking-tight text-[#0d3b2e] sm:text-4xl lg:text-[44px]">
                Why Chai Plus is the future
              </h3>
            </div>
            <p className="max-w-sm text-sm text-[#1e7a4d] sm:text-right">
              Five reasons backed by trend, trust, and a ₹50,000 Cr+ market.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {whyCards.map(({ icon: Icon, stat, text }) => (
              <div
                key={stat}
                className="group relative overflow-hidden rounded-2xl border border-[#155b3a]/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#d4a017] hover:shadow-[0_20px_40px_-15px_rgba(212,160,23,0.3)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fef6df] transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-[#0d3b2e]">
                  <Icon className="h-6 w-6 text-[#0d3b2e] transition-colors group-hover:text-[#f3c042]" />
                </div>
                <div className="font-display text-lg font-extrabold leading-tight text-[#0d3b2e] sm:text-xl">
                  {stat}
                </div>
                <p className="mt-1.5 text-xs leading-snug text-[#1e7a4d] sm:text-[13px]">
                  {text}
                </p>

                <span
                  aria-hidden
                  className="absolute inset-x-1/2 bottom-0 h-1 w-3/5 origin-center -translate-x-1/2 scale-x-0 rounded-t-md bg-[#d4a017] transition-transform duration-300 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChaiPlusFranchiseSection;
