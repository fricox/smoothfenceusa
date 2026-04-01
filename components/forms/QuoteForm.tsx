"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  fenceType: string;
  linearFeet: string;
  hoa: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type QuoteResponse = {
  ok: boolean;
  error?: string;
};

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  fenceType: "",
  linearFeet: "",
  hoa: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const fenceOptions = ["Vinyl", "Aluminum", "Chain-link", "Wood", "Not sure yet"];

const hoaOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure yet" },
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

// --- Address autocomplete types ---
type Suggestion = { place_id: string; description: string };

function useAddressSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.length < 4) { setSuggestions([]); return; }

    timerRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          input: query,
          components: "country:us",
          types: "address",
        });
        const res = await fetch(`/api/places?${params}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.predictions ?? []);
        }
      } catch {
        setSuggestions([]);
      }
    }, 350);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  return suggestions;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);

  const suggestions = useAddressSuggestions(formData.address);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (addressRef.current && !addressRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute min date (today)
  const today = new Date().toISOString().split("T")[0];

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.address.trim()) newErrors.address = "Property address is required.";
    if (!formData.fenceType) newErrors.fenceType = "Select a fence type that fits your needs.";
    if (!formData.hoa) newErrors.hoa = "Let us know if an HOA is involved.";
    if (!formData.message.trim()) newErrors.message = "Share a few details about your project.";
    return newErrors;
  };

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "address") setShowSuggestions(true);
  }, []);

  const handleSelectAddress = useCallback((description: string) => {
    setFormData((prev) => ({ ...prev, address: description }));
    setShowSuggestions(false);
  }, []);

  const handleTimeSelect = useCallback((slot: string) => {
    setFormData((prev) => ({ ...prev, preferredTime: slot }));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setSubmitError(null);
    setIsSubmitting(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data: QuoteResponse | null = null;
      try { data = await response.json(); } catch { data = null; }

      if (!response.ok || !data?.ok) {
        setSubmitError(data?.error ?? "Something went wrong. Please try again in a moment.");
        return;
      }

      setSubmitError(null);
      setStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Quote request failed:", error);
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-brand-light/70 bg-white px-4 py-3 text-sm text-brand-deep shadow-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30";

  return (
    <section
      id="quote"
      className="rounded-3xl bg-white px-5 py-8 shadow-xl ring-1 ring-brand-light/60 sm:px-8 sm:py-10"
    >
      <div className="mb-8 space-y-3 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
          Tell us about your project
        </p>
        <h2 className="text-2xl font-bold text-brand-deep sm:text-3xl">
          Request your personalized fence quote
        </h2>
        <p className="text-sm text-brand-deep/70 sm:text-base">
          The more details you share, the faster we can provide accurate pricing
          and schedule your installation.
        </p>
      </div>

      {submitError && (
        <div role="alert" className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {status === "success" && (
        <div role="status" aria-live="polite" className="mb-6 rounded-2xl bg-brand-light/30 px-4 py-3 text-sm text-brand-deep">
          Thanks! Your request is in our queue. A SmoothFenceUSA specialist will reach out shortly.
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Row 1: Name + Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-brand-deep">Full name *</label>
            <input
              id="fullName" name="fullName" type="text"
              className={inputClass}
              value={formData.fullName} onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              autoComplete="name" required
            />
            {errors.fullName && <p id="fullName-error" className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-brand-deep">Phone *</label>
            <input
              id="phone" name="phone" type="tel"
              className={inputClass}
              value={formData.phone} onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              autoComplete="tel" required
            />
            {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-brand-deep">Email *</label>
            <input
              id="email" name="email" type="email"
              className={inputClass}
              value={formData.email} onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email" required
            />
            {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="preferredDate" className="text-sm font-medium text-brand-deep">
              Preferred visit date
            </label>
            <input
              id="preferredDate" name="preferredDate" type="date"
              min={today}
              className={inputClass}
              value={formData.preferredDate} onChange={handleChange}
            />
          </div>
        </div>

        {/* Time slots — shown after date is chosen */}
        {formData.preferredDate && (
          <div>
            <p className="mb-2 text-sm font-medium text-brand-deep">
              Preferred time{" "}
              <span className="font-normal text-brand-deep/50">(optional)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleTimeSelect(slot)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    formData.preferredTime === slot
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-brand-light bg-white text-brand-deep hover:border-brand-green hover:text-brand-green"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Address with autocomplete */}
        <div ref={addressRef} className="relative">
          <label htmlFor="address" className="text-sm font-medium text-brand-deep">
            Property address *
          </label>
          <input
            id="address" name="address" type="text"
            className={inputClass}
            value={formData.address} onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
            autoComplete="off"
            placeholder="Start typing your address…"
            required
          />
          {errors.address && <p id="address-error" className="mt-1 text-xs text-red-600">{errors.address}</p>}

          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full z-30 mt-1 max-h-52 overflow-auto rounded-2xl border border-brand-light bg-white py-1 shadow-xl"
            >
              {suggestions.map((s) => (
                <li
                  key={s.place_id}
                  role="option"
                  aria-selected={formData.address === s.description}
                  className="cursor-pointer px-4 py-2.5 text-sm text-brand-deep hover:bg-brand-light/30"
                  onMouseDown={() => handleSelectAddress(s.description)}
                >
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fence type + linear feet + HOA */}
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="fenceType" className="text-sm font-medium text-brand-deep">Fence type *</label>
            <select
              id="fenceType" name="fenceType"
              className={`${inputClass} appearance-none`}
              value={formData.fenceType} onChange={handleChange}
              aria-invalid={Boolean(errors.fenceType)}
              aria-describedby={errors.fenceType ? "fenceType-error" : undefined}
              required
            >
              <option value="">Select an option</option>
              {fenceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.fenceType && <p id="fenceType-error" className="mt-1 text-xs text-red-600">{errors.fenceType}</p>}
          </div>

          <div>
            <label htmlFor="linearFeet" className="text-sm font-medium text-brand-deep">Approx. linear feet</label>
            <input
              id="linearFeet" name="linearFeet" type="number" min="0"
              className={inputClass}
              value={formData.linearFeet} onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="hoa" className="text-sm font-medium text-brand-deep">HOA involved? *</label>
            <select
              id="hoa" name="hoa"
              className={`${inputClass} appearance-none`}
              value={formData.hoa} onChange={handleChange}
              aria-invalid={Boolean(errors.hoa)}
              aria-describedby={errors.hoa ? "hoa-error" : undefined}
              required
            >
              <option value="">Select an option</option>
              {hoaOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.hoa && <p id="hoa-error" className="mt-1 text-xs text-red-600">{errors.hoa}</p>}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="text-sm font-medium text-brand-deep">Message / project details *</label>
          <textarea
            id="message" name="message" rows={4}
            className={`${inputClass} resize-none`}
            value={formData.message} onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            required
          />
          {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-deep/60">
            By submitting, you agree to be contacted about your quote request.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Send request"}
          </button>
        </div>
      </form>
    </section>
  );
}
