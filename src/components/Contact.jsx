import { useState } from "react";

const ENQUIRY_OPTIONS = [
  "Solar Project Development",
  "Project Finance",
  "Asset Sale / Acquisition",
  "EPC / Execution Partnership",
  "Investment Opportunity",
  "Strategic Partnership",
  "Other",
];

const CTA_CHIPS = [
  { label: "I have a project", value: "Solar Project Development" },
  { label: "I want to invest", value: "Investment Opportunity" },
  { label: "I want to sell an asset", value: "Asset Sale / Acquisition" },
  { label: "I want to partner", value: "Strategic Partnership" },
];

// VITE_API_BASE_URL may be a bare origin (http://localhost:6100) or already
// include the /api path (https://website-staging.decirclesolar.com/api) —
// normalize so we never end up with a doubled /api/api/contact either way.
const RAW_API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const CONTACT_ENDPOINT = RAW_API_BASE.endsWith("/api")
  ? `${RAW_API_BASE}/contact`
  : `${RAW_API_BASE}/api/contact`;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  enquiry: "",
  message: "",
  // honeypot field — real users never fill this in; bots usually do
  company_website: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [activeChip, setActiveChip] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChipClick = (chip) => {
    setForm((f) => ({ ...f, enquiry: chip.value }));
    setActiveChip(chip.value);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || form.name.trim().length < 2) {
      return "Please enter your full name.";
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!form.enquiry) {
      return "Please select how we can help.";
    }
    if (form.message && form.message.length > 5000) {
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
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          enquiry: form.enquiry,
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialForm);
      setActiveChip(null);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow">Get In Touch</div>
          <h2
            style={{
              fontSize: "clamp(22px,2.6vw,30px)",
              color: "var(--navy)",
              marginBottom: "20px",
            }}
          >
            Let&apos;s build the next asset together
          </h2>
          <p
            style={{
              color: "var(--ink-70)",
              fontSize: "15.6px",
              marginBottom: "24px",
            }}
          >
            Speak with the DCS team about your project, capital or
            transaction.
          </p>

          <div className="cta-chip-row">
            {CTA_CHIPS.map((chip) => (
              <button
                type="button"
                key={chip.value}
                className={`cta-chip${activeChip === chip.value ? " active" : ""}`}
                onClick={() => handleChipClick(chip)}
              >
                {chip.label}
              </button>
            ))}
          </div>
  
          {/* <div className="c-block">
            <h4>Email</h4>
            <p>
              <a href="mailto:care@decirclesolar.com">care@decirclesolar.com</a>
            </p>
          </div>
          <div className="c-block">
            <h4>Phone</h4>
            <a href="tel:+9963891911">+91 9963891911</a>
          </div>
          <div className="c-block">
            <h4>Regions Served</h4>
            <p>UAE · India</p>
          </div> */}
          <div className="c-block">
            <h4>Company Profile</h4>
            <a
              href="/DeCircle_Solar_lrs.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Company Profile ↗
            </a>
          </div>
          <a
            href="https://www.linkedin.com/company/decircle-solar-dwc-llc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="var(--orange)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                maxLength={120}
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
              <select
                required
                id="enquirySelect"
                name="enquiry"
                value={form.enquiry}
                onChange={handleChange}
              >
                <option value="">How can we help?</option>
                {ENQUIRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              maxLength={5000}
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
              <label htmlFor="company_website">Leave this field empty</label>
              <input
                type="text"
                id="company_website"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={form.company_website}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p style={{ color: "var(--navy)", fontSize: "14.5px", fontWeight: 600 }}>
                Thank you — Your message has been sent. We&apos;ll get in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "var(--orange)", fontSize: "14.5px", fontWeight: 600 }}>
                {errorMsg}
              </p>
            )}

            <p className="consent">
              By submitting, you agree to be contacted by DeCircle Solar
              regarding your enquiry.
            </p>
          </form>
        </div>
      </div>
      <div className="wrap">
        <div className="office-grid">
          <div className="office-card">
            <h5>Dubai · HQ</h5>
            <h4>DeCircle Solar DWC LLC</h4>
            <p>
              3rd Floor, A3 building, DWC Business Center,
              <br />
              Dubai South, Dubai, UAE
            </p>
          </div>
          <div className="office-card">
            <h5>Mumbai</h5>
            <h4>DeCircle Solar Holdings Pvt Ltd</h4>
            <p>
              602, Lodha Supremus, Powai,
              <br />
              Mumbai, Maharashtra 400072
            </p>
          </div>
          </div>
      </div>
    </section>
  );
}
