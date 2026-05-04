import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import honeyBg from "@/assets/honey-bg.webp";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <section
        className="flex-1 flex justify-center items-center py-16 md:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${honeyBg})` }}
      >
        <div className="absolute inset-0 bg-[#f6ebd8]/90" aria-hidden />
        <div
          className="relative z-10 mx-4 w-full max-w-[450px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border-2 border-amber-100 p-8 md:p-10 text-center animate-[fadeInUp_0.8s_ease_forwards]"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
          }}
        >
          <div className="w-20 h-20 bg-amber-100 rounded-full flex justify-center items-center mx-auto mb-6 shadow-inner border-2 border-amber-200">
            <span
              className="text-4xl text-amber-600 font-bold animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_0.3s_both]"
              style={{
                animation: "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both",
              }}
            >
              ✓
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#423324] mb-4">
            You&apos;re Awesome!!
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            Your message has been received. We&apos;ll get back to you faster than a caffeinated squirrel. In the meantime, feel free to explore more of our site.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-[0_4px_15px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Back to Homepage
          </Link>
        </div>
      </section>
      <Footer />
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ThankYou;
