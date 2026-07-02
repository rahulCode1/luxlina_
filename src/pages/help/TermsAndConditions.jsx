import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./TermsAndConditions.module.css";
import Back from "../../components/Back";

const lastUpdated = "15 April 2025";
const effectiveDate = "01 January 2024";

const sections = [
  {
    id: "acceptance",
    icon: "bi-check2-circle",
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to these terms",
        body: "By accessing or using the Luxlina website (Luxlina.in), placing an order, or creating an account, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please refrain from using our services.",
      },
      {
        subtitle: "Eligibility",
        body: "You must be at least 18 years of age and legally capable of entering into a binding contract under the Indian Contract Act, 1872 to use our services. By using our website, you represent and warrant that you meet these requirements.",
      },
      {
        subtitle: "Modifications",
        body: "Luxlina reserves the right to update or modify these Terms at any time. Material changes will be communicated via email and a prominent notice on our website at least 14 days before they take effect. Continued use of our services after the effective date constitutes acceptance.",
      },
    ],
  },
  {
    id: "account",
    icon: "bi-person-circle",
    title: "User Accounts",
    content: [
      {
        subtitle: "Account registration",
        body: "To place an order, you must create an account using a valid phone number. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately at rahulkumawat50665@gmail.com if you suspect any unauthorised access.",
      },
      {
        subtitle: "Accurate information",
        body: "You agree to provide accurate, current, and complete information during registration and to keep your account details updated. Providing false or misleading information may result in immediate account suspension without notice.",
      },
      {
        subtitle: "Account termination",
        body: "We reserve the right to suspend or terminate any account that violates these Terms, engages in fraudulent activity, abuses our return or promotional policies, or is inactive for more than 24 consecutive months. You may also close your account at any time by contacting us.",
      },
    ],
  },
  {
    id: "products-orders",
    icon: "bi-bag-check",
    title: "Products & Orders",
    content: [
      {
        subtitle: "Product descriptions",
        body: "We strive to describe and represent all products accurately. Because every item is hand-carved from natural stone, there will be inherent variations in colour, grain, and dimensions (±2–5% from listed measurements). These are not defects — they are characteristic of genuine handmade stone craft.",
      },
      {
        subtitle: "Order acceptance",
        body: "Placing an order constitutes an offer to purchase. Your order is accepted and a binding contract formed only when we send you an order confirmation email. We reserve the right to refuse or cancel any order — for example, due to pricing errors, stock unavailability, or suspected fraud — and will provide a full refund in such cases.",
      },
      {
        subtitle: "Pricing & availability",
        body: "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices may change without notice, but the price at the time your order is confirmed is the price you will be charged. We do not guarantee continuous stock availability of any product.",
      },
      {
        subtitle: "Custom & bulk orders",
        body: "Custom orders are governed by a separate written agreement specifying design, timeline, and payment terms. A non-refundable advance of 30–50% is required before production begins. Cancellation of a confirmed custom order forfeits the advance payment.",
      },
    ],
  },
  {
    id: "payment",
    icon: "bi-wallet2",
    title: "Payment Terms",
    content: [
      {
        subtitle: "Accepted payment methods",
        body: "We accept UPI, credit and debit cards (Visa, Mastercard, RuPay), net banking, popular wallets, EMI on select cards, and Cash on Delivery (COD) for orders up to ₹5,000. All online payments are processed through RazorPay, a PCI-DSS Level 1 compliant gateway.",
      },
      {
        subtitle: "Payment security",
        body: "Luxlina does not store your card details on our servers at any point. All transactions are encrypted via TLS. In the event of a failed payment where your bank account is debited, the amount is typically reversed within 5–7 business days. Contact us with your payment reference if the reversal does not occur.",
      },
      {
        subtitle: "Cash on Delivery",
        body: "COD is available on orders up to ₹5,000 with standard delivery only. A handling fee of ₹60 applies. Repeated refusal to accept COD deliveries may result in COD being disabled for your account.",
      },
      {
        subtitle: "Invoice & GST",
        body: "A digital GST invoice is generated for every order and sent to your registered email. If you require a business invoice with your GST number, update your GST details in 'My Account' before placing the order. Retrospective GST edits are not possible after 48 hours of order placement.",
      },
    ],
  },
  {
    id: "shipping-delivery",
    icon: "bi-truck",
    title: "Shipping & Delivery",
    content: [
      {
        subtitle: "Delivery timelines",
        body: "Standard delivery takes 5–8 business days across India (27,000+ pin codes). Express delivery (2–3 business days) is available in select metro cities at ₹99 extra. Timelines are estimates and may be affected by public holidays, natural events, or courier disruptions beyond our control.",
      },
      {
        subtitle: "Shipping charges",
        body: "Standard shipping is free on orders above ₹999. A flat ₹60 shipping fee applies to orders below this threshold. Free shipping thresholds may change during promotional periods.",
      },
      {
        subtitle: "Packaging & transit risk",
        body: "All items are individually bubble-wrapped, cushioned with foam inserts, and packed in reinforced double-walled corrugated boxes. Every shipment is insured against transit damage. Risk of loss passes to you upon delivery to your specified address.",
      },
      {
        subtitle: "Failed delivery",
        body: "If delivery fails after three attempts, the parcel is held at the nearest courier hub for 7 days before being returned to us. Re-delivery charges apply for orders returned due to incorrect addresses or repeated failed delivery attempts by the recipient.",
      },
    ],
  },
  {
    id: "returns-refunds",
    icon: "bi-arrow-counterclockwise",
    title: "Returns & Refunds",
    content: [
      {
        subtitle: "Return eligibility",
        body: "Returns are accepted within 24 hours of delivery for items that are damaged, defective, or incorrectly delivered. Items must be unused, in their original packaging, with all tags intact. Natural colour and grain variations in stone do not constitute defects and are not grounds for return.",
      },
      {
        subtitle: "Non-returnable items",
        body: "Custom-made and personalised items are non-returnable unless they arrive damaged or defective. Items that have been used, cleaned, or altered in any way are not eligible for return.",
      },
      {
        subtitle: "Refund process",
        body: "Once the returned item is received and inspected, refunds are processed within 5–7 business days. UPI and wallet refunds clear in 1–3 days; card and COD refunds may take up to 7–10 business days depending on your bank. Shipping charges are non-refundable unless the return is due to our error.",
      },
      {
        subtitle: "Transit damage",
        body: "If your item arrives damaged, photograph the damage and contact us within 12 hours of delivery at rahulkumawat50665@gmail.com. We will arrange a free return pickup and process a full replacement  at no cost to you.",
      },
    ],
  },
  {
    id: "intellectual-property",
    icon: "bi-shield-check",
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Our content",
        body: "All content on Luxlina.in — including product photographs, videos, descriptions, logo, brand name, and website design — is the exclusive intellectual property of Luxlina or its licensors and is protected under Indian copyright and trademark law.",
      },
      {
        subtitle: "Restrictions",
        body: "You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from our website without our prior written consent. Limited personal, non-commercial use is permitted provided that all copyright notices remain intact.",
      },
      {
        subtitle: "User content",
        body: "By submitting reviews, photographs, or other content on our platform, you grant Luxlina a non-exclusive, royalty-free, worldwide licence to use, display, and reproduce that content for marketing and operational purposes. You retain ownership of your content.",
      },
    ],
  },
  {
    id: "prohibited-conduct",
    icon: "bi-slash-circle",
    title: "Prohibited Conduct",
    content: [
      {
        subtitle: "You agree not to",
        body: "Use our website for any unlawful purpose; submit false or misleading information; impersonate any person or entity; attempt to gain unauthorised access to any part of our systems; use automated tools (bots, scrapers) to extract data; post harmful, defamatory, or obscene content; abuse our return or promotional policies; or engage in any conduct that disrupts the experience of other users.",
      },
      {
        subtitle: "Consequences of violation",
        body: "Violation of these prohibitions may result in immediate account suspension, cancellation of pending orders, and — where applicable — legal action. Luxlina reserves the right to report fraudulent or illegal activity to the appropriate authorities.",
      },
    ],
  },
  {
    id: "liability",
    icon: "bi-exclamation-triangle",
    title: "Limitation of Liability",
    content: [
      {
        subtitle: "Disclaimer of warranties",
        body: "Our website and services are provided on an 'as is' and 'as available' basis. While we strive for accuracy and availability, we make no warranty — express or implied — regarding uninterrupted access, error-free operation, or the fitness of products for a particular purpose beyond what is expressly stated in our product descriptions.",
      },
      {
        subtitle: "Limitation of damages",
        body: "To the fullest extent permitted by applicable Indian law, Luxlina's total liability to you for any claim arising from use of our services shall not exceed the amount paid by you for the specific order giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.",
      },
      {
        subtitle: "Force majeure",
        body: "We are not liable for delays or failures in performance resulting from circumstances beyond our reasonable control, including natural disasters, government actions, strikes, supply chain disruptions, or internet outages.",
      },
    ],
  },
  {
    id: "governing-law",
    icon: "bi-bank",
    title: "Governing Law & Disputes",
    content: [
      {
        subtitle: "Applicable law",
        body: "These Terms & Conditions are governed by and construed in accordance with the laws of India, including the Consumer Protection Act 2019, the Information Technology Act 2000, and the Indian Contract Act 1872. Any dispute shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.",
      },
      {
        subtitle: "Dispute resolution",
        body: "We encourage you to first contact our support team at rahulkumawat50665@gmail.com to resolve any dispute amicably. If a resolution cannot be reached within 30 days, the matter may be referred to arbitration under the Arbitration and Conciliation Act 1996, with a sole arbitrator appointed by mutual agreement.",
      },
      {
        subtitle: "Consumer grievances",
        body: "As required under the Consumer Protection (E-Commerce) Rules 2020, our Grievance Officer can be reached at grievance@Luxlina.in or by post at Luxlina, 12 Shilpgram Road, Near Jawahar Circle, Jaipur, Rajasthan – 302 017. We will acknowledge grievances within 48 hours and resolve them within 30 days.",
      },
    ],
  },
  {
    id: "general",
    icon: "bi-list-check",
    title: "General Provisions",
    content: [
      {
        subtitle: "Entire agreement",
        body: "These Terms, together with our Privacy Policy, Shipping Policy, and Refund Policy, constitute the entire agreement between you and Luxlina with respect to the use of our services and supersede all prior agreements and understandings.",
      },
      {
        subtitle: "Severability",
        body: "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
      },
      {
        subtitle: "No waiver",
        body: "Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision in the future.",
      },
      {
        subtitle: "Contact",
        body: "For any questions about these Terms & Conditions, contact us at legal@Luxlina.in or by post at Ward no.3, Chomu Purohithan, Pin code: 332602, Sikar, Rajasthan, India.",
      },
    ],
  },
];

const TermsAndConditions = () => {
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
            <i className="bi bi-file-earmark-text" /> Legal
          </span>
          <h1 className={styles.heroTitle}>
            Terms &amp;
            <br />
            Conditions
          </h1>
          <p className={styles.heroSub}>
            Please read these terms carefully before using our website or
            placing an order. They form a binding agreement between you and
            Luxlina.
          </p>
          <div className={styles.heroMetaRow}>
            <div className={styles.heroMetaItem}>
              <i className="bi bi-calendar3" />
              <span>
                Effective: <strong>{effectiveDate}</strong>
              </span>
            </div>
            <span className={styles.heroDot} aria-hidden="true" />
            <div className={styles.heroMetaItem}>
              <i className="bi bi-pencil-square" />
              <span>
                Updated: <strong>{lastUpdated}</strong>
              </span>
            </div>
            <span className={styles.heroDot} aria-hidden="true" />
            <div className={styles.heroMetaItem}>
              <i className="bi bi-geo-alt" />
              <span>
                Governed by <strong>Indian Law</strong>
              </span>
            </div>
          </div>
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
            <Link to="/privacy-policy" className={styles.sidebarLink}>
              <i className="bi bi-shield-lock" /> Privacy Policy
            </Link>
            <Link to="/returns" className={styles.sidebarLink}>
              <i className="bi bi-arrow-counterclockwise" /> Refund Policy
            </Link>
            <Link to="/shipping-policy" className={styles.sidebarLink}>
              <i className="bi bi-truck" /> Shipping Policy
            </Link>
            <a
              href="mailto:legal@Luxlina.in"
              className={styles.sidebarLink}
            >
              <i className="bi bi-envelope" /> Legal Queries
            </a>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className={styles.main}>
          {/* Acceptance banner */}
          <div className={styles.acceptBanner}>
            <div className={styles.acceptIcon}>
              <i className="bi bi-info-circle" />
            </div>
            <p className={styles.acceptText}>
              By browsing our website or placing an order, you automatically
              agree to these Terms & Conditions in full. If you disagree with
              any part, please discontinue use of our services.
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
              <i className="bi bi-patch-check" />
            </div>
            <div className={styles.footerStripText}>
              <h3>Questions about these terms?</h3>
              <p>
                Our legal team responds to all queries within 5 business days.
              </p>
            </div>
            <div className={styles.footerStripActions}>
              <a
                href="mailto:rahulkumawat50665@gmail.com"
                className={styles.contactBtn}
              >
                <i className="bi bi-envelope" /> Email Legal Team
              </a>
              <Link to="/contact" className={styles.contactOutline}>
                <i className="bi bi-headset" /> Contact Support
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
