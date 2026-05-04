import { ArrowRight } from "lucide-react";
import Bee from "./Bee";
import storeProductsImage from "@/assets/honeymanstore-products.webp";
import honeyBg from "@/assets/honeyman-store-bg.webp";

const HoneymanStoreSection = () => {
  const handleStoreNavigation = () => {
    window.open("https://www.honeymanstore.com", "_blank");
  };

  return (
    <section 
      className="py-24 relative overflow-hidden min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${honeyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60"></div>
      <Bee className="absolute top-20 right-[15%] z-10" size={30} />
      <Bee className="absolute bottom-32 left-[10%] z-10" size={25} />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative rounded-2xl overflow-hidden h-full min-h-96">
              <img
                src={storeProductsImage}
                alt="Honeyman Store Products"
                className="w-full h-full rounded-2xl  shadow-2xl object-cover hover:shadow-3xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6 flex flex-col justify-center h-full">
            <div className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-3">
                Explore Our Complete
                <span className="block text-primary mt-2">Collection at Honeyman Store</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our complete range of premium honey products, delicious spreads, and specialty items are available at our dedicated e-commerce store.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground">🍯Pure & Flavoured Honey Range</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground">🍓 Artisanal Jams & Spreads</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground">🌿 Herbal Tonics & Wellness Blends</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground">🍨 Honey-Infused Ice Creams & Desserts</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={handleStoreNavigation}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300"
              >
                Visit Honeyman Store
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Subtext */}
            <p className="text-sm text-muted-foreground italic">
              Discover all our products, special offers, and exclusive deals on our e-commerce platform.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-16 pt-16 border-t border-border/30 flex items-center justify-center gap-2 text-muted-foreground">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded"></div>
          <span className="text-sm">Bringing Premium Honey to Your Doorstep</span>
          <div className="h-1 w-12 bg-gradient-to-l from-primary to-transparent rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default HoneymanStoreSection;
