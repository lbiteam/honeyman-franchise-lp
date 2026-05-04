import { useState, useEffect } from "react";
import Bee from "@/components/Bee";
import elanphoto1 from "@/assets/cafe-1.webp";
import elanphoto2 from "@/assets/cafe-hm.webp";
import elanphoto3 from "@/assets/cafe-image.webp";
import elanphoto4 from "@/assets/cafe-2.webp";
import elanphoto5 from "@/assets/cafe-3.webp";
import elanphoto6 from "@/assets/cafe-outlet2.webp";
import elanphoto7 from "@/assets/cafe-outlet3.webp";
import elanphoto8 from "@/assets/outlet-4.webp";
import elanphoto9 from "@/assets/cafe-outlets.webp";

const outletImages = [
  elanphoto1,
  elanphoto7,
  elanphoto3,
  elanphoto6,
  elanphoto5,
  elanphoto4,
  elanphoto2,
  elanphoto8,
  elanphoto9,
];

const getImagesPerView = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }
  return 4;
};

const OuroutletsGallery = () => {
  const [outletCarouselIndex, setOutletCarouselIndex] = useState(0);
  const [responsiveImagesPerView, setResponsiveImagesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => setResponsiveImagesPerView(getImagesPerView());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = outletImages.length - responsiveImagesPerView;
    if (outletCarouselIndex > maxIndex && maxIndex >= 0) {
      setOutletCarouselIndex(maxIndex);
    }
  }, [outletCarouselIndex, responsiveImagesPerView]);

  const nextOutletSlide = () => {
    setOutletCarouselIndex((prev) =>
      Math.min(prev + 1, outletImages.length - responsiveImagesPerView)
    );
  };

  const prevOutletSlide = () => {
    setOutletCarouselIndex((prev) =>
      prev === 0 ? outletImages.length - responsiveImagesPerView : prev - 1
    );
  };

  const maxIndex = Math.max(0, outletImages.length - responsiveImagesPerView);

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-x-hidden overflow-y-visible">
      <Bee className="absolute top-12 right-8 z-10" size={32} />
      <Bee className="absolute bottom-20 left-12 z-10" size={28} />
      <Bee className="absolute top-1/2 right-1/4 z-10" size={26} />

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-honey/20 rounded-full text-honey-dark font-medium text-xs sm:text-sm mb-4">
            Our Outlets
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-3">Our Outlets Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Discover our beautifully designed outlets across the country
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-2xl w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${outletCarouselIndex * (100 / responsiveImagesPerView)}%)`,
              }}
            >
              {outletImages.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 ${
                    responsiveImagesPerView === 1
                      ? "w-full px-0"
                      : responsiveImagesPerView === 2
                        ? "w-1/2 px-1"
                        : "w-1/4 px-1 sm:px-2"
                  }`}
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={image}
                      alt={`Outlet ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prevOutletSlide}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center text-honey-dark hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            disabled={outletCarouselIndex === 0}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextOutletSlide}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center text-honey-dark hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            disabled={outletCarouselIndex >= maxIndex}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOutletCarouselIndex(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  outletCarouselIndex === i ? "bg-honey scale-125" : "bg-honey/30 hover:bg-honey/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OuroutletsGallery;
