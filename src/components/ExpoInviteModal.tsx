import { useEffect, useState } from "react";
import { X, MapPin, Calendar, ArrowRight } from "lucide-react";
import expoLogo from "@/assets/logo (3).png";
import trailerImage from "@/assets/franchise-trailor.webp";

const SESSION_KEY = "expo-invite-shown";

const ExpoInviteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const t = window.setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1200);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const close = () => setIsOpen(false);

  const scrollToForm = () => {
    close();
    setTimeout(() => {
      document
        .getElementById("franchise-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expo-invite-title"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] animate-fade-in max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(160deg, #fffbf0 0%, #fdf6e3 60%, #fff 100%)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur transition hover:rotate-90 hover:bg-white sm:right-4 sm:top-4"
          aria-label="Close invitation"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Decorative corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(243,192,66,0.4), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(21,91,58,0.18), transparent 70%)",
          }}
        />

        <div className="relative z-10 grid gap-0 md:grid-cols-[1.05fr,1fr] overflow-y-auto">
          {/* LEFT: Trailer image */}
          <div className="relative bg-[#0d3b2e] p-4 sm:p-6 md:p-7">
            {/* Tag */}
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              You&apos;re Invited
            </span>

            <div className="overflow-hidden rounded-2xl border-4 border-[#f3c042] shadow-2xl">
              <img
                src={trailerImage}
                alt="Honeyman at Franchise India Expo 2026"
                className="block h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-[#fdf6e3]">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Calendar className="h-4 w-4 text-[#f3c042]" />
                <span className="font-semibold">16-17 May 2026</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 text-[#f3c042]" />
                <span className="font-semibold">Yashobhoomi, Dwarka, Delhi</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Invitation copy */}
          <div className="flex flex-col justify-center p-5 sm:p-7 md:p-8">
            {/* Expo logo */}
            <img
              src={expoLogo}
              alt="Franchise India 2026"
              className="mb-4 h-12 w-auto sm:h-14"
            />

            <h2
              id="expo-invite-title"
              className="font-display text-2xl font-extrabold leading-tight text-[#0d3b2e] sm:text-3xl"
            >
              Meet{" "}
              <span className="italic text-[#d4a017]">Honeyman</span>
              <br /> Live at the Expo
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-[15px]">
              Step into India&apos;s biggest franchise showcase and discover why
              <strong className="text-[#155b3a]"> 180+ Live+Signed  </strong>
              have already chosen the Honeyman family. Taste our
              honey-sweetened chai, explore our cafe formats, and meet our
              founders in person at our stall C-3,4,5 & C-10,11,12.
            </p>

            {/* Highlight chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Product Tasting",
                "Investment Q&A",
                "Special Expo Offers",
              ].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[#155b3a]/20 bg-white px-3 py-1 text-[11px] font-semibold text-[#155b3a] shadow-sm"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b88a12] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Book a Meeting
                <ArrowRight className="h-4 w-4" />
              </button>
              {/* <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#0d3b2e]/15 bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0d3b2e] transition hover:border-[#0d3b2e] hover:bg-[#fdf6e3]"
              >
                Maybe later
              </button> */}
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              Limited slots — pre-register to skip the queue at our booth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpoInviteModal;
