import { Link } from "react-router-dom";
import FranchiseBannerForm from "@/components/FranchiseBannerForm";
import webbanner from "@/assets/website-banners/mission-2026-banner/banner.webp"

const HeroFranchiseBanner = () => {
  return (
    <header
      id="franchise-form"
      className="relative pt-16 pb-32 lg:pb-40 flex items-center min-h-[700px] overflow-hidden"
      style={{
        backgroundImage: `url(${webbanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-amber-900/40" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 text-white mb-16 lg:mb-0">
          <span className="text-amber-400 font-extrabold uppercase tracking-widest text-sm mb-4 block drop-shadow-md">
            <i className="fas fa-check-circle mr-2" /> 180+ SUCCESSFUL STORES
          </span>
          <p className="text-xl md:text-2xl text-white mb-6 font-semibold leading-relaxed drop-shadow-md">
            <span className="border-l-4 border-amber-500 pl-4 py-1 block bg-black/20 rounded-r-lg">
            High Margin Business Model <br />
              Premium Positioning, Honey-Based Innovation
            </span>
          </p>
          <div className="mb-8">
            <span
              className=" block font-display text-yellow-400 text-4xl md:text-5xl lg:text-[64px] Tracking-wide drop-shadow-lg "
              style={{ textShadow: "0 3px 16px rgba(0,0,0,0.18)" }}
            >
              OWN A HONEYMAN ICECREAM FRANCHISE
            </span>
          </div>
        
          <div className="flex flex-col space-y-4 text-gray-100 mb-10 drop-shadow-md">
            <div className="flex items-center">
              <i className="fas fa-hexagon text-amber-400 mr-3" />
              <span className="font-medium text-lg">3 Investment Models from 4 Lakhs</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-hexagon text-amber-400 mr-3" />
              <span className="font-medium text-lg">Complete FOFO Support & Training</span>
            </div>
           
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            {/* <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-financial-planning"))}
              className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl transition flex items-center justify-center shadow-xl transform hover:-translate-y-1"
            >
              Calculate Your Investment &rarr;
            </button> */}
            <Link
              to="https://honeymanstore.com/wp-content/uploads/2026/05/Model-Franchise-PPT._compressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl transition flex items-center justify-center shadow-xl transform hover:-translate-y-1"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
                dl.push({
                  event: "download_brochure_franchise",
                  event_category: "Franchise",
                  event_label: "Hero Banner – Download Brochure",
                });
              }}
            >
              Download Brochure
            </Link>
          </div>

          {/* Stat circles: 100+ Cities | 160+ Outlets | 17+ States – same style as High ROI model */}
          <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-5 mt-10">
            <div className="rounded-full w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white bg-gradient-to-br from-amber-100 to-yellow-200">
              <span className="text-xl sm:text-2xl font-bold leading-none text-amber-900">25+</span>
              <span className="text-[10px] sm:text-xs font-extrabold mt-1 text-amber-900 uppercase">Cities</span>
            </div>
            <div className="rounded-full w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white bg-gradient-to-br from-amber-100 to-yellow-200">
              <span className="text-xl sm:text-2xl font-bold leading-none text-amber-900">180+</span>
              <span className="text-[10px] sm:text-xs font-extrabold mt-1 text-amber-900 uppercase">Live+Signed</span>
            </div>
            <div className="rounded-full w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white bg-gradient-to-br from-amber-100 to-yellow-200">
              <span className="text-xl sm:text-2xl font-bold leading-none text-amber-900">17+</span>
              <span className="text-[10px] sm:text-xs font-extrabold mt-1 text-amber-900 uppercase">States</span>
            </div>
            <div className="rounded-full w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white bg-gradient-to-br from-amber-100 to-yellow-200">
              <span className="text-xl sm:text-2xl font-bold leading-none text-amber-900">12 - 18</span>
              <span className="text-[10px] sm:text-xs font-extrabold mt-1 text-amber-900 uppercase">Payback</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end relative">
          <div className="hidden lg:block absolute -left-20 top-1/4 z-20 animate-[float_4s_ease-in-out_infinite]">
            <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center shadow-2xl relative border-4 border-white">
              <i className="fas fa-chart-line text-2xl text-amber-700 mb-1" />
              <span className="text-[11px] font-extrabold text-amber-900 leading-tight uppercase">
                High ROI
                <br />
                Model
              </span>
            </div>
          </div>
          <FranchiseBannerForm />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[30px] md:h-[50px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 300,-30 450,40 C600,110 750,-20 900,50 C1050,120 1200,0 1200,0 L1200,120 L0,120 Z"
            className="fill-orange-50"
          />
        </svg>
      </div>
    </header>
  );
};

export default HeroFranchiseBanner;
