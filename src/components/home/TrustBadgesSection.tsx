const TrustBadgesSection = () => (
  <section className="py-16 bg-white border-b border-amber-100 relative">
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition duration-300 shadow-sm border border-amber-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-amber-500 text-3xl shadow-md">
            <i className="fas fa-check-circle" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">FSSAI Certified</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            100% compliant with all food safety standards. We sell only lab-tested, pure products.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition duration-300 shadow-sm border border-amber-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-amber-500 text-3xl shadow-md">
            <i className="fas fa-store-alt" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">180+ Outlets</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            A proven business model operating successfully in 25+ cities across India.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition duration-300 shadow-sm border border-amber-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-amber-500 text-3xl shadow-md">
            <i className="fas fa-money-bill" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">Profitable Partnership</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
          A structured franchise system focused on sustainable margins and long-term success.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition duration-300 shadow-sm border border-amber-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 text-amber-500 text-3xl shadow-md">
            <i className="fas fa-award" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">Award Winning</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Voted as the &quot;Best Emerging FMCG Brand 2024&quot; for product innovation.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default TrustBadgesSection;
