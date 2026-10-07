import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

const LOOKING_FOR_OPTIONS = [
  "Project Finance",
  "Asset Sale",
  "Power Purchase Agreement",
  "Others",
];

// Indian states + union territories
const STATE_OPTIONS = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const STORAGE_KEY = "decircle_lead_modal_v1";

// Same normalization as Contact.jsx — the base may or may not already end in /api.
const RAW_API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const LEAD_ENDPOINT = RAW_API_BASE.endsWith("/api")
  ? `${RAW_API_BASE}/lead`
  : `${RAW_API_BASE}/api/lead`;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  state: "",
  lookingFor: "",
  message: "",
  // honeypot field — real users never fill this in; bots usually do
  company_website: "",
};

// Set ONLY after a successful submit — until then the modal re-asks on
// every revisit / tab-return.
function hasSubmitted() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markDone() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage unavailable (private mode etc.) — modal will simply show again
  }
}

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const successTimer = useRef(null);
  const reopenTimer = useRef(null);
  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Dismiss only hides for now — the flag is written on successful submit,
  // so an unfinished user is asked again on revisit / tab-return.
  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (hasSubmitted()) return undefined;
    const timer = window.setTimeout(() => setOpen(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  // When the user comes back to the tab without having submitted, ask again.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      if (hasSubmitted()) return;
      if (statusRef.current === "submitting" || statusRef.current === "success") return;
      window.clearTimeout(reopenTimer.current);
      reopenTimer.current = window.setTimeout(() => setOpen(true), 1000);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearTimeout(reopenTimer.current);
    };
  }, []);

  // Lock page scroll + allow Escape to dismiss while the modal is open
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      // defaultPrevented = a dropdown (or similar) consumed the Escape first
      if (e.key === "Escape" && !e.defaultPrevented) close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(successTimer.current), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      return "Please enter your full name.";
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (form.phone.trim() && !/^[0-9+\-\s()]{7,30}$/.test(form.phone.trim())) {
      return "Please enter a valid phone number.";
    }
    if (!form.company.trim()) {
      return "Please enter your business name.";
    }
    if (!form.state) {
      return "Please select your state.";
    }
    if (!form.lookingFor) {
      return "Please select what you are looking for.";
    }
    if (form.message && form.message.length > 2000) {
      return "Message is too long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot: if filled, silently "succeed" without sending (bot trap)
    if (form.company_website) {
      setStatus("success");
      markDone();
      successTimer.current = window.setTimeout(() => setOpen(false), 2500);
      return;
    }

    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          state: form.state,
          lookingFor: form.lookingFor,
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialForm);
      markDone();
      successTimer.current = window.setTimeout(() => setOpen(false), 2500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (!open) return null;

  if (status === "success") {
    return (
      <div className="lead-overlay">
        <div className="lead-modal lead-success" role="alert">
          <div className="lead-success-tick">✓</div>
          <h2 id="leadModalTitle">Thank you!</h2>
          <p>Your details have been received. We&apos;ll get in touch shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="lead-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leadModalTitle"
    >
      <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lead-close"
          aria-label="Close"
          onClick={close}
        >
          ×
        </button>

        <div className="eyebrow">Let&apos;s Connect</div>
        <h2 id="leadModalTitle">Tell us about yourself</h2>
        <p className="lead-sub">
          A few quick details so we can route your enquiry to the right team.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
              value={form.fullName}
              onChange={handleChange}
              maxLength={120}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              value={form.email}
              onChange={handleChange}
              maxLength={180}
              autoComplete="email"
            />
          </div>
          <div className="form-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              maxLength={30}
              autoComplete="tel"
            />
            <input
              type="text"
              name="company"
              placeholder="Business Name *"
              required
              value={form.company}
              onChange={handleChange}
              maxLength={150}
              autoComplete="organization"
            />
          </div>
          <div className="form-row">
            <Dropdown
              name="state"
              value={form.state}
              options={STATE_OPTIONS}
              placeholder="State *"
              onChange={handleChange}
            />
            <Dropdown
              name="lookingFor"
              value={form.lookingFor}
              options={LOOKING_FOR_OPTIONS}
              placeholder="What are you looking for? *"
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            maxLength={2000}
          ></textarea>

          {/* Honeypot field — hidden from real users via CSS, catches simple bots */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="lead_company_website">Leave this field empty</label>
            <input
              type="text"
              id="lead_company_website"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              value={form.company_website}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary lead-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting…" : "Submit"}
          </button>

          {status === "error" && (
            <p className="lead-error">{errorMsg}</p>
          )}

          <p className="consent">
            By submitting, you agree to be contacted by DeCircle Solar
            regarding your enquiry.
          </p>
        </form>
      </div>
    </div>
  );
}
