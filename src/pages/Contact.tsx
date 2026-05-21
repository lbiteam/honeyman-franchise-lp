import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client directly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Zoho CRM Configuration
const zohoClientId = import.meta.env.VITE_ZOHO_CLIENT_ID;
const zohoClientSecret = import.meta.env.VITE_ZOHO_CLIENT_SECRET;
const zohoRefreshToken = import.meta.env.VITE_ZOHO_REFRESH_TOKEN;
const zohoApiDomain = import.meta.env.VITE_ZOHO_API_DOMAIN || 'https://www.zohoapis.com'; // or .in for India
const zohoRegion = import.meta.env.VITE_ZOHO_REGION || 'com'; // 'com' or 'in'

// Check if environment variables are present
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables. Check your .env.local file.");
}

if (!zohoClientId || !zohoClientSecret || !zohoRefreshToken) {
  console.warn("Missing Zoho CRM environment variables. Zoho integration will be skipped.");
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const DEFAULT_COUNTRY_CODE = "+91";

const DIALING_CODES: { value: string; label: string }[] = [
  { value: "+91", label: "India (+91)" },
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+966", label: "Saudi Arabia (+966)" },
  { value: "+974", label: "Qatar (+974)" },
  { value: "+965", label: "Kuwait (+965)" },
  { value: "+973", label: "Bahrain (+973)" },
  { value: "+968", label: "Oman (+968)" },
  { value: "+65", label: "Singapore (+65)" },
  { value: "+60", label: "Malaysia (+60)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+86", label: "China (+86)" },
  { value: "+81", label: "Japan (+81)" },
];

function formatFullPhone(countryCode: string, localPhone: string): string {
  const cc = countryCode.trim();
  const local = localPhone.replace(/\s/g, "").trim();
  if (!cc && !local) return "";
  if (!local) return cc;
  return `${cc} ${local}`;
}

// Zoho CRM API Function - Calls serverless function to avoid CORS
const createZohoLead = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Determine API endpoint based on environment
    // For production: use relative path /api/zoho-lead
    // For local dev with Vercel CLI: use /api/zoho-lead
    // For local dev without Vercel: you can set VITE_API_BASE_URL to a backend URL
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const apiEndpoint = apiBaseUrl 
      ? `${apiBaseUrl}/api/zoho-lead`
      : '/api/zoho-lead';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Handle 404 - API endpoint not available (local dev without Vercel CLI)
    if (response.status === 404) {
      console.warn('Zoho API endpoint not found. Skipping Zoho CRM integration. Use Vercel CLI for local development.');
      return false;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Zoho API error response:', errorData);
      throw new Error(`Zoho API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.success === true;
  } catch (error: any) {
    // Handle network errors (endpoint doesn't exist)
    if (error.message?.includes('Failed to fetch') || error.message?.includes('Not Found')) {
      console.warn('Zoho API endpoint not available. Skipping Zoho CRM integration.');
      return false;
    }
    console.error('Error creating Zoho lead:', error);
    return false;
  }
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: DEFAULT_COUNTRY_CODE,
    phone: "",
    location: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      toast({
        title: "Please fill required fields",
        description: "Name, email, phone and message are required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Configuration Error",
        description: "Contact form is not properly configured. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const countryCode = formData.countryCode.trim() || DEFAULT_COUNTRY_CODE;
    const fullPhone = formatFullPhone(countryCode, formData.phone);

    const payload: ContactFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: fullPhone,
      location: formData.location.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    };

    let supabaseSuccess = false;
    let zohoSuccess = false;
    const errors: string[] = [];

    try {
      // Submit to Supabase
      if (supabaseUrl && supabaseKey) {
        try {
          const { data, error } = await supabase
            .from('contact_messages')
            .insert({
              name: payload.name,
              email: payload.email,
              phone: payload.phone || null,
              location: payload.location || null,
              subject: payload.subject || null,
              message: payload.message,
            })
            .select()
            .single();

          if (error) {
            console.error('Supabase error:', error);
            errors.push('Supabase: ' + error.message);
          } else {
            supabaseSuccess = true;
          }
        } catch (error: any) {
          console.error('Supabase submission error:', error);
          errors.push('Supabase: ' + (error.message || 'Unknown error'));
        }
      }

      // Submit to Zoho CRM via serverless function
      if (zohoClientId && zohoClientSecret && zohoRefreshToken) {
        try {
          const zohoResult = await createZohoLead(payload);
          if (zohoResult) {
            zohoSuccess = true;
          } else {
            errors.push('Zoho CRM: Failed to create lead');
          }
        } catch (error: any) {
          console.error('Zoho CRM submission error:', error);
          errors.push('Zoho CRM: ' + (error.message || 'Unknown error'));
        }
      }

      // Show success: redirect to thank-you page instead of toast
      if (supabaseSuccess || zohoSuccess) {
        setFormData({
          name: "",
          email: "",
          countryCode: DEFAULT_COUNTRY_CODE,
          phone: "",
          location: "",
          subject: "",
          message: "",
        });
        navigate("/thank-you");
        return;
      } else {
        // If both failed, show error but still reset form
        toast({
          title: "Submission Error",
          description: errors.length > 0 
            ? errors.join('; ') 
            : "Failed to submit. Please try again.",
          variant: "destructive",
          duration: 5000,
        });

        // Still reset form even on error
        setFormData({
          name: "",
          email: "",
          countryCode: DEFAULT_COUNTRY_CODE,
          phone: "",
          location: "",
          subject: "",
          message: "",
        });
      }

    } catch (error: any) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of your component remains exactly the same...
  // [Keep all your existing JSX code below]
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-14 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Have a question or want to start your franchise journey? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-5 sm:p-8 shadow-soft">
              <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Keep all your existing form fields exactly as they were */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      required={true}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email 
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={255}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-medium text-foreground mb-2">
                    Phone <span className="text-destructive">*</span>
                  </span>
                  <div className="flex gap-2 w-full">
                    <label htmlFor="contactCountryCode" className="sr-only">
                      Country code
                    </label>
                    <select
                      id="contactCountryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      required
                      className="shrink-0 w-24 sm:w-40 px-2 sm:px-3 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {DIALING_CODES.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      required
                      className="min-w-0 flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your city or location"
                    />
                  </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="" disabled selected>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="franchise">Franchise Opportunity</option>
                    
                    <option value="support">Support Request</option>
                  
                  
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={1000}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="honey-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
              
              {/* Company Address */}
              <div className="mt-8 bg-card rounded-lg p-5 sm:p-6 shadow-soft">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 break-words">
                  Honeyman Foods Pvt. Ltd.
                </h3>
                <address className="text-muted-foreground text-sm leading-relaxed not-italic break-words" dangerouslySetInnerHTML={{ __html: "677/4 T.S-1 S. No. 301, Railway Road, GURU NANAKPURA,Doraha, Ludhiana, Punjab, 141421" }} />
              </div>
            </div>

            {/* Contact Info section */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4 sm:mb-6">
                  Contact Information
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you with all your queries.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: Phone, title: "Phone", details: ["+91 96503 05025"] },
                  { icon: Mail, title: "Email", details: ["hello@honeyman.in", "support@honeyman.in"] },
                  { icon: MapPin, title: "Address", details: ["HONEYMAN Gurgaon office", "Unit No. 106, First Floor, IRIS Tech Park, Sector – 48,Gurugram – Sohna Road, Gurugram – 122018"] },
                  { icon: Clock, title: "Business Hours", details: ["Mon - Sun: 10:00 AM - 7:00 PM"] },
                ].map((info, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-5 sm:p-6 shadow-soft hover:shadow-honey transition-shadow duration-300 min-w-0"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm break-words">{detail}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="bg-card rounded-xl overflow-hidden shadow-soft">
                <iframe
                  title="Honeyman Foods Location"
                  width="100%"
                  height="300"
                  className="block w-full h-[260px] sm:h-[360px] md:h-[400px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d65501.87132426831!2d77.0392392!3d28.4183872!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d233662c2b4f1%3A0xf0f85bfc0d1005b5!2sHoneyman%20Foods%20Pvt.%20Ltd!5e1!3m2!1sen!2sin!4v1765800965824!5m2!1sen!2sin"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locator & Franchise CTA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Store Locator */}
        <div className="bg-gradient-to-r from-honey to-honey-dark py-12 sm:py-16 px-5 sm:px-8 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              Find a Honeyman Store
            </h2>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">
              Near You
            </h3>
            <div className="w-16 sm:w-20 h-1 bg-black mx-auto mb-5 sm:mb-6"></div>
            <p className="text-black/80 mb-6 sm:mb-8 text-base sm:text-lg">
              Locate your nearest store and enjoy our honey-based delights with ease.
            </p>
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-wider transition-colors rounded-2xl" onClick={() => window.location.href = '/store-locator'}>
              Store Locator
            </button>
          </div>
        </div>

        {/* Franchise CTA */}
        <div className="bg-gradient-to-br from-orange-200 to-yellow-100 py-12 sm:py-16 px-5 sm:px-8 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              Explore Our Range
            </h2>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">
              of Honey-Based Products
            </h3>
            <div className="w-16 sm:w-20 h-1 bg-black mx-auto mb-5 sm:mb-6"></div>
            <p className="text-black/80 mb-6 sm:mb-8 text-base sm:text-lg">
              Discover the full ecosystem of refined sugar-free products, sweetened only with natural honey.
            </p>
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-wider transition-colors rounded-2xl" onClick={() => window.location.href = 'https://honeymanstore.com'}>
              view Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;