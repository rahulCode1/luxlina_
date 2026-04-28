import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./PrivacyPolicy.module.css";
import Back from "../../components/Back";

const lastUpdated = "15 April 2025";

const sections = [
  {
    id: "information-we-collect",
    icon: "bi-database",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information you provide directly",
        body: "When you create an account, place an order, or contact our support team, we collect your full name, phone number, delivery address, and payment details. For custom or bulk orders, we may also collect additional details about your requirements.",
      },

      {
        subtitle: "Information from third parties",
        body: "We may receive information about you from payment processors (such as RazorPay), shipping partners, and analytics providers. We only receive the minimum information necessary to complete a transaction or improve our service.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: "bi-gear",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Order fulfilment & delivery",
        body: "Your name, address, and contact details are used to process and deliver your order. We share the minimum necessary information with our logistics partners (such as courier services) solely for this purpose.",
      },
      {
        subtitle: "Account management",
        body: "Your name and phone number are used to maintain your account, allow you to track orders, manage your wishlist, and save delivery addresses. We never store your payment card details on our servers.",
      },
      {
        subtitle: "Communication",
        body: "We send order confirmations, dispatch notifications, and delivery updates via phone number and SMS. With your consent, we may also send promotional offers, new product announcements, and seasonal newsletters. You can unsubscribe at any time.",
      },
      {
        subtitle: "Service improvement",
        body: "Aggregated and anonymised usage data helps us understand which features are most useful, fix bugs, and improve the overall experience. This data cannot be used to identify you personally.",
      },
    ],
  },
  {
    id: "data-sharing",
    icon: "bi-share",
    title: "Data Sharing & Disclosure",
    content: [
      {
        subtitle: "We do not sell your data",
        body: "itsHandicrafted does not sell, rent, or trade your personal information to any third party for marketing or commercial purposes. Your data belongs to you.",
      },
      {
        subtitle: "Service providers",
        body: "We share data with trusted third-party providers who help us operate our business — including payment gateways (RazorPay), courier services (Delhivery, BlueDart), email platforms, and cloud hosting. All providers are bound by strict data processing agreements.",
      },
      {
        subtitle: "Legal requirements",
        body: "We may disclose your information if required by law, court order, or government authority — for example, for fraud prevention, tax compliance, or consumer protection obligations under Indian law.",
      },
    ],
  },
  {
    id: "cookies",
    icon: "bi-cookie",
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "What cookies we use",
        body: "We use essential cookies to keep you logged in and maintain your cart. We also use analytics cookies (Google Analytics) to understand traffic patterns, and preference cookies to remember your settings. We do not use advertising or retargeting cookies.",
      },
      {
        subtitle: "Managing cookies",
        body: "You can control cookies through your browser settings. Disabling essential cookies may prevent certain features — such as staying logged in or completing checkout — from functioning correctly. Analytics cookies can be disabled without affecting core functionality.",
      },
    ],
  },
  {
    id: "data-security",
    icon: "bi-shield-lock",
    title: "Data Security",
    content: [
      {
        subtitle: "How we protect your data",
        body: "All data transmitted between your browser and our servers is encrypted using TLS (HTTPS). Payment processing is handled exclusively by RazorPay, a PCI-DSS Level 1 certified gateway. We never store credit or debit card numbers on our servers.",
      },
      {
        subtitle: "Data retention",
        body: "We retain your account and order data for as long as your account is active and for up to 7 years thereafter to comply with Indian tax and accounting regulations. You may request deletion of your account at any time; residual data required for legal compliance will be retained in encrypted form only.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: "bi-person-check",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & portability",
        body: "You have the right to request a copy of all personal data we hold about you. We will provide this in a machine-readable format (JSON or CSV) within 30 days of a verified request.",
      },
      {
        subtitle: "Correction & deletion",
        body: "You can update most of your personal information directly in 'My Account'. To request complete deletion of your data, email us at privacy@itshandicrafted.in from your registered email address.",
      },
      {
        subtitle: "Opt-out of marketing",
        body: "Every marketing email includes an unsubscribe link. You can also manage your communication preferences in 'My Account > Notifications'. Transactional emails (order confirmations, dispatch notices) cannot be disabled as they are essential to your order.",
      },
      {
        subtitle: "Grievance redressal",
        body: "In accordance with the Information Technology Act, 2000 and the IT (Amendment) Act, 2008, any grievance regarding processing of your personal data can be directed to our Grievance Officer at privacy@itshandicrafted.in. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "third-party-links",
    icon: "bi-box-arrow-up-right",
    title: "Third-Party Links",
    content: [
      {
        subtitle: "External websites",
        body: "Our website may contain links to third-party sites such as social media platforms, payment gateways, or courier tracking portals. Once you leave our site, this Privacy Policy no longer applies. We encourage you to review the privacy policies of any external sites you visit.",
      },
    ],
  },
  {
    id: "children",
    icon: "bi-people",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age restriction",
        body: "Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately and we will delete it promptly.",
      },
    ],
  },
  {
    id: "changes",
    icon: "bi-arrow-repeat",
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "How we notify you",
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify you via email and display a prominent notice on our website at least 14 days before the changes take effect.",
      },
      {
        subtitle: "Continued use",
        body: "Your continued use of our website and services after the effective date of any changes constitutes your acceptance of the updated policy. If you disagree with any changes, you may close your account by contacting us at privacy@itshandicrafted.in.",
      },
    ],
  },
  {
    id: "contact",
    icon: "bi-envelope",
    title: "Contact & Grievance Officer",
    content: [
      {
        subtitle: "Privacy queries",
        body: "For any questions, requests, or concerns about this Privacy Policy or the handling of your personal data, please contact our Privacy Team at privacy@itshandicrafted.in. For general support queries, reach us at rahulkumawat50665@gmail.com or via WhatsApp at +916377408633.",
      },
      {
        subtitle: "Postal address",
        body: "Ward no. 3, Chomu Purohitan, Pin code: 332602, Dist. Sikar, Rajasthan, India. We aim to respond to all privacy-related requests within 30 days.",
      },
    ],
  },
];

const PrivacyPolicy = () => {
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
            <i className="bi bi-shield-lock" /> Legal
          </span>
          <h1 className={styles.heroTitle}>
            Privacy
            <br />
            Policy
          </h1>
          <p className={styles.heroSub}>
            We believe transparency is the foundation of trust. This policy
            explains exactly what data we collect, how we use it, and the rights
            you hold over it.
          </p>
          <div className={styles.heroMeta}>
            <span>
              <i className="bi bi-calendar3" /> Last updated: {lastUpdated}
            </span>
            <span className={styles.heroDot} aria-hidden="true" />
            <span>
              <i className="bi bi-geo-alt" /> Governed by Indian law
            </span>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar TOC ── */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Contents</p>
          <nav className={styles.toc}>
            {sections.map((s) => (
              <button
                key={s.id}
                className={`${styles.tocBtn} ${activeSection === s.id ? styles.tocActive : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                <i className={`bi ${s.icon}`} />
                <span className={styles.tocLabel}>{s.title}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarLinks}>
            <p className={styles.sidebarLabel}>Related Policies</p>
            <Link to="/terms" className={styles.sidebarLink}>
              <i className="bi bi-file-text" /> Terms of Service
            </Link>
            <Link to="/returns" className={styles.sidebarLink}>
              <i className="bi bi-arrow-counterclockwise" /> Refund Policy
            </Link>
            <Link to="/shipping-policy" className={styles.sidebarLink}>
              <i className="bi bi-truck" /> Shipping Policy
            </Link>
            <a
              href="mailto:privacy@itshandicrafted.in"
              className={styles.sidebarLink}
            >
              <i className="bi bi-envelope" /> Privacy Queries
            </a>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className={styles.main}>
          {/* Intro card */}
          <div className={styles.introCard}>
            <div className={styles.introIcon}>
              <i className="bi bi-shield-check" />
            </div>
            <div className={styles.introText}>
              <h2 className={styles.introTitle}>Your Privacy Matters</h2>
              <p className={styles.introBody}>
                itsHandicrafted is committed to protecting your personal
                information. We collect only what is necessary, store it
                securely, and never sell it to third parties. This policy
                applies to all users of our website and mobile application.
              </p>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, sIdx) => (
            <div
              key={section.id}
              id={section.id}
              className={styles.policySection}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNum}>
                  {String(sIdx + 1).padStart(2, "0")}
                </div>
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
              <i className="bi bi-envelope-heart" />
            </div>
            <div className={styles.footerStripText}>
              <h3>Questions about your privacy?</h3>
              <p>
                Our Privacy Team responds to all requests within 30 days as
                required by Indian law.
              </p>
            </div>
            <div className={styles.footerStripActions}>
              <a
                href="mailto:rahulkumawat50665@gmail.com"
                className={styles.contactBtn}
              >
                <i className="bi bi-envelope" /> Email Privacy Team
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

export default PrivacyPolicy;
