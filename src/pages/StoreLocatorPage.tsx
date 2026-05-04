import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreLocatorSimple from "@/components/StoreLocatorSimple";

const StoreLocatorPage = () => {
  return (
    <div className="min-h-screen bg-orange-50/30 overflow-x-hidden">
      <Header />
      <main>
        {/* Dedicated page view: no embedded street map, just the simple list UI */}
        <StoreLocatorSimple />
      </main>
      <Footer />
    </div>
  );
};

export default StoreLocatorPage;

