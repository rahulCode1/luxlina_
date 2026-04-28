import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./FAQs.module.css";
import Back from "../../components/Back";

const categories = [
  { id: "all", label: "All Questions", icon: "bi-grid-3x3-gap" },
  { id: "orders", label: "Orders", icon: "bi-bag-check" },
  { id: "shipping", label: "Shipping", icon: "bi-truck" },
  {
    id: "returns",
    label: "Returns & Refunds",
    icon: "bi-arrow-counterclockwise",
  },
  { id: "products", label: "Products", icon: "bi-gem" },
  { id: "payments", label: "Payments", icon: "bi-wallet2" },
  { id: "account", label: "My Account", icon: "bi-person-circle" },
];

const faqs = [
  // Orders
  {
    cat: "orders",
    q: "How do I place an order?",
    a: "Browse our collection, select your item, choose quantity, and click 'Add to Cart'. When you're ready, head to the cart and proceed to checkout. You'll need an account to complete the order.",
  },
  {
    cat: "orders",
    q: "Can I modify or cancel my order after placing it?",
    a: "Orders can be modified or cancelled within 12 hours of placement, before they are dispatched. After dispatch, cancellation is not possible. Contact us immediately at support@itshandicrafted.in with your Order ID.",
  },
  {
    cat: "orders",
    q: "Will I receive an order confirmation?",
    a: "Yes. You'll receive an email and SMS confirmation immediately after placing your order, followed by a dispatch notification with your tracking link once the order ships.",
  },
  {
    cat: "orders",
    q: "Can I place a bulk or custom order?",
    a: "Absolutely! We welcome bulk orders for events, gifting, and interior design projects. Contact us at support@itshandicrafted.in for a custom quote, timelines, and packaging options.",
  },
  {
    cat: "orders",
    q: "How do I track my order?",
    a: "Once your order is dispatched, you'll receive a tracking link via email and SMS. You can also track it from the 'My Orders' section in your account dashboard.",
  },

  // Shipping
  {
    cat: "shipping",
    q: "Where do you ship?",
    a: "We currently deliver across all of India — 27,000+ pin codes. International shipping is planned for late 2025. Sign up for our newsletter to be notified.",
  },
  {
    cat: "shipping",
    q: "How long does delivery take?",
    a: "Standard delivery takes 5–8 business days. Express delivery (metro cities) takes 2–3 business days at ₹99 extra. Timelines exclude Sundays and public holidays.",
  },
  {
    cat: "shipping",
    q: "Is shipping free?",
    a: "Yes! Standard shipping is free on all orders above ₹999. A flat ₹49 applies to orders below that threshold.",
  },
  {
    cat: "shipping",
    q: "How are stone items packed for shipping?",
    a: "Each piece is individually bubble-wrapped, cushioned with foam inserts, and placed in a reinforced double-walled corrugated box. Fragile stickers are applied on all sides. Every shipment is insured against transit damage.",
  },
  {
    cat: "shipping",
    q: "What if no one is home during delivery?",
    a: "The courier will attempt delivery up to 3 times. After that, the parcel is held at the nearest hub for 7 days before being returned to us. We'll reach out to reschedule.",
  },

  // Returns
  {
    cat: "returns",
    q: "What is your return policy?",
    a: "We accept returns within 7 days of delivery for damaged, defective, or incorrectly delivered items. Items must be unused and in original packaging. Visit our Returns page to raise a request.",
  },
  {
    cat: "returns",
    q: "How long does a refund take?",
    a: "Refunds are processed within 5–7 business days after we receive and inspect the returned item. UPI and wallet refunds are faster (1–3 days), while card and COD refunds may take up to 7–10 days.",
  },
  {
    cat: "returns",
    q: "Can I exchange an item instead of returning it?",
    a: "Yes! If the item is in stock, we offer a direct exchange. Select 'Exchange' when raising your request on the Returns page, and we'll ship the replacement once the original is received.",
  },
  {
    cat: "returns",
    q: "What if my item arrives broken?",
    a: "We're so sorry. Please photograph the damage and contact us within 48 hours of delivery at support@itshandicrafted.in. We'll arrange a free return pickup and process a full refund or replacement immediately.",
  },

  // Products
  {
    cat: "products",
    q: "What type of stone is used in your products?",
    a: "We primarily use Makrana marble, Agaria sandstone, and soapstone — all sourced ethically from Rajasthan. Each material page lists the specific stone used.",
  },
  {
    cat: "products",
    q: "Are the products handmade?",
    a: "Yes, every single piece is hand-carved by master artisans in Jaipur. Natural stone has inherent variations in colour and grain, which means no two pieces are exactly identical — that's part of their beauty.",
  },
  {
    cat: "products",
    q: "How do I care for stone handicraft items?",
    a: "Wipe with a soft damp cloth. Avoid abrasive cleaners, acidic liquids, and prolonged direct sunlight. For marble and soapstone, occasional application of mineral oil keeps the surface rich and protected.",
  },
  {
    cat: "products",
    q: "Are the product dimensions accurate?",
    a: "All dimensions listed (length, width, height, weight) are measured manually. Due to the handcrafted nature, expect a variation of ±2–5%. Product pages include both cm and inch measurements.",
  },
  {
    cat: "products",
    q: "Can I request a custom size or design?",
    a: "Yes, custom orders are available for select products. Reach out with your requirements and our artisan team will assess feasibility, timeline, and pricing within 2–3 working days.",
  },

  // Payments
  {
    cat: "payments",
    q: "What payment methods do you accept?",
    a: "We accept UPI, credit/debit cards (Visa, Mastercard, RuPay), net banking, wallets, EMI, and Cash on Delivery (COD) for orders up to ₹5,000.",
  },
  {
    cat: "payments",
    q: "Is it safe to pay on your website?",
    a: "Absolutely. Our checkout is SSL-secured and payments are processed through RazorPay — a PCI-DSS compliant gateway. We never store your card details.",
  },
  {
    cat: "payments",
    q: "Is Cash on Delivery available?",
    a: "COD is available on orders up to ₹5,000. A ₹30 handling fee applies and it is available with standard delivery only.",
  },
  {
    cat: "payments",
    q: "Can I pay in installments (EMI)?",
    a: "Yes, EMI options are available on credit cards from major banks (HDFC, ICICI, SBI, Axis) for orders above ₹3,000. The available EMI plans are shown at checkout.",
  },
  {
    cat: "payments",
    q: "I was charged but didn't receive an order confirmation. What do I do?",
    a: "Sometimes payment confirmation takes a few minutes. If you haven't received a confirmation within 30 minutes, contact us with your payment reference number and we'll resolve it immediately.",
  },

  // Account
  {
    cat: "account",
    q: "Do I need an account to order?",
    a: "Yes, an account is required to place orders. It lets you track orders, manage your wishlist, save addresses, and view your order history easily.",
  },
  {
    cat: "account",
    q: "How do I reset my password?",
    a: "Click 'Forgot Password' on the login page and enter your registered email. You'll receive a reset link within a few minutes. Check your spam folder if it doesn't arrive.",
  },
  {
    cat: "account",
    q: "Can I save multiple delivery addresses?",
    a: "Yes. Go to 'My Address' in your account dashboard to add, edit, or delete saved addresses. You can select any saved address at checkout.",
  },
  {
    cat: "account",
    q: "How do I delete my account?",
    a: "To request account deletion, email us at support@itshandicrafted.in from your registered email address. We'll process the deletion within 7 working days as per our data retention policy.",
  },
];

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const goTo = location.state?.from;
  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.cat === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCatChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <div className={styles.page}>
      {goTo && <Back goTo={goTo} />}
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="bi bi-chat-square-dots" /> Help Centre
          </span>
          <h1 className={styles.heroTitle}>
            Frequently Asked
            <br />
            Questions
          </h1>
          <p className={styles.heroSub}>
            Everything you need to know about orders, shipping, returns, and our
            handcrafted stone pieces.
          </p>

          {/* Search */}
          <div className={styles.searchWrap}>
            <i className="bi bi-search" />
            <input
              type="text"
              placeholder="Search your question…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenIndex(null);
              }}
              className={styles.searchInput}
            />
            {search && (
              <button
                className={styles.searchClear}
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x" />
              </button>
            )}
          </div>

          <p className={styles.heroCount}>
            {filtered.length} {filtered.length === 1 ? "question" : "questions"}{" "}
            found
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar Categories ── */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Browse by Topic</p>
          <nav className={styles.catNav}>
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? faqs.length
                  : faqs.filter((f) => f.cat === cat.id).length;
              return (
                <button
                  key={cat.id}
                  className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catActive : ""}`}
                  onClick={() => handleCatChange(cat.id)}
                >
                  <i className={`bi ${cat.icon}`} />
                  <span className={styles.catLabel}>{cat.label}</span>
                  <span className={styles.catCount}>{count}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick links */}
          <div className={styles.sidebarLinks}>
            <p className={styles.sidebarLabel}>Still need help?</p>
            <Link to="/returns" className={styles.sidebarLink}>
              <i className="bi bi-arrow-counterclockwise" /> Returns & Refunds
            </Link>
            <Link to="/shipping-policy" className={styles.sidebarLink}>
              <i className="bi bi-truck" /> Shipping Policy
            </Link>
            <a
              href="mailto:support@itshandicrafted.in"
              className={styles.sidebarLink}
            >
              <i className="bi bi-envelope" /> Email Support
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className={styles.sidebarLink}
            >
              <i className="bi bi-whatsapp" /> WhatsApp Chat
            </a>
          </div>
        </aside>

        {/* ── FAQ List ── */}
        <main className={styles.main}>
          {/* Mobile category chips */}
          <div className={styles.mobileChips}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.chip} ${activeCategory === cat.id ? styles.chipActive : ""}`}
                onClick={() => handleCatChange(cat.id)}
              >
                <i className={`bi ${cat.icon}`} />
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <i className="bi bi-search" />
              <h3>No results found</h3>
              <p>Try a different search term or browse by category.</p>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Group by category when showing all */}
              {activeCategory === "all" && search === "" ? (
                categories.slice(1).map((cat) => {
                  const catFaqs = faqs.filter((f) => f.cat === cat.id);
                  const globalStartIndex = faqs.indexOf(catFaqs[0]);
                  return (
                    <div key={cat.id} className={styles.catGroup}>
                      <div className={styles.groupHeader}>
                        <i className={`bi ${cat.icon}`} />
                        <h2 className={styles.groupTitle}>{cat.label}</h2>
                        <span className={styles.groupCount}>
                          {catFaqs.length}
                        </span>
                      </div>
                      {catFaqs.map((faq, localIdx) => {
                        const globalIdx = globalStartIndex + localIdx;
                        return (
                          <FaqItem
                            key={globalIdx}
                            faq={faq}
                            idx={globalIdx}
                            openIndex={openIndex}
                            setOpenIndex={setOpenIndex}
                            search={search}
                          />
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div className={styles.catGroup}>
                  {filtered.map((faq, i) => (
                    <FaqItem
                      key={i}
                      faq={faq}
                      idx={i}
                      openIndex={openIndex}
                      setOpenIndex={setOpenIndex}
                      search={search}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Contact strip */}
          <div className={styles.contactStrip}>
            <div className={styles.contactStripIcon}>
              <i className="bi bi-headset" />
            </div>
            <div className={styles.contactStripText}>
              <h3>Didn't find your answer?</h3>
              <p>
                Our support team is available Monday–Saturday, 10 AM to 6 PM IST
              </p>
            </div>
            <div className={styles.contactStripActions}>
              <a
                href="mailto:support@itshandicrafted.in"
                className={styles.contactBtn}
              >
                <i className="bi bi-envelope" /> Email Us
              </a>
              <a href="tel:+911234567890" className={styles.contactOutline}>
                <i className="bi bi-telephone" /> Call Us
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ── Individual FAQ Item ── */
const FaqItem = ({ faq, idx, openIndex, setOpenIndex, search }) => {
  const isOpen = openIndex === idx;

  const highlight = (text) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={i} className={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}>
      <button
        className={styles.faqQ}
        onClick={() => setOpenIndex(isOpen ? null : idx)}
        aria-expanded={isOpen}
      >
        <span className={styles.faqQText}>{highlight(faq.q)}</span>
        <span className={styles.faqToggle}>
          <i className={`bi ${isOpen ? "bi-dash" : "bi-plus"}`} />
        </span>
      </button>
      {isOpen && (
        <div className={styles.faqA}>
          <p>{highlight(faq.a)}</p>
        </div>
      )}
    </div>
  );
};

export default FAQs;
