import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/Honeyman-logo.webp";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar - premium style for all pages */}
      <div className="bg-white text-gray-500 text-[11px] py-2 border-b border-amber-100 hidden lg:flex z-50 relative">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-medium">
            India’s leading premium honey brand—now 180+ stores strong nationwide.
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt text-amber-500 mr-2" />
              Gurugram, HQ 122018
            </span>
            <span className="flex items-center">
              <i className="fas fa-envelope text-amber-500 mr-2" />
              hello@honeyman.in
            </span>
            <span className="flex items-center">
              <i className="fas fa-phone text-amber-500 mr-2" />
              +91 96503 05025 (HQ)
            </span>
            <span className="flex items-center">
              <i className="far fa-clock text-amber-500 mr-2" />
              Mon - Sat: 10.00 to 19.00
            </span>
            <div className="flex space-x-3 text-gray-400 border-l border-gray-200 pl-4">
              <a href="https://www.facebook.com/share/1DWS51coyk/" className="hover:text-amber-500 transition" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://www.youtube.com/@honeymanstore" className="hover:text-amber-500 transition" aria-label="Twitter">
                <i className="fab fa-youtube" />
              </a>
              <a href="https://www.instagram.com/honeymanstore" className="hover:text-amber-500 transition" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav - premium style for all pages */}
      <nav className="bg-white py-1 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Honeyman"
              className="h-16 sm:h-12 md:h-20 w-auto object-contain scale-[1.75]"
            />
          </Link>

          <div className="hidden lg:flex items-center rounded-full px-8 py-3.5 shadow-sm border border-amber-200 bg-gradient-to-r from-amber-100 to-yellow-100">
            <ul className="flex space-x-8 text-amber-900 font-bold text-[13px]">
              <li>
                <Link to="/" className="hover:text-amber-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about-us" className="hover:text-amber-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#franchise-models" className="hover:text-amber-600 transition">
                  Model
                </Link>
              </li>
              <li>
                <Link to="/store-locator" className="hover:text-amber-600 transition">
                  Store-Locator
                </Link>
              </li>
              {/* <li>
                <Link to="/expo" className="relative text-amber-700 hover:text-amber-500 transition font-extrabold">
                  Expo 2026
                  <span className="absolute -top-1.5 -right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  <span className="absolute -top-1.5 -right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="hidden lg:flex items-center space-x-5">
            <Link
              to="/contact-us"
              className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-sm py-3 px-7 rounded-full transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply Now <i className="fas fa-arrow-up transform rotate-45 ml-2 text-xs" />
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-amber-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full border-t border-amber-100 bg-white shadow-xl ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col px-6 py-4 space-y-2">
            <Link to="/" className="font-bold text-gray-800 py-3 border-b border-amber-50" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/#about-us" className="font-bold text-gray-800 py-3 border-b border-amber-50" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/#franchise-models" className="font-bold text-gray-800 py-3 border-b border-amber-50" onClick={() => setMobileMenuOpen(false)}>
              Model
            </Link>
            <Link to="/store-locator" className="font-bold text-gray-800 py-3 border-b border-amber-50" onClick={() => setMobileMenuOpen(false)}>
              Store
            </Link>
            {/* <Link to="/expo" className="font-bold text-amber-700 py-3 border-b border-amber-50 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              Expo 2026 <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
            </Link> */}
            <Link
              to="/contact-us"
              className="bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold py-3 px-4 rounded-full text-center mt-4 shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
