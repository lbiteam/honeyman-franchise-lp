import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const DEFAULT_COUNTRY_CODE = "+91";

type PhoneRule = {
  label: string;
  length: number | number[];
  startPattern: RegExp;
  hint: string;
};

const COUNTRY_PHONE_RULES: Record<string, PhoneRule> = {
  "+91": {
    label: "India (+91)",
    length: 10,
    startPattern: /^[6-9]/,
    hint: "Enter a 10-digit Indian number starting with 6, 7, 8, or 9.",
  },
  "+1": {
    label: "United States (+1)",
    length: 10,
    startPattern: /^[2-9]/,
    hint: "Enter a 10-digit US number starting with 2–9.",
  },
  "+44": {
    label: "United Kingdom (+44)",
    length: 10,
    startPattern: /^[1-9]/,
    hint: "Enter a valid 10-digit UK number without the country code.",
  },
  "+971": {
    label: "UAE (+971)",
    length: 9,
    startPattern: /^5/,
    hint: "Enter a 9-digit UAE mobile number starting with 5.",
  },
  "+966": {
    label: "Saudi Arabia (+966)",
    length: 9,
    startPattern: /^5/,
    hint: "Enter a 9-digit Saudi mobile number starting with 5.",
  },
  "+974": {
    label: "Qatar (+974)",
    length: 8,
    startPattern: /^[3-7]/,
    hint: "Enter a valid 8-digit Qatar number.",
  },
  "+965": {
    label: "Kuwait (+965)",
    length: 8,
    startPattern: /^[2569]/,
    hint: "Enter a valid 8-digit Kuwait number.",
  },
  "+973": {
    label: "Bahrain (+973)",
    length: 8,
    startPattern: /^[13679]/,
    hint: "Enter a valid 8-digit Bahrain number.",
  },
  "+968": {
    label: "Oman (+968)",
    length: 8,
    startPattern: /^[279]/,
    hint: "Enter a valid 8-digit Oman number.",
  },
  "+65": {
    label: "Singapore (+65)",
    length: 8,
    startPattern: /^[3689]/,
    hint: "Enter a valid 8-digit Singapore number.",
  },
  "+60": {
    label: "Malaysia (+60)",
    length: [9, 10],
    startPattern: /^1/,
    hint: "Enter a valid 9- or 10-digit Malaysian number starting with 1.",
  },
  "+61": {
    label: "Australia (+61)",
    length: 9,
    startPattern: /^[23478]/,
    hint: "Enter a valid 9-digit Australian number.",
  },
  "+86": {
    label: "China (+86)",
    length: 11,
    startPattern: /^1/,
    hint: "Enter an 11-digit Chinese mobile number starting with 1.",
  },
  "+81": {
    label: "Japan (+81)",
    length: [9, 10],
    startPattern: /^[1-9]/,
    hint: "Enter a valid Japanese number without the country code.",
  },
};

const DIALING_CODES = Object.entries(COUNTRY_PHONE_RULES).map(
  ([value, rule]) => ({
    value,
    label: rule.label,
  })
);

function formatFullPhone(countryCode: string, localPhone: string): string {
  const cc = countryCode.trim();
  const local = localPhone.replace(/\D/g, "").trim();

  if (!cc && !local) return "";
  if (!local) return cc;

  return `${cc} ${local}`;
}

function getMaximumPhoneLength(rule?: PhoneRule): number {
  if (!rule) return 20;

  return Array.isArray(rule.length)
    ? Math.max(...rule.length)
    : rule.length;
}

function getMinimumPhoneLength(rule?: PhoneRule): number {
  if (!rule) return 1;

  return Array.isArray(rule.length)
    ? Math.min(...rule.length)
    : rule.length;
}

function isPhoneLengthValid(phone: string, rule: PhoneRule): boolean {
  if (Array.isArray(rule.length)) {
    return rule.length.includes(phone.length);
  }

  return phone.length === rule.length;
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

const createDolibarrLead = async (
  payload: ContactPayload
): Promise<boolean> => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
    const apiEndpoint = apiBaseUrl
      ? `${apiBaseUrl}/api/dolibarr-lead`
      : "/api/dolibarr-lead";

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 404 || !response.ok) return false;

    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
};

/**
 * Sends a clean non-React form event for Sales Max lead capture.
 */
function fireSalesMaxCapture(payload: ContactPayload) {
  try {
    const ghost = document.createElement("form");

    ghost.setAttribute("aria-hidden", "true");
    ghost.style.position = "absolute";
    ghost.style.left = "-9999px";
    ghost.style.top = "0";
    ghost.style.width = "1px";
    ghost.style.height = "1px";
    ghost.style.overflow = "hidden";
    ghost.style.opacity = "0";

    const addField = (name: string, value: string, type = "text") => {
      const input = document.createElement("input");
      input.type = type;
      input.name = name;
      input.value = value || "";
      ghost.appendChild(input);
    };

    addField("name", payload.name);
    addField("email", payload.email, "email");
    addField("phone", payload.phone, "tel");
    addField("city", payload.city);
    addField("chooseModel", payload.chooseModel);
    addField("preferredModel", payload.preferredModel);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    ghost.appendChild(submitButton);

    ghost.addEventListener("submit", (event) => event.preventDefault());

    document.body.appendChild(ghost);

    ghost.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      })
    );

    window.setTimeout(() => {
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    }, 2000);
  } catch (error) {
    console.warn("Sales Max capture failed:", error);
  }
}

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

  const [isInfoConfirmed, setIsInfoConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPhoneRule = COUNTRY_PHONE_RULES[formData.countryCode];

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      countryCode: DEFAULT_COUNTRY_CODE,
      phone: "",
      city: "",
      chooseModel: "",
      preferredModel: "",
    });
    setIsInfoConfirmed(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "chooseModel") {
      setFormData({
        ...formData,
        chooseModel: value as ChooseModel,
        preferredModel: "",
      });
      return;
    }

    if (name === "countryCode") {
      setFormData({
        ...formData,
        countryCode: value,
        phone: "",
      });
      return;
    }

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      const rule = COUNTRY_PHONE_RULES[formData.countryCode];
      const maxLength = getMaximumPhoneLength(rule);

      setFormData({
        ...formData,
        phone: digitsOnly.slice(0, maxLength),
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const preferredModelOptions =
    formData.chooseModel !== ""
      ? PREFERRED_MODEL_OPTIONS[formData.chooseModel]
      : [];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      toast({
        title: "Please fill required fields",
        description: "Please enter your name, email and phone number.",
        variant: "destructive",
      });
      return;
    }

    const countryCode = formData.countryCode.trim() || DEFAULT_COUNTRY_CODE;
    const phoneRule = COUNTRY_PHONE_RULES[countryCode];
    const localPhone = formData.phone.replace(/\D/g, "");

    if (
      phoneRule &&
      (!isPhoneLengthValid(localPhone, phoneRule) ||
        !phoneRule.startPattern.test(localPhone))
    ) {
      toast({
        title: "Invalid phone number",
        description: phoneRule.hint,
        variant: "destructive",
      });
      return;
    }

    if (!isInfoConfirmed) {
      toast({
        title: "Confirmation required",
        description: "Please confirm that all entered information is correct.",
        variant: "destructive",
      });
      return;
    }

    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Configuration Error",
        description:
          "Contact form is not properly configured. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    const fullPhone = formatFullPhone(countryCode, localPhone);

    const franchiseLine = [
      formData.chooseModel && `Brand: ${formData.chooseModel}`,
      formData.preferredModel &&
        `Preferred model: ${formData.preferredModel}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const subject = franchiseLine
      ? `Franchise - ${franchiseLine}`
      : "Franchise - Check Availability";

    const message = [
      formData.chooseModel && `Choose model: ${formData.chooseModel}`,
      formData.preferredModel &&
        `Preferred model: ${formData.preferredModel}`,
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
      phoneLocal: localPhone,
      city: formData.city.trim(),
      chooseModel: formData.chooseModel,
      preferredModel: formData.preferredModel,
    };

    setIsSubmitting(true);

    let supabaseSuccess = false;
    let dolibarrSuccess = false;
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
          errors.push(`Supabase: ${error.message}`);
        } else {
          supabaseSuccess = true;
        }
      }

      const dolibarrResult = await createDolibarrLead(payload);

      if (dolibarrResult) {
        dolibarrSuccess = true;
      } else {
        errors.push("Dolibarr CRM: Failed to create lead");
      }

      if (supabaseSuccess || dolibarrSuccess) {
        fireSalesMaxCapture(payload);
        resetForm();

        window.setTimeout(() => navigate("/thank-you"), 600);
        return;
      }

      toast({
        title: "Submission Error",
        description:
          errors.length > 0
            ? errors.join("; ")
            : "Failed to submit. Please try again.",
        variant: "destructive",
        duration: 5000,
      });

      resetForm();
    } catch (error: unknown) {
      console.error("Form submission error:", error);

      toast({
        title: "Error",
        description:
          (error as Error)?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(217,119,6,0.3)] p-8 w-full max-w-md relative z-10 border-t-8 border-amber-500">
      <div className="text-center mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          Free Franchise Brochure
        </p>

        <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
          Enquire &amp; Unlock Your Brochure
        </h3>

        <p className="text-gray-500 text-sm mt-2">
          Submit your details to instantly get the detailed franchise brochure
          &amp; our team will reach out to you.
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
              inputMode="numeric"
              pattern="[0-9]*"
              minLength={getMinimumPhoneLength(selectedPhoneRule)}
              maxLength={getMaximumPhoneLength(selectedPhoneRule)}
              required
              placeholder={
                selectedPhoneRule
                  ? `Enter ${selectedPhoneRule.length} digits`
                  : "Phone number"
              }
              className={`${inputClass} min-w-0 flex-1`}
            />
          </div>

          {selectedPhoneRule && (
            <p className="mt-1 text-xs text-gray-500">
              {selectedPhoneRule.hint}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            City <span className="text-red-500">*</span>
          </label>

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
          <label className={labelClass}>
            Choose Model <span className="text-red-500">*</span>
          </label>

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
          <label className={labelClass}>
            Preferred Model <span className="text-red-500">*</span>
          </label>

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

        <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3">
          <input
            type="checkbox"
            checked={isInfoConfirmed}
            onChange={(event) => setIsInfoConfirmed(event.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 accent-amber-500"
          />

          <span className="text-sm text-gray-600">
            I confirm that all information entered above is correct.
          </span>
        </label>

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
              Get Free Brochure
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
          <i className="fas fa-lock mr-1 text-amber-300" /> 100% Data Privacy
          Guaranteed.
        </p>
      </form>
    </div>
  );
};

export default FranchiseBannerForm;