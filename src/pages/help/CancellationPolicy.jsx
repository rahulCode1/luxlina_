import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CancellationPolicy.module.css";
import Back from "../../components/Back";

const lastUpdated = "15 April 2025";

const sections = [
  {
    id: "overview",
    icon: "bi-info-circle",
    title: "Policy Overview",
    content: [
      {
        subtitle: "Our cancellation commitment",
        body: "At Luxlina, we understand that plans change. We offer a fair and transparent cancellation policy that balances your flexibility with the handcrafted nature of our products. Because every item is made by skilled artisans, cancellation windows are time-sensitive once production or dispatch begins.",
      },
      {
        subtitle: "Scope of this policy",
        body: "This policy applies to all orders placed on Luxlina.in — including standard product orders, custom orders, and bulk orders. Different cancellation rules apply to each order type and are described in detail below.",
      },
    ],
  },
  {
    id: "standard-orders",
    icon: "bi-bag-check",
    title: "Standard Order Cancellations",
    content: [
      {
        subtitle: "Cancellation window",
        body: "Standard orders may be cancelled within 12 hours of placement, provided the order has not yet been dispatched. After 12 hours, or once the order is marked as 'Dispatched', cancellation is no longer possible through our platform.",
      },
      {
        subtitle: "How to cancel",
        body: "To cancel a standard order, go to 'My Account > My Orders', select the order, and click 'Request Cancellation'. Alternatively, contact us immediately at support@Luxlina.in or via WhatsApp at +91 12345 67890 with your Order ID. Phone and WhatsApp cancellations are accepted Mon–Sat, 10 AM to 6 PM IST.",
      },
      {
        subtitle: "After dispatch",
        body: "Once an order is dispatched, it cannot be cancelled. If you no longer want the item, you may initiate a return within 7 days of delivery as per our Refund Policy — provided the item qualifies for return (unused, original packaging, not a custom piece).",
      },
    ],
  },
  {
    id: "custom-orders",
    icon: "bi-pencil-square",
    title: "Custom & Personalised Orders",
    content: [
      {
        subtitle: "Before production begins",
        body: "Custom orders can be cancelled without penalty within 12 hours of order confirmation, before design finalisation or production commences. During this window, any advance payment made will be fully refunded.",
      },
      {
        subtitle: "After production begins",
        body: "Once our artisans have begun work on your custom piece — which typically happens within 1–2 business days of design approval — the order cannot be cancelled. The advance payment (30–50% of the order value) is non-refundable at this stage, as it covers raw materials and artisan time already committed.",
      },
      {
        subtitle: "Design change requests",
        body: "Minor design changes (such as size adjustments within 10% or colour preferences) may be accommodated within the first 24 hours of production, subject to feasibility as assessed by our artisan team. Major design changes after production has begun are treated as a new order.",
      },
    ],
  },
  {
    id: "bulk-orders",
    icon: "bi-boxes",
    title: "Bulk Order Cancellations",
    content: [
      {
        subtitle: "Cancellation timeline",
        body: "Bulk orders (10 or more pieces) may be cancelled within 12 hours of written order confirmation with a full refund of any advance paid. After 48 hours but before dispatch, a cancellation fee of 15% of the order value is applicable to cover procurement and preparation costs.",
      },
      {
        subtitle: "After dispatch",
        body: "Bulk orders that have been fully or partially dispatched cannot be cancelled. Partial cancellations (reducing quantity after confirmation) are treated as full cancellations for the cancelled portion and are subject to the same timeline and fee structure.",
      },
      {
        subtitle: "Event or gifting orders",
        body: "For orders placed for specific events (weddings, corporate gifting, festivals), we strongly recommend placing orders well in advance. Cancellations of event orders within 7 days of the requested delivery date are treated as post-production cancellations regardless of dispatch status, and the advance payment is non-refundable.",
      },
    ],
  },
  {
    id: "prepaid-cod",
    icon: "bi-wallet2",
    title: "Prepaid vs. COD Orders",
    content: [
      {
        subtitle: "Prepaid order cancellations",
        body: "If a prepaid order is cancelled within the permitted window, the full amount is refunded to the original payment method. Refunds to UPI and wallets are typically processed within 1–3 business days. Credit/debit card refunds may take 5–7 business days depending on your bank.",
      },
      {
        subtitle: "Cash on Delivery (COD) order cancellations",
        body: "COD orders can be cancelled within 12 hours of placement at no cost. There is no financial penalty for COD cancellations within the allowed window as no payment has been made. However, repeatedly placing and cancelling COD orders may result in COD being disabled for your account.",
      },
      {
        subtitle: "Partial order cancellations",
        body: "If your order contains multiple items and you wish to cancel only specific products, contact us within the 12-hour window. Partial cancellations are processed at our discretion depending on whether the items have been packed together. The refund for cancelled items will be processed within 5–7 business days.",
      },
    ],
  },
  {
    id: "cancellation-by-us",
    icon: "bi-x-octagon",
    title: "Cancellation by Luxlina",
    content: [
      {
        subtitle: "When we may cancel your order",
        body: "We reserve the right to cancel any order due to: stock unavailability after order placement, pricing or product description errors on our website, failure of payment verification or suspected fraudulent transactions, delivery address outside our serviceable area, or force majeure events beyond our control.",
      },
      {
        subtitle: "Notification & refund",
        body: "If we cancel your order, you will be notified via email and SMS immediately. A full refund — including any shipping charges paid — will be initiated within 24 hours of cancellation and reflected in your account within 5–7 business days depending on your payment method.",
      },
      {
        subtitle: "No obligation to fulfil",
        body: "In cases of pricing errors or system-generated incorrect orders, Luxlina is under no obligation to fulfil the order at the erroneous price. We will always inform you of the correct price and give you the option to place a fresh order.",
      },
    ],
  },
  {
    id: "refund-timelines",
    icon: "bi-clock-history",
    title: "Refund Timelines",
    content: [
      {
        subtitle: "UPI & wallets",
        body: "Refunds to UPI IDs and digital wallets (Paytm, PhonePe, Google Pay, Amazon Pay) are typically processed within 1–3 business days of cancellation approval.",
      },
      {
        subtitle: "Credit & debit cards",
        body: "Card refunds are initiated within 2 business days of cancellation approval but may take an additional 5–7 business days to reflect in your statement, depending on your card issuer.",
      },
      {
        subtitle: "Net banking",
        body: "Net banking refunds are processed within 3–5 business days of cancellation approval and credited directly to your bank account.",
      },
      {
        subtitle: "Cash on Delivery",
        body: "For COD orders where a return has been accepted (post-delivery), refunds are issued as store credit or via bank transfer within 7–10 business days after the returned item is received and inspected.",
      },
    ],
  },
  {
    id: "exceptions",
    icon: "bi-exclamation-triangle",
    title: "Exceptions & Special Cases",
    content: [
      {
        subtitle: "Sale & promotional items",
        body: "Items purchased during flash sales, festive sales, or with promotional discount codes are eligible for cancellation within the standard 12-hour window. However, refunds for promotional orders are processed at the amount actually paid — not the original MRP.",
      },
      {
        subtitle: "Gift orders",
        body: "Orders marked as gifts can be cancelled by the person who placed the order within the standard window. If the gift has already been dispatched to the recipient's address, the return must be initiated at the recipient's end.",
      },
      {
        subtitle: "Subscription & repeat orders",
        body: "If you have placed a recurring or scheduled repeat order, you may cancel future deliveries at any time from 'My Account > Subscriptions'. Already-confirmed upcoming orders follow the standard 12-hour cancellation window.",
      },
    ],
  },
  {
    id: "contact",
    icon: "bi-headset",
    title: "How to Reach Us",
    content: [
      {
        subtitle: "Support channels",
        body: "For cancellation requests or queries, reach us at support@Luxlina.in (response within 4 hours on business days), via WhatsApp at +91 12345 67890, or by calling +91 12345 67890 between 10 AM and 6 PM IST, Monday to Saturday.",
      },
      {
        subtitle: "Always quote your Order ID",
        body: "To process your cancellation as quickly as possible, always include your Order ID (found in your order confirmation email or in 'My Account > My Orders') in any cancellation communication. This allows our team to locate and process your request immediately.",
      },
    ],
  },
];

const quickFacts = [
  { icon: "bi-clock", label: "Standard orders", value: "Cancel within 12 hrs" },
  { icon: "bi-pencil", label: "Custom orders", value: "Cancel within 24 hrs" },
  { icon: "bi-boxes", label: "Bulk orders", value: "Cancel within 48 hrs" },
  {
    icon: "bi-arrow-counterclockwise",
    label: "Refund (UPI/Wallet)",
    value: "1–3 business days",
  },
  {
    icon: "bi-credit-card",
    label: "Refund (Card)",
    value: "5–7 business days",
  },
  { icon: "bi-whatsapp", label: "Support hours", value: "Mon–Sat, 10 AM–6 PM" },
];

const CancellationPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const goTo = location.state?.from;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className={styles.page}>
      {goTo && <Back goTo={goTo} />}
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="bi bi-x-circle" /> Policy
          </span>
          <h1 className={styles.heroTitle}>
            Cancellation
            <br />
            Policy
          </h1>
          <p className={styles.heroSub}>
            Clear, fair, and straightforward. Here's everything you need to know
            about cancelling an order with Luxlina.
          </p>
          <div className={styles.heroMeta}>
            <span>
              <i className="bi bi-calendar3" /> Last updated:{" "}
              <strong>{lastUpdated}</strong>
            </span>
            <span className={styles.heroDot} aria-hidden="true" />
            <span>
              <i className="bi bi-geo-alt" /> Governed by{" "}
              <strong>Indian Law</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ── Quick Facts Bar ── */}
      <div className={styles.quickBar}>
        <div className={styles.quickBarInner}>
          {quickFacts.map((f) => (
            <div key={f.label} className={styles.quickFact}>
              <div className={styles.quickFactIcon}>
                <i className={`bi ${f.icon}`} />
              </div>
              <div>
                <div className={styles.quickFactLabel}>{f.label}</div>
                <div className={styles.quickFactValue}>{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar TOC ── */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Contents</p>
          <nav className={styles.toc}>
            {sections.map((s, idx) => (
              <button
                key={s.id}
                className={`${styles.tocBtn} ${activeSection === s.id ? styles.tocActive : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className={styles.tocNum}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <i className={`bi ${s.icon}`} />
                <span className={styles.tocLabel}>{s.title}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarLinks}>
            <p className={styles.sidebarLabel}>Related Policies</p>
            <Link to="/returns" className={styles.sidebarLink}>
              <i className="bi bi-arrow-counterclockwise" /> Refund Policy
            </Link>
            <Link to="/shipping-policy" className={styles.sidebarLink}>
              <i className="bi bi-truck" /> Shipping Policy
            </Link>
            <Link to="/terms" className={styles.sidebarLink}>
              <i className="bi bi-file-earmark-text" /> Terms & Conditions
            </Link>
            <Link to="/faqs" className={styles.sidebarLink}>
              <i className="bi bi-chat-square-dots" /> FAQs
            </Link>
          </div>

          {/* Contact card */}
          <div className={styles.sidebarContact}>
            <p className={styles.sidebarContactTitle}>Need to cancel now?</p>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              <i className="bi bi-whatsapp" /> WhatsApp Us
            </a>
            <a
              href="mailto:support@Luxlina.in"
              className={styles.emailLink}
            >
              <i className="bi bi-envelope" /> support@Luxlina.in
            </a>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className={styles.main}>
          {/* Alert banner */}
          <div className={styles.alertBanner}>
            <i className="bi bi-lightning-charge-fill" />
            <p>
              <strong>Act fast:</strong> Most orders are dispatched within 12–24
              hours of placement. Contact us immediately if you need to cancel —
              the sooner you reach out, the better.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section, sIdx) => (
            <div
              key={section.id}
              id={section.id}
              className={styles.policySection}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>
                  {String(sIdx + 1).padStart(2, "0")}
                </span>
                <div className={styles.sectionIcon}>
                  <i className={`bi ${section.icon}`} />
                </div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>

              <div className={styles.sectionBody}>
                {section.content.map((block, bIdx) => (
                  <div key={bIdx} className={styles.block}>
                    <h3 className={styles.blockTitle}>
                      <span className={styles.blockDot} aria-hidden="true" />
                      {block.subtitle}
                    </h3>
                    <p className={styles.blockBody}>{block.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer strip */}
          <div className={styles.footerStrip}>
            <div className={styles.footerStripIcon}>
              <i className="bi bi-headset" />
            </div>
            <div className={styles.footerStripText}>
              <h3>Need help with a cancellation?</h3>
              <p>
                Our team is available Mon–Sat, 10 AM to 6 PM IST to assist you
                immediately.
              </p>
            </div>
            <div className={styles.footerStripActions}>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                className={styles.contactBtn}
              >
                <i className="bi bi-whatsapp" /> WhatsApp Us
              </a>
              <a
                href="mailto:support@Luxlina.in"
                className={styles.contactOutline}
              >
                <i className="bi bi-envelope" /> Email Support
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CancellationPolicy;
