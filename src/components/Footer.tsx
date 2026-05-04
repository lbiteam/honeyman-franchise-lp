import { Link, useLocation } from "react-router-dom";
import Bee from "./Bee";
import honeyDipper from "@/assets/honey-dipper.webp";
import logo from "@/assets/Honeyman-logo.webp";
import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const isGiftingPage = useLocation().pathname === "/gifting";

  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Contact Us", href: "/contact-us" },
    // Store locator – kept commented out
    // { name: "Store Locator", href: "/franchise#store-locator" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/honeymanstore?igsh=dngwa2kwOHQwemY4", icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/share/1DWS51coyk/", icon: Facebook },
    { name: "YouTube", href: "https://youtube.com/@honeymanstore?si=4MRShuPf2K9GA3Y0", icon: Youtube },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Main footer content with background */}
      <div 
        className="relative pt-12 pb-8"
        style={{
          backgroundColor: isGiftingPage ? '#83171a' : '#ffe248',
          backgroundImage: isGiftingPage ? 'none' : `url(${honeyDipper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light',
        }}
      >
        {/* Hexagon pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="footerHexagonBg" x="0" y="0" width="40" height="34.64" patternUnits="userSpaceOnUse">
                <polygon points="20,0 40,8.66 40,25.98 20,34.64 0,25.98 0,8.66" fill="none" stroke="hsl(45 100% 85%)" strokeWidth="0.5" opacity="0.6"/>
                <polygon points="20,34.64 40,43.3 40,60.62 20,69.28 0,60.62 0,43.3" fill="none" stroke="hsl(45 100% 85%)" strokeWidth="0.5" opacity="0.6"/>
                <polygon points="10,17.32 30,25.98 30,43.3 10,51.96 -10,43.3 -10,25.98" fill="none" stroke="hsl(45 100% 85%)" strokeWidth="0.5" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerHexagonBg)"/>
          </svg>
        </div>
        
        {/* Overlay for better readability */}
        {!isGiftingPage && <div className="absolute inset-0 bg-[#8c3100]/90" />}
        
        {/* Bees */}
        <Bee className="absolute top-6 left-[12%] z-20" size={26} />
        <Bee className="absolute top-14 right-[18%] z-20" size={22} />
        <Bee className="absolute bottom-20 left-[65%] z-20" size={24} />
        <Bee className="absolute top-20 left-[40%] z-20" size={20} />

        <div className="container mx-auto px-6 relative z-10">
          {/* Top Section - Logo, Tagline, and Social */}
          <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-8 mb-10">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start gap-2 md:col-start-1">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt="Honeyman" 
                  className="h-16 md:h-20 w-auto object-contain  scale-[1.75]"
                />
              </Link>
              {/* Tagline - visible on mobile, below logo */}
              <p className="text-white font-display text-sm md:hidden font-medium text-center">
                The House of Premium Products
              </p>
            </div>

            {/* Tagline - centered on desktop */}
            <p className="hidden md:block text-white font-display text-lg font-semibold text-center md:col-start-2">
              The House of Premium Products
            </p>

            {/* Follow Us - Right Side */}
            <div className="flex flex-col items-center md:items-end gap-3 md:col-start-3">
              <h4 className="font-display text-lg font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-amber-900/10 flex items-center justify-center hover:bg-amber-900 hover:text-amber-50 text-white transition-all duration-300 hover:scale-110 border border-amber-900/20"
                    title={link.name}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-amber-900/20 mb-6" />

          {/* Bottom Section - Navigation Links and Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-white hover:text-yellow-900 text-sm font-medium transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <a href="mailto:hello@honeyman.in" className="text-white hover:text-yellow-200 text-sm font-medium transition-colors">
                hello@honeyman.in
              </a>
              <a href="tel:+919650305025" className="text-white hover:text-yellow-200 text-sm font-medium transition-colors">
                +91 96503 05025
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="py-4 bg-[#f9dc8d]">
        <div className="container mx-auto px-6">
          <p className="text-center text-[#2a1810] text-xs md:text-sm font-medium">
            © 2026 Honeyman Foods Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
