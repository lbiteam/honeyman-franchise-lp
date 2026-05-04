import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Bee from "@/components/Bee";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1 relative bg-gradient-to-b from-amber-50/50 to-cream/30 overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="privacyHexagonBg" x="0" y="0" width="40" height="34.64" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,8.66 40,25.98 20,34.64 0,25.98 0,8.66" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="0.5" />
              <polygon points="20,34.64 40,43.3 40,60.62 20,69.28 0,60.62 0,43.3" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="0.5" />
              <polygon points="10,17.32 30,25.98 30,43.3 10,51.96 -10,43.3 -10,25.98" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacyHexagonBg)" />
        </svg>
      </div>

      {/* Bees - decorative, non-interactive */}
      <Bee className="absolute top-24 left-[8%] z-10 pointer-events-none opacity-80" size={28} />
      <Bee className="absolute top-48 right-[10%] z-10 pointer-events-none opacity-70" size={22} />
      <Bee className="absolute top-[35%] left-[5%] z-10 pointer-events-none opacity-60" size={20} />
      <Bee className="absolute top-[55%] right-[12%] z-10 pointer-events-none opacity-75" size={26} />
      <Bee className="absolute top-[70%] left-[15%] z-10 pointer-events-none opacity-65" size={24} />
      <Bee className="absolute top-[85%] right-[8%] z-10 pointer-events-none opacity-70" size={20} />
      <Bee className="absolute top-[42%] right-[4%] z-10 pointer-events-none opacity-50" size={18} />

      <article className="container mx-auto px-6 py-12 md:py-16 max-w-3xl relative z-10">
        <header className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Privacy Policy for Honeyman
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: February 21, 2026
          </p>
        </header>

        <p className="text-foreground/90 mb-8 leading-relaxed">
          At Honeyman (accessible from https://honeyman.in), one of our main priorities is the
          privacy of our visitors. This Privacy Policy document contains types of information that is
          collected and recorded by Honeyman and how we use it.
        </p>
        <p className="text-foreground/90 mb-10 leading-relaxed">
          If you have additional questions or require more information about our Privacy Policy, do not
          hesitate to contact us at info@honeyman.in.
        </p>

        <section className="mb-10" aria-labelledby="info-we-collect">
          <h2 id="info-we-collect" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            1. Information We Collect
          </h2>
          <p className="text-foreground/90 mb-4 leading-relaxed">
            We collect several different types of information for various purposes to provide and
            improve our service to you.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li>
              <strong>Personal Identification Information:</strong> While using our site, particularly when inquiring
              about franchise opportunities or making a purchase, we may ask you to provide us
              with certain personally identifiable information such as:
              <ul className="list-[circle] pl-6 mt-2 space-y-1">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Shipping and Billing Address</li>
                <li>Business/Professional Details (for Franchise applications)</li>
              </ul>
            </li>
            <li>
              <strong>Log Files:</strong> Honeyman follows a standard procedure of using log files. These files log
              visitors when they visit websites. The information collected includes internet
              protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time
              stamp, and referring/exit pages.
            </li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="how-we-use">
          <h2 id="how-we-use" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-foreground/90 mb-4 leading-relaxed">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li>Provide, operate, and maintain our website.</li>
            <li>Improve, personalize, and expand our product offerings.</li>
            <li>Understand and analyze how you use our website.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Process transactions and manage your orders.</li>
            <li>Communicate with you, either directly or through one of our partners, for customer
              service, updates, and marketing/promotional purposes.</li>
            <li>Evaluate and process Franchise Inquiries for the Honeyman brand.</li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="cookies">
          <h2 id="cookies" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            3. Cookies and Web Beacons
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Like any other website, Honeyman uses &quot;cookies&quot;. These cookies are used to store
            information including visitors&apos; preferences, and the pages on the website that the visitor
            accessed or visited. The information is used to optimize the users&apos; experience by customizing
            our web page content based on visitors&apos; browser type and/or other information.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="third-party">
          <h2 id="third-party" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            4. Third-Party Privacy Policies
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Honeyman&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are
            advising you to consult the respective Privacy Policies of these third-party ad servers (such
            as Google or social media platforms) for more detailed information.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="data-rights">
          <h2 id="data-rights" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            5. Data Protection Rights
          </h2>
          <p className="text-foreground/90 mb-4 leading-relaxed">
            We want to make sure you are fully aware of all of your data protection rights. Every user is
            entitled to the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any
              information you believe is inaccurate.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data,
              under certain conditions.</li>
            <li><strong>The right to object to processing:</strong> You have the right to object to our processing of
              your personal data, especially for direct marketing.</li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="children">
          <h2 id="children" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            6. Children&apos;s Information
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Another part of our priority is adding protection for children while using the internet. We
            encourage parents and guardians to observe, participate in, and/or monitor and guide their
            online activity. Honeyman does not knowingly collect any Personal Identifiable Information
            from children under the age of 13.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="consent">
          <h2 id="consent" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            7. Consent
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and
            Conditions.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="contact">
          <h2 id="contact" className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-foreground/90 mb-4 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90">
            <li>By email: <a href="mailto:hello@honeyman.in" className="text-amber-700 hover:underline font-medium">hello@honeyman.in</a></li>
              
          </ul>
        </section>
      </article>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
