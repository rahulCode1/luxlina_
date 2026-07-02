import { useState } from "react";
import styles from "./ReturnRefund.module.css";
import { useLocation } from "react-router-dom";
import Back from "../../components/Back";

const steps = [
  {
    num: "01",
    title: "Request Raised",
    desc: "Submit your return request with order details and reason",
  },
  {
    num: "02",
    title: "Review & Approval",
    desc: "Our team reviews within 24–48 hours and approves eligible returns",
  },
  {
    num: "03",
    title: "Item Pickup",
    desc: "Schedule a pickup or drop off at your nearest courier",
  },
  {
    num: "04",
    title: "Quality Check",
    desc: "Returned item is inspected at our Jaipur warehouse",
  },
  {
    num: "05",
    title: "Refund Initiated",
    desc: "Refund credited to original payment method within 5–7 business days",
  },
];

const eligibility = [
  {
    icon: "bi-check-circle",
    text: "Item received damaged or broken",
    eligible: true,
  },
  { icon: "bi-check-circle", text: "Wrong item delivered", eligible: true },
  {
    icon: "bi-check-circle",
    text: "Item significantly different from description",
    eligible: true,
  },
  {
    icon: "bi-check-circle",
    text: "Manufacturing defect found within 7 days",
    eligible: true,
  },
  {
    icon: "bi-x-circle",
    text: "Change of mind after 7 days of delivery",
    eligible: false,
  },
  {
    icon: "bi-x-circle",
    text: "Damage caused by misuse or improper handling",
    eligible: false,
  },
  {
    icon: "bi-x-circle",
    text: "Item used or altered after delivery",
    eligible: false,
  },
  {
    icon: "bi-x-circle",
    text: "Missing original packaging without prior notice",
    eligible: false,
  },
];

const faqs = [
  {
    q: "How long do I have to raise a return request?",
    a: "You must raise a return request within 24 hours of delivery for damaged, defective, or wrong items. Requests raised after this window are not eligible.",
  },
  {
    q: "Will I get a full refund including shipping?",
    a: "Yes, if the return is due to our error (wrong item, damage in transit, defect), the full amount including shipping is refunded. For buyer-initiated returns, shipping charges may be deducted.",
  },
  {
    q: "Can I exchange instead of a refund?",
    a: "Yes! If the item is in stock, we offer a direct exchange. Select 'Exchange' in the request form and we'll ship the replacement once the original item is received.",
  },
  {
    q: "What if my item breaks during return shipping?",
    a: "Please use the original packaging and wrap fragile stone pieces securely. We recommend taking photos before packing. Items damaged during return transit may not be eligible for a full refund.",
  },
  {
    q: "How will I receive my refund?",
    a: "Refunds are processed to the original payment source — UPI, bank account, or card. For COD orders, refunds are transferred via bank transfer (NEFT/IMPS).",
  },
];

const ReturnRefund = () => {
  const [activeTab, setActiveTab] = useState("policy");
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    orderId: "",
    reason: "",
    type: "refund",
    description: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const goTo = location.state?.from;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* ── Back Button ── */}
      {goTo && <Back goTo={goTo} />}

      {/* ── Hero ── */}
      <div className={styles.hero}>{/* ...rest unchanged */}</div>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroDecor} aria-hidden="true">
          <span className={styles.decor1}>◈</span>
          <span className={styles.decor2}>◈</span>
        </div>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>Customer Care</span>
          <h1 className={styles.heroTitle}>Returns &amp; Refunds</h1>
          <p className={styles.heroSub}>
            We stand behind every piece we craft. If something's not right,
            <br className={styles.br} />
            we'll make it right — simply and without hassle.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>
              <i className="bi bi-clock" /> 7-Day Return Window
            </span>
            <span className={styles.heroBadge}>
              <i className="bi bi-arrow-counterclockwise" /> Free Returns
            </span>
            <span className={styles.heroBadge}>
              <i className="bi bi-wallet2" /> 5–7 Day Refund
            </span>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabsBar}>
        <div className={styles.tabsInner}>
          {[
            { key: "policy", label: "Return Policy", icon: "bi-file-text" },
            {
              key: "request",
              label: "Raise a Request",
              icon: "bi-arrow-counterclockwise",
            },
            { key: "track", label: "Track Request", icon: "bi-search" },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.tab} ${activeTab === key ? styles.tabActive : ""}`}
              onClick={() => {
                setActiveTab(key);
                setSubmitted(false);
              }}
            >
              <i className={`bi ${icon}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {/* ══════════ POLICY TAB ══════════ */}
        {activeTab === "policy" && (
          <div className={styles.policyTab}>
            {/* Process Steps */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                How the Return Process Works
              </h2>
              <div className={styles.stepsTrack}>
                {steps.map((s, i) => (
                  <div key={s.num} className={styles.step}>
                    <div className={styles.stepNum}>{s.num}</div>
                    {i < steps.length - 1 && (
                      <div className={styles.stepLine} />
                    )}
                    <div className={styles.stepBody}>
                      <h4 className={styles.stepTitle}>{s.title}</h4>
                      <p className={styles.stepDesc}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                What's Eligible for Return?
              </h2>
              <div className={styles.eligibilityGrid}>
                <div className={styles.eligCol}>
                  <div className={styles.eligHeader}>
                    <i className="bi bi-check2-circle" />
                    <span>Eligible</span>
                  </div>
                  {eligibility
                    .filter((e) => e.eligible)
                    .map((e, i) => (
                      <div
                        key={i}
                        className={`${styles.eligItem} ${styles.eligYes}`}
                      >
                        <i className={`bi ${e.icon}`} />
                        <span>{e.text}</span>
                      </div>
                    ))}
                </div>
                <div className={styles.eligCol}>
                  <div
                    className={`${styles.eligHeader} ${styles.eligHeaderNo}`}
                  >
                    <i className="bi bi-x-circle" />
                    <span>Not Eligible</span>
                  </div>
                  {eligibility
                    .filter((e) => !e.eligible)
                    .map((e, i) => (
                      <div
                        key={i}
                        className={`${styles.eligItem} ${styles.eligNo}`}
                      >
                        <i className={`bi ${e.icon}`} />
                        <span>{e.text}</span>
                      </div>
                    ))}
                </div>
              </div>
            </section>

            {/* Refund Timeline */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Refund Timeline by Payment Method
              </h2>
              <div className={styles.timelineTable}>
                <div
                  className={styles.timelineRow + " " + styles.timelineHeader}
                >
                  <span>Payment Method</span>
                  <span>Refund Mode</span>
                  <span>Timeline</span>
                </div>
                {[
                  {
                    method: "UPI / Wallet",
                    mode: "Original source",
                    time: "1–3 business days",
                  },
                  {
                    method: "Credit / Debit Card",
                    mode: "Original card",
                    time: "5–7 business days",
                  },
                  {
                    method: "Net Banking",
                    mode: "Bank account",
                    time: "3–5 business days",
                  },
                  {
                    method: "Cash on Delivery",
                    mode: "Bank transfer (NEFT)",
                    time: "5–7 business days",
                  },
                  {
                    method: "EMI",
                    mode: "Card / NBFC",
                    time: "7–10 business days",
                  },
                ].map((r, i) => (
                  <div key={i} className={styles.timelineRow}>
                    <span className={styles.timelineMethod}>{r.method}</span>
                    <span className={styles.timelineMode}>{r.mode}</span>
                    <span className={styles.timelineTime}>{r.time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Frequently Asked Questions
              </h2>
              <div className={styles.faqList}>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}
                  >
                    <button
                      className={styles.faqQ}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{faq.q}</span>
                      <i
                        className={`bi ${openFaq === i ? "bi-dash" : "bi-plus"}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className={styles.faqA}>{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.ctaStrip}>
              <p>Ready to raise a request?</p>
              <button
                className={styles.ctaBtn}
                onClick={() => setActiveTab("request")}
              >
                Start Return / Refund <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        )}

        {/* ══════════ REQUEST TAB ══════════ */}
        {activeTab === "request" && (
          <div className={styles.requestTab}>
            {submitted ? (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>
                  <i className="bi bi-check2" />
                </div>
                <h2 className={styles.successTitle}>Request Submitted!</h2>
                <p className={styles.successSub}>
                  We've received your return/refund request. Our team will
                  review it and reach out to <strong>{form.contact}</strong>{" "}
                  within 24–48 hours.
                </p>
                <div className={styles.successRef}>
                  Reference ID:{" "}
                  <strong>RR-{Date.now().toString().slice(-8)}</strong>
                </div>
                <div className={styles.successActions}>
                  <button
                    className={styles.ctaBtn}
                    onClick={() => {
                      setActiveTab("track");
                      setSubmitted(false);
                    }}
                  >
                    <i className="bi bi-search" /> Track This Request
                  </button>
                  <button
                    className={styles.outlineBtn}
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        orderId: "",
                        reason: "",
                        type: "refund",
                        description: "",
                        contact: "",
                      });
                    }}
                  >
                    Raise Another
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.formWrapper}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>
                    Raise a Return or Refund Request
                  </h2>
                  <p className={styles.formSub}>
                    Fill in the details below. Our team typically responds
                    within 24–48 hours.
                  </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  {/* Type toggle */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Request Type</label>
                    <div className={styles.typeToggle}>
                      {["refund", "exchange", "return"].map((t) => (
                        <label
                          key={t}
                          className={`${styles.typeOption} ${form.type === t ? styles.typeSelected : ""}`}
                        >
                          <input
                            type="radio"
                            name="type"
                            value={t}
                            checked={form.type === t}
                            onChange={handleChange}
                            hidden
                          />
                          <i
                            className={`bi ${t === "refund" ? "bi-wallet2" : t === "exchange" ? "bi-arrow-left-right" : "bi-box-arrow-in-left"}`}
                          />
                          <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Order ID */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="orderId">
                      Order ID *
                    </label>
                    <input
                      id="orderId"
                      name="orderId"
                      value={form.orderId}
                      onChange={handleChange}
                      required
                      placeholder="e.g. ORD-20240918-001"
                      className={styles.input}
                    />
                  </div>

                  {/* Reason */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="reason">
                      Reason *
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    >
                      <option value="" disabled>
                        Select a reason
                      </option>
                      <option value="damaged">Item received damaged</option>
                      <option value="wrong">Wrong item delivered</option>
                      <option value="defective">Manufacturing defect</option>
                      <option value="different">
                        Item different from description
                      </option>
                      <option value="missing">
                        Parts or accessories missing
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="description">
                      Describe the Issue *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Please describe the issue clearly. Mention if you have photos of the damage."
                      className={`${styles.input} ${styles.textarea}`}
                    />
                  </div>

                  {/* Contact */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="contact">
                      Phone / Email *
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      required
                      placeholder="We'll reach out here"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formNote}>
                    <i className="bi bi-info-circle" />
                    <span>
                      Attach photos of the item via email to{" "}
                      <strong>support@luxlina.in</strong> quoting your
                      Order ID for faster processing.
                    </span>
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Submit Request <i className="bi bi-send" />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ══════════ TRACK TAB ══════════ */}
        {activeTab === "track" && (
          <div className={styles.trackTab}>
            <div className={styles.trackCard}>
              <h2 className={styles.formTitle}>Track Your Request</h2>
              <p className={styles.formSub}>
                Enter your Reference ID or Order ID to check the status.
              </p>
              <div className={styles.trackInputRow}>
                <input
                  placeholder="Reference ID or Order ID"
                  className={styles.input}
                />
                <button className={styles.ctaBtn}>
                  <i className="bi bi-search" /> Search
                </button>
              </div>
              <div className={styles.trackHint}>
                <i className="bi bi-envelope" />
                Or check your email for the reference ID sent at the time of
                request submission.
              </div>
            </div>

            <div className={styles.contactCard}>
              <h3 className={styles.contactCardTitle}>Need Immediate Help?</h3>
              <p className={styles.contactCardSub}>
                Our support team is available Monday–Saturday, 10 AM to 6 PM
                IST.
              </p>
              <div className={styles.contactOptions}>
                <a
                  href="mailto:support@luxlina.in"
                  className={styles.contactOption}
                >
                  <i className="bi bi-envelope-fill" />
                  <div>
                    <span className={styles.contactOptLabel}>
                      Email Support
                    </span>
                    <span className={styles.contactOptVal}>
                      rahulkumawat50665@gmail.com
                    </span>
                  </div>
                </a>
                <a href="tel:+911234567890" className={styles.contactOption}>
                  <i className="bi bi-telephone-fill" />
                  <div>
                    <span className={styles.contactOptLabel}>Call Us</span>
                    <span className={styles.contactOptVal}>+916377408633</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/6377408633"
                  className={styles.contactOption}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-whatsapp" />
                  <div>
                    <span className={styles.contactOptLabel}>WhatsApp</span>
                    <span className={styles.contactOptVal}>Chat with us</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnRefund;
