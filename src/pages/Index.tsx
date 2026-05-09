import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import expoLogo from "@/assets/logo (3).png";
import Header from "@/components/Header";
import HeroFranchiseBanner from "@/components/HeroFranchiseBanner";
import {
  AvailableOnSection,
  TrustBadgesSection,
  FinancialPlanningModal,
  WeSetYouUpSection,
  FeaturedInMediaSection,
  PartnerSuccessStoriesSection,
  OuroutletsGallery,
  FAQSection,
  ReadyToStartSection,
} from "@/components/home";
import Footer from "@/components/Footer";
import FranchiseSection from "@/components/FranchiseSection";
import HoneymanStoreSection from "@/components/HoneymanStoreSection";
import RecentBlogs from "@/components/RecentBlogs";
import StoreLocatorSimple from "@/components/StoreLocatorSimple";
import ChaiPlusFranchiseSection from "@/components/ChaiPlusFranchiseSection";
import ExpoInviteModal from "@/components/ExpoInviteModal";

// Commented out: previous home sections (gifting, franchise, store, icecream, honey, etc.)
// import Header from "@/components/Header";
// import HeroSlider from "@/components/HeroSlider";
// import TextSlider from "@/components/TextSlider";
// import WhyUsSection from "@/components/WhyUsSection";
// import ProductsCarousel from "@/components/ProductsCarousel";
// import AboutSection from "@/components/AboutSection";
// import IceCreamSection from "@/components/IceCreamSection";
// import FranchiseSection from "@/components/FranchiseSection";
// import GiftingSection from "@/components/GiftingSection";
// import ReviewsSection from "@/components/ReviewsSection";
// import HoneymanStoreSection from "@/components/HoneymanStoreSection";
// import Honeyjourney from "@/components/Honeyjourney";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const targetId = hash.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-orange-50/30 overflow-x-hidden">
      {/* Floating Expo Button */}
      <Link
        to="/expo"
        className="fixed right-5 bottom-6 z-50 flex flex-col items-center gap-1.5 group"
        aria-label="Visit Franchise India Expo 2026 page"
      >
        <div className="relative bg-amber-400 hover:bg-amber-500 rounded-2xl shadow-2xl p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-300/60 border-2 border-amber-300">
          <img
            src={expoLogo}
            alt="Franchise India Expo 2026"
            className="w-14 h-14 object-contain"
          />
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        </div>
        <span className="bg-amber-900 text-amber-100 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
          Expo 2026
        </span>
      </Link>

      <Header />
      <ExpoInviteModal />
      <main>
        <HeroFranchiseBanner />
        <AvailableOnSection />
        {/* <ChaiPlusFranchiseSection /> */}
        <TrustBadgesSection />
        <FranchiseSection />
        <WeSetYouUpSection />
        <FeaturedInMediaSection />
        <OuroutletsGallery />
        <PartnerSuccessStoriesSection />
        {/* <RecentBlogs /> */}
        {/* <StoreLocatorSimple id="store-locator" /> */}
        {/* <HoneymanStoreSection /> */}
        <FAQSection />
      
        <ReadyToStartSection />

        {/* Commented out: previous home sections */}
        {/* <HeroSlider /> */}
        {/* <TextSlider /> */}
        {/* <WhyUsSection /> */}
        {/* <ProductsCarousel /> */}
        {/* <AboutSection /> */}
        {/* <IceCreamSection /> */}
        {/* <FranchiseSection /> */}
        {/* <GiftingSection /> */}
        {/*  */}
        {/* <ReviewsSection /> */}
      </main>
      {/* <FinancialPlanningModal /> */}
      <Footer />
    </div>
  );
};

export default Index;
