import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ShippingPolicy.module.css";
import Back from "../../components/Back";

const shippingPlans = [
  {
    icon: "bi-bag-check",
    name: "Standard Delivery",
    price: "Free",
    priceNote: "on orders above ₹999",
    priceSub: "₹49 below ₹999",
    days: "5–8 Business Days",
    coverage: "Pan India",
    highlight: false,
  },
  {
    icon: "bi-lightning-charge",
    name: "Express Delivery",
    price: "₹99",
    priceNote: "flat rate",
    priceSub: "All order sizes",
    days: "2–3 Business Days",
    coverage: "Metro Cities",
    highlight: true,
  },
  {
    icon: "bi-gem",
    name: "Scheduled Delivery",
    price: "₹149",
    priceNote: "flat rate",
    priceSub: "Choose your slot",
    days: "Pick a date",
    coverage: "Select Cities",
    highlight: false,
  },
];

const timeline = [
  {
    icon: "bi-bag-heart",
    title: "Order Confirmed",
    time: "Immediately",
    desc: "You receive an email and SMS confirmation with your order details and summary.",
  },
  {
    icon: "bi-person-workspace",
    title: "Artisan Prepares",
    time: "Day 1",
    desc: "Our artisans in Jaipur carefully wrap and pack your stone piece with protective material.",
  },
  {
    icon: "bi-qr-code-scan",
    title: "Dispatched & Tracked",
    time: "Day 1–2",
    desc: "Your parcel is handed to our courier partner and a tracking link is sent to your phone and email.",
  },
  {
    icon: "bi-truck",
    title: "In Transit",
    time: "Day 2–7",
    desc: "Your order travels from Rajasthan to your doorstep. You can track it live at any time.",
  },
  {
    icon: "bi-house-check",
    title: "Delivered",
    time: "Day 5–8",
    desc: "Your piece arrives safely packed. Inspect it immediately and contact us if anything is amiss.",
  },
];

const partners = [
  { name: "Delhivery", icon: "bi-truck-front", coverage: "Pan India" },
  { name: "Blue Dart", icon: "bi-lightning", coverage: "Express & Metro" },
  { name: "DTDC", icon: "bi-box-seam", coverage: "Pan India" },
  { name: "Shiprocket", icon: "bi-rocket", coverage: "Remote Areas" },
];

const faqs = [
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within India only. International shipping is planned for late 2025. Join our newsletter to be notified when it launches.",
  },
  {
    q: "What happens if I'm not home during delivery?",
    a: "Our courier partner will attempt delivery up to 3 times. After 3 failed attempts, the parcel is held at the nearest hub for 7 days before being returned to us.",
  },
  {
    q: "Can I change my delivery address after placing the order?",
    a: "Address changes are possible within 12 hours of placing the order, before dispatch. Contact us immediately at support@luxlina.in with your Order ID.",
  },
  {
    q: "Are stone items packed safely for transit?",
    a: "Absolutely. Every piece is individually bubble-wrapped, surrounded by foam padding, and placed in a double-walled corrugated box. Fragile stickers are affixed on all sides.",
  },
  {
    q: "My tracking isn't updating. What should I do?",
    a: "Tracking can take up to 24 hours to activate after dispatch. If it hasn't updated in 48 hours, contact us with your Order ID and we'll escalate it with the courier.",
  },
  {
    q: "Do you deliver to rural or remote pin codes?",
    a: "We deliver to 27,000+ pin codes across India. Some remote locations may take 2–3 additional days and may incur an extra charge of ₹50–₹100 shown at checkout.",
  },
];

const ShippingPolicy = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();
  const goTo = location.state?.from;


  

  return (
    <div className={styles.page}>
      {goTo && <Back goTo={goTo}/>}
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="bi bi-truck" /> Shipping Information
          </span>
          <h1 className={styles.heroTitle}>
            We Deliver Craftsmanship
            <br />
            to Your Doorstep
          </h1>
          <p className={styles.heroSub}>
            Every stone piece journeys from our artisans in Jaipur directly to
            you — handled with the same care it took to carve it.
          </p>
          <div className={styles.heroPills}>
            <span className={styles.pill}>
              <i className="bi bi-geo-alt" /> Pan India Delivery
            </span>
            <span className={styles.pill}>
              <i className="bi bi-shield-check" /> Insured Shipments
            </span>
            <span className={styles.pill}>
              <i className="bi bi-qr-code-scan" /> Live Tracking
            </span>
            <span className={styles.pill}>
              <i className="bi bi-box-seam" /> Secure Packaging
            </span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* ── Shipping Plans ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Shipping Options</h2>
            <p className={styles.sectionSub}>
              Choose the speed that works for you at checkout
            </p>
          </div>
          <div className={styles.plansGrid}>
            {shippingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.planCard} ${plan.highlight ? styles.planHighlight : ""}`}
              >
                {plan.highlight && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}
                <div className={styles.planIcon}>
                  <i className={`bi ${plan.icon}`} />
                </div>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.planAmount}>{plan.price}</span>
                  <span className={styles.planPriceNote}>{plan.priceNote}</span>
                </div>
                <p className={styles.planPriceSub}>{plan.priceSub}</p>
                <div className={styles.planDivider} />
                <div className={styles.planDetail}>
                  <i className="bi bi-clock" />
                  <span>{plan.days}</span>
                </div>
                <div className={styles.planDetail}>
                  <i className="bi bi-geo" />
                  <span>{plan.coverage}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Journey Timeline ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Your Order's Journey</h2>
            <p className={styles.sectionSub}>
              From our artisan's hands to yours, step by step
            </p>
          </div>
          <div className={styles.journeyWrap}>
            {timeline.map((step, i) => (
              <div key={i} className={styles.journeyStep}>
                <div className={styles.journeyLeft}>
                  <div className={styles.journeyIconWrap}>
                    <i className={`bi ${step.icon}`} />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={styles.journeyLine} />
                  )}
                </div>
                <div className={styles.journeyBody}>
                  <div className={styles.journeyMeta}>
                    <h4 className={styles.journeyTitle}>{step.title}</h4>
                    <span className={styles.journeyTime}>{step.time}</span>
                  </div>
                  <p className={styles.journeyDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Packaging Promise ── */}
        <section className={styles.section}>
          <div className={styles.packagingCard}>
            <div className={styles.packagingText}>
              <span className={styles.packagingEyebrow}>Our Promise</span>
              <h2 className={styles.packagingTitle}>
                Packaged Like the Precious Craft It Is
              </h2>
              <p className={styles.packagingDesc}>
                Stone is heavy and fragile. We triple-protect every order —
                individual bubble wrap, foam cavity inserts, and a reinforced
                double-walled corrugated box. Fragile stickers on every face.
                Every parcel is insured against transit damage.
              </p>
              <div className={styles.packagingFeatures}>
                {[
                  { icon: "bi-layers", label: "Triple-layer wrapping" },
                  { icon: "bi-shield-fill-check", label: "Transit insurance" },
                  { icon: "bi-recycle", label: "Eco-friendly materials" },
                  { icon: "bi-camera-video", label: "Packing video available" },
                ].map(({ icon, label }) => (
                  <div key={label} className={styles.packagingFeature}>
                    <i className={`bi ${icon}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.packagingVisual}>
              <div className={styles.boxIllustration}>
                <div className={styles.boxOuter}>
                  <div className={styles.boxInner}>
                    <i className="bi bi-gem" />
                  </div>
                  <span className={styles.fragileLabel}>✦ FRAGILE ✦</span>
                </div>
                <div className={styles.boxShadow} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Courier Partners ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Our Courier Partners</h2>
            <p className={styles.sectionSub}>
              We work with India's most trusted logistics networks
            </p>
          </div>
          <div className={styles.partnersGrid}>
            {partners.map((p) => (
              <div key={p.name} className={styles.partnerCard}>
                <i className={`bi ${p.icon}`} />
                <span className={styles.partnerName}>{p.name}</span>
                <span className={styles.partnerCoverage}>{p.coverage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Important Notes ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Important Notes</h2>
          </div>
          <div className={styles.notesGrid}>
            {[
              {
                icon: "bi-calendar-x",
                title: "Holidays & Delays",
                text: "Delivery timelines exclude Sundays and public holidays. During festive seasons (Diwali, Holi), add 2–3 extra days.",
              },
              {
                icon: "bi-cloud-rain",
                title: "Weather & Force Majeure",
                text: "Natural calamities, strikes, or extreme weather may delay shipments. We will proactively notify you via email and SMS.",
              },
              {
                icon: "bi-cash-coin",
                title: "Cash on Delivery",
                text: "COD is available on orders up to ₹5,000. A ₹30 COD handling fee applies. Available on standard delivery only.",
              },
              {
                icon: "bi-building",
                title: "Bulk & B2B Orders",
                text: "For bulk orders (10+ pieces), contact us for a custom shipping quote and dedicated account management.",
              },
            ].map((note) => (
              <div key={note.title} className={styles.noteCard}>
                <i className={`bi ${note.icon}`} />
                <h4 className={styles.noteTitle}>{note.title}</h4>
                <p className={styles.noteText}>{note.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Shipping FAQs</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}
              >
                <button
                  className={styles.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`bi ${openFaq === i ? "bi-dash" : "bi-plus"}`}
                  />
                </button>
                {openFaq === i && <div className={styles.faqA}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ── Help Strip ── */}
        <div className={styles.helpStrip}>
          <div className={styles.helpLeft}>
            <i className="bi bi-headset" />
            <div>
              <p className={styles.helpTitle}>
                Still have questions about shipping?
              </p>
              <p className={styles.helpSub}>
                Our support team is available Mon–Sat, 10 AM – 6 PM IST
              </p>
            </div>
          </div>
          <div className={styles.helpActions}>
            <a
              href="mailto:support@luxlina.in"
              className={styles.helpBtn}
            >
              <i className="bi bi-envelope" /> Email Us
            </a>
            <Link to="/returns" className={styles.helpOutline}>
              <i className="bi bi-arrow-counterclockwise" /> Return Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
