import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cafeTrailer from "@/assets/franchise-trailor.webp";
import cafeKiosk from "@/assets/Honey-chai-cafe.webp";
import cafeOutlet from "@/assets/franchise/ice-cream-parlour.webp";
import ChaiPlusFranchiseSection from "@/components/ChaiPlusFranchiseSection";

/* ─── Google Apps Script Endpoint ─────────────────────────── */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbxUqoxoVt6lsq_1C_WCK76-KLFHiw0ojqcnEDLkJOeKub9rJtVzQMMIYAqC07LG92Kskg/exec";

/* ─── types ─────────────────────────────────────────────── */
type LeadForm = { name: string; phone: string; email: string; city: string; modal: string; invest: string; msg: string };
type ReviewForm = { name: string; message: string; stall: number; product: number };

/* ─── Stars Component ────────────────────────────────────── */
const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div style={{ display: "flex", gap: 4, margin: "8px 0 16px" }}>
    {[1, 2, 3, 4, 5].map((v) => (
      <button
        key={v}
        type="button"
        onClick={() => onChange(v)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
      >
        <svg viewBox="0 0 24 24" width={30} height={30} fill={v <= value ? "#F0B429" : "#d4c08a"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    ))}
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Expo = () => {
  const [lead, setLead] = useState<LeadForm>({ name: "", phone: "", email: "", city: "", modal: "", invest: "", msg: "" });
  const [review, setReview] = useState<ReviewForm>({ name: "", message: "", stall: 0, product: 0 });
  const [submitting, setSubmitting] = useState(false);

  /* Reveal-on-scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".ex-reveal").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(24px)";
      (el as HTMLElement).style.transition = "opacity .8s ease, transform .8s ease";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.modal || !lead.invest) { toast.error("Please select a modal and investment range."); return; }

    setSubmitting(true);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      toast.success(`Thank you, ${lead.name}! Your slot is confirmed — our team will call within 24 hrs.`);
      setLead({ name: "", phone: "", email: "", city: "", modal: "", invest: "", msg: "" });
    } catch (err) {
      console.error("Lead submission failed:", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.stall || !review.product) { toast.error("Please rate both the stall and products."); return; }
    toast.success("Thank you for your review! Your hamper entry has been recorded.");
    setReview({ name: "", message: "", stall: 0, product: 0 });
  };

  const css = `
    @keyframes exPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,77,77,.6);transform:scale(1)}50%{box-shadow:0 0 0 8px rgba(255,77,77,0);transform:scale(1.15)}}
    .ex-field input,.ex-field select,.ex-field textarea{width:100%;padding:12px 14px;border:1.5px solid #e8d9a8;border-radius:10px;background:#fff;font-size:15px;color:#1B1407;transition:border-color .2s,box-shadow .2s;font-family:inherit}
    .ex-field input:focus,.ex-field select:focus,.ex-field textarea:focus{outline:none;border-color:#CB6E17;box-shadow:0 0 0 3px rgba(240,180,41,.25)}
    .ex-submit{width:100%;background:#1B1407;color:#FADB5F;padding:14px;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;border:none;font-family:inherit;transition:background .2s}
    .ex-submit:hover{background:#CB6E17;color:#FFF8E6}
    .ex-submit:disabled{opacity:.6;cursor:not-allowed}
    .ex-map iframe{display:block;width:100%;height:280px;border:0;filter:saturate(.9)}
    .ex-social-link:hover{transform:translateY(-2px)}
    .ex-trailer-shot:hover{transform:translateY(-4px)}
    .yt-bg-wrap{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
    .yt-bg-wrap iframe{position:absolute;top:50%;left:50%;width:177.78vh;height:100vw;min-width:100%;min-height:100%;transform:translate(-50%,-50%)}
  `;

  const INK = "#1B1407";
  const HONEY300 = "#FADB5F";
  const HONEY400 = "#F7C948";
  const HONEY600 = "#DE911D";
  const HONEY700 = "#CB6E17";
  const CREAM = "#FFF8E6";
  const LEAF = "#3F7A4A";
  const LEAF_DEEP = "#2A5A36";

  const display = "'Fraunces', Georgia, serif";

  return (
    <>
      <Helmet>
        <title>Honeyman at Franchise India Expo 2026 | Yashobhoomi, Delhi</title>
        <meta name="description" content="Meet Honeyman at Franchise India Expo 2026, 16–17 May at Yashobhoomi, Delhi. Stalls C-3,4,5 & C-10,11,12. Taste our honey-sweetened chai & ice cream — free." />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&display=swap" rel="stylesheet" />
        <style>{css}</style>
      </Helmet>

      <Header />

      <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", color: INK, background: "#FFF8E6", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>

        {/* ═══════════════════════════════════════════
            HERO — YouTube Video Background
        ═══════════════════════════════════════════ */}
        <header style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

          {/* YouTube background */}
          <div className="yt-bg-wrap">
            <iframe
              src="https://www.youtube.com/embed/HPYOSzwkF9Y?autoplay=1&mute=1&loop=1&playlist=HPYOSzwkF9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0"
              allow="autoplay; fullscreen"
              title="Honeyman Franchise Expo Video"
              style={{ border: 0 }}
            />
          </div>
          

          {/* Dark overlay with honey tint */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(27,20,7,.78) 0%, rgba(27,20,7,.55) 50%, rgba(203,110,23,.3) 100%)", zIndex: 1 }} />

          {/* Content grid */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", width: "100%", padding: "100px 24px 60px", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 56, alignItems: "center" }} className="ex-hero-grid">

            {/* Left */}
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: HONEY400, color: INK, padding: "8px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                Franchise India 2026 · Featured Brand
              </span>

              <h1 style={{ fontFamily: display, fontWeight: 900, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: .98, letterSpacing: "-.025em", color: CREAM, marginBottom: 22 }}>
                India's first <em style={{ fontStyle: "display", fontWeight: 600, color: HONEY400 }}>honey-sweetened</em> chai &amp; cafe.<br />
                Now opening doors to franchise partners.
              </h1>

              <p style={{ fontSize: 18, color: "rgba(255,248,230,.88)", maxWidth: 560, marginBottom: 32 }}>
                Join us at Franchise India 2026 Expo — taste our chai, ice cream and bee-based products, and discover what 46+ years of pure honey heritage looks like as a business opportunity.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                {[
                  { icon: <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>, text: "16–17 May 2026" },
                  { icon: <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>, text: "Yashobhoomi, Delhi" },
                  { icon: <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></svg>, text: "Stalls C-3,4,5 & C-10,11,12" },
                ].map(({ icon, text }) => (
                  <span key={text} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,248,230,.15)", border: "1.5px solid rgba(247,201,72,.5)", padding: "10px 16px", borderRadius: 14, fontWeight: 600, fontSize: 14, color: CREAM, backdropFilter: "blur(4px)" }}>
                    <span style={{ color: HONEY400 }}>{icon}</span>
                    {text}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a href="#expo-lead" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 28px", borderRadius: 999, fontWeight: 700, fontSize: 15, background: HONEY400, color: INK, textDecoration: "none", transition: "transform .2s,background .2s" }}>
                  Be Part of the Journey
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
                
              </div>
            </div>

            {/* Lead Form */}
            <aside id="expo-lead" style={{ background: CREAM, border: `1.5px solid ${HONEY400}`, borderRadius: 24, padding: 32, boxShadow: "0 20px 60px -20px rgba(203,110,23,.45)", position: "relative" }}>
              <div style={{ position: "absolute", top: -2, left: -2, right: -2, height: 8, background: `linear-gradient(90deg,${HONEY600},${HONEY400},${HONEY600})`, borderRadius: "24px 24px 0 0" }} />
              <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: 24, lineHeight: 1.15, marginBottom: 6, color: INK }}>Reserve your franchise meeting slot</h3>
              <p style={{ fontSize: 14, color: "#3a2d12", marginBottom: 20 }}>Tell us about you — our team will confirm a private slot at the expo.</p>
              <form onSubmit={handleLead}>
                <div className="ex-field" style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Full Name</label>
                  <input type="text" required placeholder="Your full name" value={lead.name} onChange={e => setLead(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div className="ex-field">
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Phone</label>
                    <input type="tel" required placeholder="+91" value={lead.phone} onChange={e => setLead(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="ex-field">
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Email</label>
                    <input type="email" required placeholder="you@email.com" value={lead.email} onChange={e => setLead(p => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div className="ex-field">
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>City</label>
                    <input type="text" required placeholder="Your city" value={lead.city} onChange={e => setLead(p => ({ ...p, city: e.target.value }))} />
                  </div>
                  <div className="ex-field">
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Modal Type</label>
                    <select required value={lead.modal} onChange={e => setLead(p => ({ ...p, modal: e.target.value }))}>
                      <option value="">Select range</option>
                      <option>Ice Cream</option>
                      <option>Chai Plus</option>
                     
                   
                    </select>
                  </div>
                  <div className="ex-field">
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Investment Range</label>
                    <select required value={lead.invest} onChange={e => setLead(p => ({ ...p, invest: e.target.value }))}>
                      <option value="">Select range</option>
                      <option>₹4 - 10 Lakhs</option>
                      <option>₹10 – 20 Lakhs</option>
                      <option>₹20 – 30 Lakhs</option>
                    
                     
                   
                    </select>
                  </div>
                </div>
                <div className="ex-field" style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Message (optional)</label>
                  <textarea rows={2} placeholder="Tell us when you'd like to visit" value={lead.msg} onChange={e => setLead(p => ({ ...p, msg: e.target.value }))} />
                </div>
                <button type="submit" className="ex-submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Confirm My Slot →"}
                </button>
                <p style={{ marginTop: 14, fontSize: 12, color: "#3a2d12", textAlign: "center" }}>Free chai &amp; ice cream tasting at the booth — on us. 🍯</p>
              </form>
            </aside>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,248,230,.7)", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>
            <span>Scroll to explore</span>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "exBounce 1.5s ease-in-out infinite" }}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </header>

        {/* ═══════════════════════════════════════════
            TRAILER MODEL
        ═══════════════════════════════════════════ */}
       <ChaiPlusFranchiseSection />

        {/* ═══════════════════════════════════════════
            ABOUT THE EXPO
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "90px 24px", background: "linear-gradient(180deg,#FFF8E6 0%,#FFFBEA 100%)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 60, alignItems: "center" }}>
            <div className="ex-reveal">
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: HONEY700, marginBottom: 14 }}>About the Event</span>
              <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(32px,4.5vw,54px)", lineHeight: 1.05, letterSpacing: "-.02em", color: INK, marginBottom: 18 }}>
                What is <em style={{ fontStyle: "italic", color: HONEY700 }}>Franchise India Expo?</em>
              </h2>
              <p style={{ fontSize: 17, color: "#3a2d12", marginBottom: 20 }}>
                Franchise India is South Asia's largest franchise &amp; business opportunities exhibition. For over two decades it has been the launchpad where India's most ambitious entrepreneurs meet the country's most respected brands — under one roof.
              </p>
              <p style={{ fontSize: 17, color: "#3a2d12", marginBottom: 32 }}>
                The 2026 edition runs across <strong>16–17 May at Yashobhoomi, Delhi</strong> — and Honeyman is proud to be one of the featured brands.
              </p>
              <div style={{ display: "grid", gap: 18 }}>
                {[
                  { title: "Meet 200+ proven brands", sub: "From food & beverage to retail, education and wellness" },
                  { title: "One-on-one franchise consultations", sub: "Talk directly to brand founders & franchise heads" },
                  { title: "Investment options for every budget", sub: "Opportunities ranging from ₹5 lakhs to ₹5 crores+" },
                  { title: "Free product tasting at our stall", sub: "Sample our chai, ice cream & honey products live" },
                ].map(({ title, sub }) => (
                  <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: LEAF_DEEP, color: HONEY300, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>✓</span>
                    <div>
                      <strong style={{ display: "block", fontFamily: display, fontWeight: 700, fontSize: 16, color: INK, marginBottom: 2 }}>{title}</strong>
                      <p style={{ fontSize: 14, color: "#3a2d12" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expo details card */}
            <div className="ex-reveal" style={{ background: INK, color: CREAM, borderRadius: 24, padding: 36, boxShadow: "0 20px 60px -20px rgba(203,110,23,.35)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle, rgba(247,201,72,.4), transparent 70%)", borderRadius: "50%" }} />
              <div style={{ marginBottom: 28, position: "relative" }}>
                <span style={{ display: "inline-block", background: HONEY400, color: INK, padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Franchise India 2026</span>
                <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: 34, lineHeight: 1.05, letterSpacing: "-.02em", color: CREAM }}>Two days. <br />One decision. <br />A lifetime of business.</h3>
              </div>
              <div style={{ marginBottom: 24 }}>
                {[
                  ["Event", "Franchise India 2026 Expo"],
                  ["Dates", "16 & 17 May 2026"],
                  ["Venue", "Yashobhoomi, Dwarka, Delhi"],
                  ["Honeyman Stalls", "C-3,4,5 & C-10,11,12"],
                  ["Entry", "Free with prior registration"],
                ].map(([key, val]) => (
                  <div key={key} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,248,230,.12)" }}>
                    <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,248,230,.6)", fontWeight: 700 }}>{key}</div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: CREAM }}>{val}</div>
                  </div>
                ))}
              </div>
              <a href="#expo-lead" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: HONEY400, color: INK, padding: "16px 28px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                Reserve My Free Pass
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY HONEYMAN
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "90px 24px", background: CREAM }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div className="ex-reveal">
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: HONEY700, marginBottom: 14 }}>Why Honeyman</span>
              <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(32px,4.5vw,54px)", lineHeight: 1.05, letterSpacing: "-.02em", color: INK, marginBottom: 18 }}>
                A 46-year honey legacy. Now, a franchise opportunity.
              </h2>
              <p style={{ fontSize: 17, color: "#3a2d12", marginBottom: 32 }}>
                Since 1984, Honeyman has been delivering pure, unadulterated honey across India. Today we're scaling that trust into India's largest range of honey &amp; bee-based products — partnering with franchisees who believe in clean, refined-sugar-free living.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 32 }}>
                {[
                  { title: "46+ Years Heritage", sub: "Trusted purity since 1984, now backed by a national franchise system." },
                  { title: "Quick Setup", sub: "End-to-end onboarding, training, supply & marketing from day one." },
                  { title: "High-Margin Category", sub: "Honey-led products command premium pricing in a fast-growing wellness market." },
                  { title: "Brand You Can Trust", sub: "Recognised & loved by lakhs of customers across India." },
                ].map(({ title, sub }) => (
                  <div key={title} style={{ background: "#fff", border: "1px solid rgba(203,110,23,.15)", padding: 22, borderRadius: 18, boxShadow: "0 1px 2px rgba(27,20,7,.08),0 4px 12px rgba(27,20,7,.06)" }}>
                    <h4 style={{ fontFamily: display, fontWeight: 700, fontSize: 18, marginBottom: 6, color: INK }}>{title}</h4>
                    <p style={{ fontSize: 14, color: "#3a2d12" }}>{sub}</p>
                  </div>
                ))}
              </div>
              {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: 28, background: INK, borderRadius: 20, color: CREAM }}>
                {[["40+", "Years of Purity"], ["100+", "Bee Products"], ["0", "Refined Sugar"]].map(([num, lbl]) => (
                  <div key={lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: display, fontWeight: 900, fontSize: 42, color: HONEY300, lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 6, opacity: .85 }}>{lbl}</div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Menu card */}
            <div className="ex-reveal" style={{ background: `linear-gradient(160deg, ${HONEY400}, ${HONEY600})`, borderRadius: 28, padding: 36, color: INK, boxShadow: "0 20px 60px -20px rgba(203,110,23,.35)", minHeight: 480, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, color: "#3a2d12", marginBottom: 8, display: "block" }}>Featured at Stall</span>
                <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: 38, lineHeight: 1, marginBottom: 24, color: INK }}>The Honeyman Chai+ menu</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
                {["Ashwaganda Chai", "Masala Chai", "Lemon Tea", "Tulsi Chai", "Orange Chai", "Turmeric Tea", "Honey Ice Creams & Snacks"].map(item => (
                  <li key={item} style={{ background: "rgba(255,248,230,.75)", padding: "14px 18px", borderRadius: 14, display: "flex", alignItems: "center", gap: 12, fontWeight: 600, border: "1px solid rgba(27,20,7,.08)" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: LEAF, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            VENUE
        ═══════════════════════════════════════════ */}
        <section id="expo-venue" style={{ padding: "90px 24px", background: INK, color: CREAM }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <span className="ex-reveal" style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: HONEY300, marginBottom: 14 }}>Find Us at the Expo</span>
            <h2 className="ex-reveal" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(32px,4.5vw,54px)", lineHeight: 1.05, letterSpacing: "-.02em", color: CREAM, marginBottom: 12 }}>Walk in. Taste it. Sign up.</h2>
            <p className="ex-reveal" style={{ fontSize: 18, color: "rgba(255,248,230,.75)", marginBottom: 50 }}>Our stalls are easy to spot — just follow the honey scent and the buzz.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "stretch" }}>
              {/* Stall card */}
              <div className="ex-reveal" style={{ background: `linear-gradient(160deg, ${HONEY600}, #B44D12)`, borderRadius: 24, padding: 36, color: CREAM, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,248,230,.85)", marginBottom: 12, display: "block" }}>Our Stalls</span>
                  <div style={{ fontFamily: display, fontWeight: 900, fontSize: 64, lineHeight: 1, color: CREAM, letterSpacing: "-.02em" }}>C-3,4,5<br />C-10,11,12</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18, marginBottom: 28 }}>
                    {["C-3", "C-4", "C-5", "C-10", "C-11", "C-12"].map(s => (
                      <span key={s} style={{ background: "rgba(255,248,230,.15)", border: "1px solid rgba(255,248,230,.3)", padding: "8px 14px", borderRadius: 10, fontWeight: 700, fontFamily: display }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ opacity: .85, marginBottom: 18, fontSize: 15 }}>Two activation zones — one for tasting, one for franchise discussions.</p>
                 
                </div>
              </div>

              {/* Map */}
              <div className="ex-reveal" style={{ background: "rgba(255,248,230,.06)", border: "1px solid rgba(255,248,230,.12)", borderRadius: 24, padding: 28 }}>
                <h4 style={{ fontFamily: display, fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Yashobhoomi Convention Centre</h4>
                <p style={{ fontSize: 15, opacity: .8, marginBottom: 18 }}>Dwarka Sector 25, New Delhi · 16 &amp; 17 May 2026</p>
                <div className="ex-map" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,248,230,.15)" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.485115716151!2d77.048187!3d28.555191999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b86c10b12cf%3A0xa6d41303342b088c!2sYashobhoomi!5e0!3m2!1sen!2sin!4v1777967879437!5m2!1sen!2sin"
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Yashobhoomi Map"
                  />
                </div>
                <a href="https://www.google.com/maps/place/Yashobhoomi" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, color: HONEY300, border: `1px solid ${HONEY300}`, padding: "12px 20px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  Get Directions
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SOCIAL BAND
        ═══════════════════════════════════════════ */}
        <section style={{ background: HONEY300, padding: "60px 24px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: 34, lineHeight: 1.05, color: INK, maxWidth: 560 }}>
              Stay <em style={{ fontStyle: "italic", color: "#B44D12" }}>connected</em> — see live moments from the expo as they happen.
            </h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { href: "https://www.instagram.com/honeymanstore", label: "Instagram", icon: <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg> },
                { href: "https://www.youtube.com/@honeymanstore", label: "YouTube", icon: <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg> },
                { href: "https://www.facebook.com/share/1DWS51coyk/", label: "Facebook", icon: <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ex-social-link" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: INK, color: HONEY300, padding: "14px 22px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "transform .2s" }}>
                  {icon}{label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FREE ICE CREAM CTA
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "90px 24px", background: "radial-gradient(circle at 80% 20%, rgba(247,201,72,.5), transparent 60%), linear-gradient(180deg,#FFFBEA,#FFF8E6)", textAlign: "center" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <span className="ex-reveal" style={{ display: "inline-block", background: LEAF_DEEP, color: HONEY300, padding: "8px 18px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 20 }}>🍦 On the house</span>
            <h2 className="ex-reveal" style={{ fontFamily: display, fontWeight: 900, fontSize: "clamp(38px,5.5vw,68px)", lineHeight: 1, letterSpacing: "-.02em", color: INK, marginBottom: 18 }}>
              Come, taste our <em style={{ fontStyle: "italic", color: HONEY700 }}>Honeyman ice cream</em> — free at the booth.
            </h2>
            <p className="ex-reveal" style={{ fontSize: 18, color: "#3a2d12", maxWidth: 600, margin: "0 auto 32px" }}>
              Walk into Stall C-3,4,5 or C-10,11,12 between 16–17 May, drop your name at the counter, and a scoop is on us. Then stay for the franchise pitch — or don't. Either way, the ice cream is yours.
            </p>
           
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            REVIEW SECTION
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "90px 24px", background: CREAM }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <span className="ex-reveal" style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: HONEY700, marginBottom: 14 }}>Already Visited?</span>
            <h2 className="ex-reveal" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(32px,4.5vw,54px)", lineHeight: 1.05, letterSpacing: "-.02em", color: INK, marginBottom: 12 }}>Rate our stall &amp; products.</h2>
            <p className="ex-reveal" style={{ fontSize: 18, color: "#3a2d12", marginBottom: 50 }}>If you stopped by our booth, we'd love to hear what you thought.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              {/* Review form */}
              <div className="ex-reveal" style={{ background: "#fff", border: `1.5px solid ${HONEY300}`, borderRadius: 24, padding: 32, boxShadow: "0 20px 60px -20px rgba(203,110,23,.35)" }}>
                <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: 26, marginBottom: 6, color: INK }}>Leave a Review</h3>
                <p style={{ fontSize: 14, color: "#3a2d12", marginBottom: 20 }}>Takes 30 seconds. Free Honeyman sample sent to top reviewers each week.</p>
                <form onSubmit={handleReview}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 4, letterSpacing: ".04em", textTransform: "uppercase" }}>Your Stall Experience</label>
                    <StarRating value={review.stall} onChange={v => setReview(p => ({ ...p, stall: v }))} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 4, letterSpacing: ".04em", textTransform: "uppercase" }}>Our Products</label>
                    <StarRating value={review.product} onChange={v => setReview(p => ({ ...p, product: v }))} />
                  </div>
                  <div className="ex-field" style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Your Name</label>
                    <input type="text" required placeholder="Name" value={review.name} onChange={e => setReview(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="ex-field" style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3a2d12", marginBottom: 6, letterSpacing: ".04em", textTransform: "uppercase" }}>Tell us more</label>
                    <textarea rows={3} placeholder="What did you love? What can we do better?" value={review.message} onChange={e => setReview(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  <button type="submit" className="ex-submit">Submit Review</button>
                </form>
              </div>

              {/* Review info */}
              <div style={{ display: "grid", gap: 18 }}>
                {[
                  { n: "01", title: "Honest beats polished", body: "Tell us what worked, what didn't, and what you'd want next time. We read everything." },
                  { n: "02", title: "Win a Honeyman hamper", body: "Top three reviewers each week receive a curated honey hamper, delivered to your address." },
                  { n: "03", title: "Help us serve you better", body: "Your feedback directly shapes our next franchise rollouts across India." },
                  { n: "04", title: "Stay in the loop", body: "We'll send you a thank-you and the link to our next event near you." },
                ].map(({ n, title, body }) => (
                  <div key={n} className="ex-reveal" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ fontFamily: display, fontWeight: 900, fontSize: 28, color: HONEY700, lineHeight: 1, flexShrink: 0, width: 42 }}>{n}</div>
                    <div>
                      <h4 style={{ fontFamily: display, fontWeight: 700, fontSize: 18, marginBottom: 4, color: INK }}>{title}</h4>
                      <p style={{ fontSize: 15, color: "#3a2d12" }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />

      {/* Responsive tweaks */}
      <style>{`
        @keyframes exBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
        @media(max-width:960px){
          .ex-hero-grid{grid-template-columns:1fr!important;gap:40px!important}
          #expo-lead{order:2}
        }
        @media(max-width:768px){
          section > div > div[style*="grid-template-columns: 1.1fr"]{grid-template-columns:1fr!important;gap:36px!important}
          section > div > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:36px!important}
          section > div > div[style*="grid-template-columns: 1.4fr"]{grid-template-columns:1fr!important;gap:28px!important}
          .trailer-feature{grid-column:1!important}
          div[style*="grid-template-columns: repeat(4,1fr)"]{grid-template-columns:1fr 1fr!important}
          div[style*="grid-template-columns: repeat(3,1fr)"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </>
  );
};

export default Expo;