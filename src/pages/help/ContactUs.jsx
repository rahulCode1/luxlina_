import { useState } from "react";
import styles from "./ContactUs.module.css";
import Back from "../../components/Back";
import { useLocation } from "react-router-dom";

const channels = [
  {
    icon: "bi-envelope-fill",
    title: "Email Support",
    desc: "For orders, returns & general queries",
    value: "rahulkumawat50665@gmail.com",
    href: "mailto:rahulkumawat50665@gmail.com",
    label: "Send Email",
    badge: "Replies within 24 hrs",
  },
  {
    icon: "bi-whatsapp",
    title: "WhatsApp Chat",
    desc: "Quickest way to reach us",
    value: "+916377408633",
    href: "https://wa.me/6377408633",
    label: "Open WhatsApp",
    badge: "Usually within 2 hrs",
  },
  {
    icon: "bi-telephone-fill",
    title: "Call Us",
    desc: "Mon – Sat, 10 AM to 6 PM IST",
    value: "+916377408633",
    href: "tel:+916377408633",
    label: "Call Now",
    badge: "Business hours only",
  },
];

const topics = [
  "Order Issue",
  "Shipping Query",
  "Return / Refund",
  "Product Information",
  "Custom / Bulk Order",
  "Payment Problem",
  "Other",
];

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const goTo = location.state?.from;
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.topic) e.topic = "Please select a topic.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    else if (form.message.trim().length < 20)
      e.message = "Please describe in at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className={styles.page}>
      {goTo && <Back goTo={goTo} />}
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="bi bi-headset" /> Support
          </span>
          <h1 className={styles.heroTitle}>
            We're Here
            <br />
            to Help
          </h1>
          <p className={styles.heroSub}>
            Reach out about your order, a product, or anything else — our team
            is always happy to assist.
          </p>
          <div className={styles.heroMeta}>
            <span>
              <i className="bi bi-clock" /> Mon – Sat, 10 AM – 6 PM IST
            </span>
            <span className={styles.dot} aria-hidden="true" />
            <span>
              <i className="bi bi-lightning-charge" /> Avg. response in 4 hrs
            </span>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Left: Channels + Info ── */}
        <aside className={styles.aside}>
          <p className={styles.asideLabel}>Reach Us Directly</p>

          <div className={styles.channels}>
            {channels.map((ch) => (
              <a
                key={ch.title}
                href={ch.href}
                target="_blank"
                rel="noreferrer"
                className={styles.channelCard}
              >
                <div className={styles.channelIcon}>
                  <i className={`bi ${ch.icon}`} />
                </div>
                <div className={styles.channelBody}>
                  <div className={styles.channelTitle}>{ch.title}</div>
                  <div className={styles.channelDesc}>{ch.desc}</div>
                  <div className={styles.channelValue}>{ch.value}</div>
                </div>
                <div className={styles.channelRight}>
                  <span className={styles.channelBadge}>{ch.badge}</span>
                  <span className={styles.channelArrow}>
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Office card */}
          <div className={styles.officeCard}>
            <div className={styles.officeHeader}>
              <i className="bi bi-geo-alt-fill" />
              <span>Studio & Workshop</span>
            </div>
            <p className={styles.officeAddr}>
              Ward no. 3, Khatu Shyam Ji
              <br />
              Sikar, Rajasthan – 332602
              <br />
              India
            </p>
          </div>

          {/* Quick links */}
          <div className={styles.quickLinks}>
            <p className={styles.asideLabel}>Helpful Resources</p>
            <a href="/faqs" className={styles.qLink}>
              <i className="bi bi-chat-square-dots" /> FAQs
            </a>
            <a href="/returns" className={styles.qLink}>
              <i className="bi bi-arrow-counterclockwise" /> Returns &amp;
              Refunds
            </a>
            <a href="/shipping-policy" className={styles.qLink}>
              <i className="bi bi-truck" /> Shipping Policy
            </a>
            <a href="/track-order" className={styles.qLink}>
              <i className="bi bi-box-seam" /> Track My Order
            </a>
          </div>
        </aside>

        {/* ── Right: Form ── */}
        <main className={styles.main}>
          {submitted ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>
                <i className="bi bi-check-lg" />
              </div>
              <h2 className={styles.successTitle}>Message Received!</h2>
              <p className={styles.successText}>
                Thank you, <strong>{form.name.split(" ")[0]}</strong>. We'll get
                back to you at <strong>{form.email}</strong> within one business
                day.
              </p>
              <div className={styles.successRef}>
                <i className="bi bi-ticket-perforated" />
                Reference: <strong>HC-{Date.now().toString().slice(-6)}</strong>
              </div>
              <button
                className={styles.successBtn}
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    orderId: "",
                    topic: "",
                    message: "",
                  });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Send Us a Message</h2>
                <p className={styles.formSub}>
                  Fill in the details below and we'll respond as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                      Full Name <span className={styles.req}>*</span>
                    </label>
                    <div
                      className={`${styles.inputWrap} ${errors.name ? styles.inputErr : ""}`}
                    >
                      <i className="bi bi-person" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Arjun Sharma"
                        value={form.name}
                        onChange={handleChange}
                        className={styles.input}
                        autoComplete="name"
                      />
                    </div>
                    {errors.name && (
                      <span className={styles.errMsg}>
                        <i className="bi bi-exclamation-circle" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email Address <span className={styles.req}>*</span>
                    </label>
                    <div
                      className={`${styles.inputWrap} ${errors.email ? styles.inputErr : ""}`}
                    >
                      <i className="bi bi-envelope" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="arjun@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={styles.input}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <span className={styles.errMsg}>
                        <i className="bi bi-exclamation-circle" />{" "}
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">
                      Phone Number{" "}
                      <span className={styles.opt}>(optional)</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <i className="bi bi-telephone" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        className={styles.input}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="orderId">
                      Order ID{" "}
                      <span className={styles.opt}>(if applicable)</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <i className="bi bi-receipt" />
                      <input
                        id="orderId"
                        name="orderId"
                        type="text"
                        placeholder="HC-XXXXXXXX"
                        value={form.orderId}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="topic">
                    Topic <span className={styles.req}>*</span>
                  </label>
                  <div
                    className={`${styles.inputWrap} ${errors.topic ? styles.inputErr : ""}`}
                  >
                    <i className="bi bi-tag" />
                    <select
                      id="topic"
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      className={`${styles.input} ${styles.select} ${!form.topic ? styles.placeholder : ""}`}
                    >
                      <option value="" disabled>
                        Select a topic…
                      </option>
                      {topics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <i
                      className="bi bi-chevron-down"
                      style={{
                        position: "absolute",
                        right: "1rem",
                        pointerEvents: "none",
                        color: "#b8a090",
                        fontSize: "0.7rem",
                      }}
                    />
                  </div>
                  {errors.topic && (
                    <span className={styles.errMsg}>
                      <i className="bi bi-exclamation-circle" /> {errors.topic}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">
                    Your Message <span className={styles.req}>*</span>
                  </label>
                  <div
                    className={`${styles.inputWrap} ${styles.textareaWrap} ${errors.message ? styles.inputErr : ""}`}
                  >
                    <i
                      className="bi bi-chat-text"
                      style={{ alignSelf: "flex-start", marginTop: "0.85rem" }}
                    />
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe your issue or question in detail…"
                      value={form.message}
                      onChange={handleChange}
                      className={`${styles.input} ${styles.textarea}`}
                    />
                  </div>
                  <div className={styles.charCount}>
                    {form.message.length} / 1000 chars
                  </div>
                  {errors.message && (
                    <span className={styles.errMsg}>
                      <i className="bi bi-exclamation-circle" />{" "}
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} /> Sending…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send" /> Send Message
                    </>
                  )}
                </button>

                <p className={styles.formNote}>
                  <i className="bi bi-shield-lock" /> Your details are secure
                  and never shared with third parties.
                </p>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
