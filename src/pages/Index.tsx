import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
      <Header />
      <main>
        <HeroFranchiseBanner />
        <AvailableOnSection />
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
