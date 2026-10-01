import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  Maximize2,
  Clock,
  Coffee,
  CupSoda,
  Soup,
  Award,
  ShieldCheck,
  Truck,
  Droplet,
  ImageIcon,
} from "lucide-react";
import chaiLogo from "@/assets/chaiplus-logo-gold.png";
import chaiCup from "@/assets/chaiplus-cup.webp";
// TODO: swap these dummy images for real outlet / product photos
const outletImg: string | null = null; // e.g. import outletImg from "@/assets/chaiplus-outlet.webp"

/* ============================================================
   Tokens — black & gold, sampled from the HM Chai+ logo
   ============================================================ */
const T = {
  black: "#000000",
  surface: "#100F0D",
  line: "rgba(201,162,75,0.22)",
  gold: "#C9A24B",
  goldLight: "#EBCB7A",
  cream: "#F2E8D2",
  muted: "#A89C86",
};
const serif = "font-['Cormorant_Garamond',Georgia,serif]";
const sans = "font-['Josefin_Sans',system-ui,sans-serif]";
const goldBtn =
  "cp-btn relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-[#F3D88E] via-[#D7AA4C] to-[#A97D2B] font-semibold text-black shadow-[0_12px_30px_-10px_rgba(201,162,75,0.7)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBCB7A]";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBCB7A]";

/* ============================================================
   Content
   ============================================================ */
const investmentTiers = [
  { name: "Express", tagline: "Compact kiosk for busy streets, offices and transit hubs", investment: "₹5L – 8L", size: "100 – 150 sq ft", payback: "12 – 18 months" },
  { name: "Café", tagline: "Our most-chosen format: seating, full menu, delivery-ready", investment: "₹15L – 25L", size: "500 – 700 sq ft", payback: "12 – 18 months", featured: true },
  { name: "Lounge", tagline: "A flagship destination for malls and premium high streets", investment: "₹50L+", size: "1,200 – 1,700 sq ft", payback: "12 – 18 months" },
];

type MenuKey = "chai" | "bev" | "food";
const menuTabs: { key: MenuKey; label: string; icon: typeof Coffee }[] = [
  { key: "chai", label: "Chai", icon: Coffee },
  { key: "bev", label: "Specialty beverages", icon: CupSoda },
  { key: "food", label: "Food & wellness", icon: Soup },
];
const menuData: Record<MenuKey, string[]> = {
  chai: ["Desi Chai", "English Tea", "Herbal Chai", "Masala Cutting", "Saffron Kahwa", "Honey Tulsi Chai"],
  bev: ["Kombucha", "Honey Boba Tea", "Cold Brew", "Fresh Fruit Crush", "Honey Lemonade", "Hydration Water"],
  food: ["Protein Bar", "Honey Muesli", "Breakfast Cereals", "Dark Chocolate", "Multigrain Cookies", "Honey Granola"],
};
const marqueeItems = Object.values(menuData).flat();

const whyPoints = [
  { icon: Award, stat: "India's only", text: "honey-sweetened chai café chain — a category you own in your city from day one." },
  { icon: ShieldCheck, stat: "Since 1984", text: "a family legacy of honey and trust" },
  { icon: Truck, stat: "End-to-end", text: "location, supply chain and launch marketing" },
];

/* ============================================================
   3D tilt — pointer-tracked, desktop only, off for reduced motion
   ============================================================ */
function useTilt<E extends HTMLElement>(max = 10) {
  const ref = useRef<E>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}

const TiltCard = ({ children, className = "", style, max = 8 }: { children: ReactNode; className?: string; style?: CSSProperties; max?: number }) => {
  const ref = useTilt<HTMLDivElement>(max);
  return (
    <div ref={ref} className={`cp-tilt group relative ${className}`} style={style}>
      {/* cursor-following gold spotlight */}
      <span aria-hidden className="cp-spot pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
};

/* ============================================================
   Section
   ============================================================ */
const ChaiPlusFranchiseSection = () => {
  const [activeTab, setActiveTab] = useState<MenuKey>("chai");
  const stageRef = useTilt<HTMLDivElement>(14);

  const trackApply = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
    dl.push({ event: "chaiplus_apply", event_category: "Franchise", event_label: "ChaiPlus – Apply Now" });
  };

  return (
    <section
      id="chai-plus-franchise"
      className={`relative isolate overflow-hidden scroll-mt-24 pb-16 pt-28 sm:pb-20 sm:pt-32 md:pb-28 md:pt-40 ${sans}`}
      style={{ background: T.black, color: T.cream }}
    >
      <style>{css}</style>

      {/* Background: honeycomb + gold glows */}
      <div aria-hidden className="cp-honeycomb pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute -end-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.22),transparent_65%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -start-40 -z-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.12),transparent_65%)] blur-2xl" />

      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        {/* ======================= HERO ======================= */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="text-center lg:text-start">
            <img
              src={chaiLogo}
              alt="Honeyman Chai+ — a family legacy since 1984"
              className="cp-reveal mx-auto h-auto w-[clamp(170px,40vw,250px)] drop-shadow-[0_10px_30px_rgba(201,162,75,0.35)] lg:mx-0"
            />

            <h2
              className={`cp-reveal cp-shimmer mt-8 ${serif} text-[clamp(2.4rem,6.5vw,4.4rem)] font-semibold leading-[1.02]`}
              style={{ animationDelay: "120ms" }}
            >
              Chai, sweetened the way it should be
            </h2>

            <p
              className="cp-reveal mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0"
              style={{ color: T.muted, animationDelay: "220ms" }}
            >
              India's first honey-sweetened chai café, with no added refined sugar. Open a Chai+ outlet backed by
              four decades of Honeyman know-how.
            </p>

            <div className="cp-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: "320ms" }}>
              <Link to="/#franchise-form" onClick={trackApply} className={`${goldBtn} px-8 py-4 text-sm tracking-wide`}>
                Apply for a franchise
              </Link>
              <a
                href="#chai-plus-invest"
                className={`inline-flex items-center justify-center rounded-md border border-[#C9A24B] px-8 py-4 text-sm font-semibold tracking-wide text-[#EBCB7A] transition hover:bg-[#C9A24B]/10 ${focusRing}`}
              >
                Compare formats
              </a>
            </div>

          </div>

          {/* ---------- 3D cup stage ---------- */}
          <div className="relative mx-auto my-8 w-full max-w-[min(440px,88vw)] [perspective:1200px] lg:my-12">
            <div ref={stageRef} className="cp-tilt cp-stage relative [transform-style:preserve-3d]">
              {/* rotating gold ring (back layer) */}
              <div aria-hidden className="cp-ring absolute left-1/2 top-[42%] aspect-square w-[118%] rounded-full" style={{ transform: "translate(-50%,-50%) translateZ(-60px)" }} />
              {/* rising honey drops */}
              {[12, 30, 72, 88].map((left, i) => (
                <span
                  key={left}
                  aria-hidden
                  className="cp-drop absolute bottom-6 h-2.5 w-2.5 rounded-full bg-gradient-to-b from-[#F3D88E] to-[#A97D2B]"
                  style={{ left: `${left}%`, animationDelay: `${i * 1.3}s` }}
                />
              ))}

              {/* arch photo frame */}
              <div className="relative [transform:translateZ(20px)]">
                <div className="absolute -inset-2.5 rounded-t-[999px] rounded-b-3xl border" style={{ borderColor: T.line }} />
                <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border-2 border-[#C9A24B] shadow-[0_40px_80px_-30px_rgba(201,162,75,0.55)]">
                  <img src={chaiCup} alt="Honeyman Chai+ black and gold cup" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span aria-hidden className="cp-glare pointer-events-none absolute inset-0" />
                </div>
              </div>

              {/* floating chips (front layers) */}
              <div className="cp-float absolute end-0 top-[14%] [transform:translateZ(70px)] sm:-end-6">
                <div className="flex items-center gap-2 rounded-xl border border-[#C9A24B] bg-black/85 px-3.5 py-2.5 backdrop-blur">
                  <Droplet className="h-4 w-4 fill-[#D7AA4C] text-[#D7AA4C]" />
                  <span className="text-xs font-semibold text-[#EBCB7A] sm:text-sm">Pure honey</span>
                </div>
              </div>
              <div className="cp-float absolute bottom-[12%] start-0 [transform:translateZ(90px)] sm:-start-8" style={{ animationDelay: "1.5s" }}>
                <div className="rounded-xl bg-gradient-to-b from-[#F3D88E] to-[#B8892F] px-4 py-2.5 text-black shadow-xl">
                  <div className="text-[11px] font-semibold">No added</div>
                  <div className={`${serif} text-lg font-bold leading-none`}>Refined sugar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= MARQUEE ======================= */}
      <div className="relative mt-20 -rotate-1 border-y border-[#C9A24B]/40 bg-gradient-to-r from-[#A97D2B] via-[#E3BC62] to-[#A97D2B] py-3.5 sm:mt-24">
        <div className="cp-marquee flex w-max items-center gap-8 whitespace-nowrap" aria-hidden>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={`flex items-center gap-8 ${serif} text-xl font-semibold text-black sm:text-2xl`}>
              {item}
              <span className="h-2 w-2 rotate-45 bg-black/70" />
            </span>
          ))}
        </div>
        <p className="sr-only">Menu includes chai, specialty beverages and wellness food.</p>
      </div>

      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        {/* ======================= FORMATS ======================= */}
        <div id="chai-plus-invest" className="mt-20 scroll-mt-24 sm:mt-28">
          <SectionHead title="Choose your format" note="Three sizes, one recipe. Pick the one that fits your location and budget." />

          <div className="grid gap-6 md:grid-cols-3 md:items-stretch md:[perspective:1400px]">
            {investmentTiers.map((tier) => {
              const f = !!tier.featured;
              const rows = [
                { icon: IndianRupee, label: "Investment", value: tier.investment },
                { icon: Maximize2, label: "Area", value: tier.size },
                { icon: Clock, label: "Expected payback", value: tier.payback },
              ];
              return (
                <TiltCard
                  key={tier.name}
                  className={`flex flex-col rounded-2xl p-6 sm:p-7 ${f ? "cp-border-glow md:-translate-y-4" : ""}`}
                  style={{
                    background: f ? "linear-gradient(180deg,#221C10 0%,#0C0B09 100%)" : T.surface,
                    border: `1px solid ${f ? T.gold : T.line}`,
                  }}
                >
                  {f && (
                    <span className="absolute -top-3 start-6 rounded-full bg-gradient-to-b from-[#F3D88E] to-[#B8892F] px-3 py-1 text-xs font-semibold text-black shadow-lg">
                      Most popular
                    </span>
                  )}
                  <div className="[transform:translateZ(30px)]">
                    <p className="text-sm" style={{ color: T.muted }}>Chai+</p>
                    <h4 className={`${serif} text-4xl font-semibold`} style={{ color: f ? T.goldLight : T.cream }}>
                      {tier.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed md:min-h-[3rem]" style={{ color: T.muted }}>{tier.tagline}</p>
                  </div>

                  <dl className="mt-6 flex-1">
                    {rows.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-4 border-t py-4" style={{ borderColor: T.line }}>
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#C9A24B] text-[#EBCB7A]">
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <div>
                          <dt className="text-xs" style={{ color: T.muted }}>{label}</dt>
                          <dd className={`${serif} text-xl font-semibold`} style={{ color: T.cream }}>{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                 
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* ======================= MENU ======================= */}
        <div className="mt-20 sm:mt-28">
          <SectionHead title="What you'll serve" note="Honey-sweetened chai, wellness drinks and clean-label snacks." />

          <div className="relative overflow-hidden rounded-3xl border p-5 sm:p-10" style={{ background: T.surface, borderColor: T.line }}>
            <img aria-hidden src={chaiLogo} alt="" className="pointer-events-none absolute -bottom-10 -end-10 w-64 opacity-[0.06] sm:w-96" />

            <div role="tablist" aria-label="Menu categories" className="relative -mx-1 mb-8 flex snap-x gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {menuTabs.map(({ key, label, icon: Icon }) => {
                const active = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(key)}
                    className={`inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${focusRing} ${
                      active
                        ? "border-transparent bg-gradient-to-b from-[#F3D88E] to-[#B8892F] text-black shadow-[0_8px_24px_-8px_rgba(201,162,75,0.7)]"
                        : "border-[#C9A24B]/35 text-[#F2E8D2] hover:border-[#C9A24B]"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    {label}
                  </button>
                );
              })}
            </div>

            <ul key={activeTab} role="tabpanel" className="relative grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {menuData[activeTab].map((item, i) => (
                <li
                  key={item}
                  className={`cp-item flex items-center gap-4 border-b py-4 ${serif} text-xl font-medium sm:text-2xl`}
                  style={{ borderColor: T.line, color: T.cream, animationDelay: `${i * 50}ms` }}
                >
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 rotate-45 bg-gradient-to-br from-[#F3D88E] to-[#A97D2B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ======================= WHY (bento) ======================= */}
        
      </div>
    </section>
  );
};

const ImageTile = ({ src, alt, caption }: { src: string | null; alt: string; caption: string }) => (
  <TiltCard
    max={9}
    className="relative min-h-[220px] overflow-hidden rounded-2xl border"
    style={{ borderColor: T.line, background: T.surface }}
  >
    {src ? (
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
    ) : (
      /* dummy placeholder — shows until a real photo is added */
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,75,0.25),transparent_65%)]">
        <img aria-hidden src={chaiLogo} alt="" className="w-24 opacity-80" />
        <span className="flex items-center gap-1.5 text-xs" style={{ color: T.muted }}>
          <ImageIcon className="h-3.5 w-3.5" /> Photo coming soon
        </span>
      </div>
    )}
    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
    <span className={`absolute bottom-4 start-5 ${serif} text-xl font-semibold text-[#EBCB7A] [transform:translateZ(40px)]`}>
      {caption}
    </span>
  </TiltCard>
);

const SectionHead = ({ title, note }: { title: string; note: string }) => (
  <div className="mb-10 flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-start">
    <h3 className={`cp-shimmer ${serif} text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight`}>{title}</h3>
    <p className="mx-auto max-w-sm text-sm sm:mx-0 sm:text-end" style={{ color: T.muted }}>{note}</p>
  </div>
);

/* ============================================================
   Scoped CSS — keyframes + 3D helpers (no Tailwind config needed)
   ============================================================ */
const css = `
#chai-plus-franchise .cp-honeycomb{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0 32L0 82V66l28 16 28-16v16L28 98z' fill='none' stroke='%23C9A24B' stroke-opacity='0.09'/%3E%3C/svg%3E");
  -webkit-mask-image:radial-gradient(ellipse at 70% 10%,#000 0%,transparent 70%);
          mask-image:radial-gradient(ellipse at 70% 10%,#000 0%,transparent 70%);
}
#chai-plus-franchise .cp-honeycomb-dark{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0 32L0 82V66l28 16 28-16v16L28 98z' fill='none' stroke='%23000' stroke-opacity='0.12'/%3E%3C/svg%3E");
}
#chai-plus-franchise .cp-shimmer{
  background:linear-gradient(100deg,#9A7426 0%,#E9C46A 25%,#FFF1C4 40%,#E9C46A 55%,#9A7426 100%);
  background-size:220% 100%;background-position:100% 0;
  -webkit-background-clip:text;background-clip:text;color:transparent;
}
#chai-plus-franchise .cp-tilt{
  transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transform-style:preserve-3d;transition:transform .35s cubic-bezier(.2,.7,.2,1);will-change:transform;
}
#chai-plus-franchise .cp-spot{
  background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(235,203,122,0.16),transparent 45%);
}
#chai-plus-franchise .cp-glare{
  background:radial-gradient(500px circle at var(--mx,30%) var(--my,20%),rgba(255,241,196,0.22),transparent 40%);
  mix-blend-mode:screen;
}
#chai-plus-franchise .cp-ring{
  background:conic-gradient(from 0deg,transparent 0 20%,rgba(235,203,122,.65) 30%,transparent 40% 70%,rgba(201,162,75,.45) 80%,transparent 90%);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1px));
          mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1px));
}
#chai-plus-franchise .cp-drop{opacity:0}
#chai-plus-franchise .cp-btn::after{
  content:"";position:absolute;inset:0;transform:translateX(-120%);
  background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%);
}
#chai-plus-franchise .cp-btn:hover::after{transform:translateX(120%);transition:transform .8s ease}
#chai-plus-franchise .cp-border-glow{box-shadow:0 0 0 1px rgba(201,162,75,.4),0 30px 70px -25px rgba(201,162,75,.5)}

@media (prefers-reduced-motion:no-preference){
  #chai-plus-franchise .cp-reveal{animation:cp-rise-in .9s cubic-bezier(.2,.7,.2,1) both}
  #chai-plus-franchise .cp-shimmer{animation:cp-shimmer 6s ease-in-out infinite}
  #chai-plus-franchise .cp-ring{animation:cp-spin 18s linear infinite}
  #chai-plus-franchise .cp-float > *{animation:cp-float 5s ease-in-out infinite;animation-delay:inherit}
  #chai-plus-franchise .cp-drop{animation:cp-drop 6s ease-in infinite}
  #chai-plus-franchise .cp-marquee{animation:cp-marquee 45s linear infinite}
  #chai-plus-franchise .cp-item{animation:cp-rise-in .45s ease-out both}
}
@media (prefers-reduced-motion:reduce){ #chai-plus-franchise .cp-drop{display:none} }

@keyframes cp-rise-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes cp-shimmer{0%,100%{background-position:100% 0}50%{background-position:0 0}}
@keyframes cp-spin{to{transform:translate(-50%,-50%) translateZ(-60px) rotate(360deg)}}
@keyframes cp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes cp-drop{0%{opacity:0;transform:translateY(0) scale(.6)}15%{opacity:.9}100%{opacity:0;transform:translateY(-260px) scale(1)}}
@keyframes cp-marquee{to{transform:translateX(-50%)}}
`;

export default ChaiPlusFranchiseSection;