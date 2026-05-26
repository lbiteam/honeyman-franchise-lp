import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const zohoClientId = import.meta.env.VITE_ZOHO_CLIENT_ID;
const zohoClientSecret = import.meta.env.VITE_ZOHO_CLIENT_SECRET;
const zohoRefreshToken = import.meta.env.VITE_ZOHO_REFRESH_TOKEN;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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

type ChooseModel = "Ice Cream" | "Chai Plus" | "";

const PREFERRED_MODEL_OPTIONS: Record<Exclude<ChooseModel, "">, string[]> = {
  "Ice Cream": [
    "Ice Cream Cart (₹4-5L)",
    "Ice Cream Parlour (₹15-20L)",
    "Cafe Honeyman (₹25-30L)",
  ],
  "Chai Plus": [
    "Chai Plus Express (₹5-8L)",
    "Chai Plus Cafe (₹15-25L)",
    "Chai Plus Lounge (₹50L+)",
  ],
};

interface BannerFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  chooseModel: ChooseModel;
  preferredModel: string;
}

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
  formType: "franchise";
  countryCode: string;
  phoneLocal: string;
  city: string;
  chooseModel: string;
  preferredModel: string;
}

const createZohoLead = async (payload: ContactPayload): Promise<boolean> => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
    const apiEndpoint = apiBaseUrl
      ? `${apiBaseUrl}/api/zoho-lead`
      : "/api/zoho-lead";
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.status === 404) return false;
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
};

const inputClass =
  "w-full px-4 py-3 mt-1 rounded-xl bg-amber-50/50 border border-amber-100 focus:border-amber-500 focus:bg-white focus:ring-0 transition text-gray-900 placeholder:text-gray-400";
const labelClass =
  "text-xs font-bold text-amber-600 uppercase tracking-wide";

const FranchiseBannerForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BannerFormData>({
    name: "",
    email: "",
    countryCode: DEFAULT_COUNTRY_CODE,
    phone: "",
    city: "",
    chooseModel: "",
    preferredModel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "chooseModel") {
      setFormData({
        ...formData,
        chooseModel: value as ChooseModel,
        preferredModel: "",
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const preferredModelOptions =
    formData.chooseModel !== ""
      ? PREFERRED_MODEL_OPTIONS[formData.chooseModel]
      : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Please fill required fields",
        description: "Please enter your name, email and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Configuration Error",
        description: "Contact form is not properly configured. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    const countryCode = formData.countryCode.trim() || DEFAULT_COUNTRY_CODE;
    const fullPhone = formatFullPhone(countryCode, formData.phone);

    const franchiseLine = [
      formData.chooseModel && `Brand: ${formData.chooseModel}`,
      formData.preferredModel && `Preferred model: ${formData.preferredModel}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const subject = franchiseLine
      ? `Franchise - ${franchiseLine}`
      : "Franchise - Check Availability";
    const message = [
      formData.chooseModel && `Choose model: ${formData.chooseModel}`,
      formData.preferredModel && `Preferred model: ${formData.preferredModel}`,
      `City: ${formData.city || "Not provided"}`,
    ]
      .filter(Boolean)
      .join(". ");

    const payload: ContactPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: fullPhone,
      location: formData.city.trim() || "",
      subject,
      message,
      formType: "franchise",
      countryCode,
      phoneLocal: formData.phone.trim(),
      city: formData.city.trim(),
      chooseModel: formData.chooseModel,
      preferredModel: formData.preferredModel,
    };

    setIsSubmitting(true);
    let supabaseSuccess = false;
    let zohoSuccess = false;
    const errors: string[] = [];

    try {
      if (supabase) {
        const { error } = await supabase
          .from("contact_messages")
          .insert({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            location: payload.location || null,
            subject: payload.subject,
            message: payload.message,
          })
          .select()
          .single();
        if (error) {
          console.error("Supabase error:", error);
          errors.push("Supabase: " + error.message);
        } else {
          supabaseSuccess = true;
        }
      }

      if (zohoClientId && zohoClientSecret && zohoRefreshToken) {
        const zohoResult = await createZohoLead(payload);
        if (zohoResult) zohoSuccess = true;
        else errors.push("Zoho CRM: Failed to create lead");
      }

      if (supabaseSuccess || zohoSuccess) {
        setFormData({
          name: "",
          email: "",
          countryCode: DEFAULT_COUNTRY_CODE,
          phone: "",
          city: "",
          chooseModel: "",
          preferredModel: "",
        });
        navigate("/thank-you");
        return;
      } else {
        toast({
          title: "Submission Error",
          description:
            errors.length > 0
              ? errors.join("; ")
              : "Failed to submit. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        setFormData({
          name: "",
          email: "",
          countryCode: DEFAULT_COUNTRY_CODE,
          phone: "",
          city: "",
          chooseModel: "",
          preferredModel: "",
        });
      }
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      toast({
        title: "Error",
        description:
          (err as Error)?.message ||
          "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(217,119,6,0.3)] p-8 w-full max-w-md relative z-10 border-t-8 border-amber-500">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-extrabold text-gray-900">Check Availability</h3>
        <p className="text-gray-500 text-sm mt-2">
          Get the detailed franchise brochure directly to your inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              required
              placeholder="Your Name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={255}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <label htmlFor="franchiseCountryCode" className="sr-only">
              Country code
            </label>
            <select
              id="franchiseCountryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
              className="shrink-0 w-[min(11rem,42vw)] sm:w-40 px-3 py-3 mt-1 rounded-xl bg-amber-50/50 border border-amber-100 focus:border-amber-500 focus:bg-white focus:ring-0 transition text-gray-900 text-sm"
            >
              {DIALING_CODES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={15}
              required
              placeholder="1234567890"
              className={`${inputClass} min-w-0 flex-1`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            maxLength={100}
            placeholder="e.g. Mumbai, Delhi"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Choose Model</label>
          <select
            name="chooseModel"
            value={formData.chooseModel}
            onChange={handleChange}
            className={`${inputClass} text-gray-700`}
            required
          >
            <option value="" disabled>
              Select brand
            </option>
            <option value="Ice Cream">Ice Cream</option>
            <option value="Chai Plus">Chai Plus</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Preferred Model</label>
          <select
            name="preferredModel"
            value={formData.preferredModel}
            onChange={handleChange}
            disabled={!formData.chooseModel}
            className={`${inputClass} text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed`}
            required
          >
            <option value="" disabled>
              {formData.chooseModel ? "Select model" : "Select brand first"}
            </option>
            {preferredModelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-amber-500/30 mt-4 flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Request Callback
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          <i className="fas fa-lock mr-1 text-amber-300" /> 100% Data Privacy Guaranteed.
        </p>
      </form>
    </div>
  );
};

export default FranchiseBannerForm;
