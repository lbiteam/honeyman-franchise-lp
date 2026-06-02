import { Link } from "react-router-dom";

const ReadyToStartSection = () => (
  <section className="py-10 bg-[#f9b11f]">
    <div className="container mx-auto px-6 text-center">
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-3 text-white mb-6 drop-shadow-md">
        Ready to Start Your Journey?
      </h2>
      <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto font-medium">
        Slots for this quarter are filling up fast. Secure your preferred location today.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link
          to="/contact-us"
          className="bg-white text-orange-600 px-10 py-5 rounded-full font-extrabold text-lg hover:bg-gray-50 transition shadow-xl hover:-translate-y-1 transform w-full sm:w-auto text-center"
        >
          Apply Now
        </Link>
        <a
          href="tel:+919650305025"
          className="bg-transparent text-white px-10 py-5 rounded-full font-extrabold text-lg hover:bg-white/20 transition border-2 border-white w-full sm:w-auto text-center"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
            dl.push({
              event: "call_us_franchise",
              event_category: "Franchise",
              event_label: "Ready To Start – Call Us",
            });
          }}
        >
          <i className="fas fa-phone mr-2" /> Call Us
        </a>
      </div>
    </div>
  </section>
);

export default ReadyToStartSection;
