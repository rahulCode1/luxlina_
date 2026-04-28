import { Link, useLocation } from "react-router-dom";
import styles from "./Sustainability.module.css";
import Back from "../../components/Back";

const pillars = [
  {
    icon: "bi-tree-fill",
    title: "Ethical Stone Sourcing",
    desc: "Every block of Makrana marble and Jodhpur sandstone we use comes from quarries registered under Rajasthan's mining regulations. We audit sourcing partners annually and reject any supply chain we cannot trace.",
  },
  {
    icon: "bi-people-fill",
    title: "Artisan Welfare",
    desc: "Fair wages above district minimums, medical support, and safe ventilated workshops. We partner with 50+ master karigars as long-term collaborators — not piece-rate contractors.",
  },
  {
    icon: "bi-recycle",
    title: "Zero Waste Workshop",
    desc: "Stone offcuts are repurposed into smaller products or gifted to local sculptors. Dust is collected, processed, and sold back as raw material. Nothing leaves our workshop as landfill.",
  },
  {
    icon: "bi-box-seam",
    title: "Secure & Responsible Packaging",
    desc: "Stone is heavy and fragile — we use bubble wrap, reinforced double-wall boxes, and foam inserts to ensure your piece arrives intact. We continuously explore lower-waste alternatives without compromising protection.",
  },
  {
    icon: "bi-sun",
    title: "Low-Carbon Logistics",
    desc: "We batch shipments to reduce courier runs, partner with carbon-neutral delivery providers where available, and offset the remainder through certified reforestation in Rajasthan.",
  },
  {
    icon: "bi-hand-thumbs-up-fill",
    title: "Community Reinvestment",
    desc: "3% of every order funds skill-development workshops for young artisans in Jaipur's karigar communities, preserving a craft tradition that spans over 400 years.",
  },
];

const metrics = [
  { num: "0%", label: "Virgin Plastic Used" },
  { num: "100%", label: "Offcuts Repurposed" },
  { num: "3%", label: "Revenue to Artisans" },
  { num: "400+", label: "Years of Craft Preserved" },
];

const timeline = [
  {
    year: "2020",
    title: "Founded on Principle",
    desc: "Launched with a supplier code of conduct before our first sale — fair wages and traceable stone from day one.",
  },
  {
    year: "2021",
    title: "Plastic-Free Packaging",
    desc: "Eliminated all virgin plastic from packaging. Switched to recycled kraft, jute, and pulp foam inserts.",
  },
  {
    year: "2022",
    title: "Zero-Waste Workshop",
    desc: "Introduced full offcut collection and redistribution. Stone dust now sold back as raw material.",
  },
  {
    year: "2023",
    title: "Artisan Welfare Fund",
    desc: "Formalised the 3% community reinvestment programme funding workshops for karigar apprentices.",
  },
  {
    year: "2024",
    title: "Carbon Offset Partnership",
    desc: "Partnered with Rajasthan Reforestation Trust to offset logistics emissions on every shipment.",
  },
  {
    year: "2025+",
    title: "Solar Workshop Goal",
    desc: "Working toward fully solar-powered workshops across all partner karigar units by 2026.",
  },
];

const certifications = [
  {
    icon: "bi-shield-check",
    label: "Rajasthan Certified Artisans",
    sub: "State craft authority recognised",
  },
  {
    icon: "bi-award",
    label: "Ethical Quarry Partners",
    sub: "Audited supply chain, annually reviewed",
  },
  {
    icon: "bi-box-seam",
    label: "Safe Packaging Guarantee",
    sub: "Every piece insured against transit damage",
  },
  {
    icon: "bi-tree",
    label: "Carbon Offset Programme",
    sub: "Rajasthan Reforestation Trust",
  },
];

const Sustainability = () => {
  const location = useLocation();
  const goTo = location.state?.from;
  return (
    <div className={styles.page}>
      {goTo && <Back goTo={goTo} />}
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="bi bi-leaf" /> Our Commitment
          </span>
          <h1 className={styles.heroTitle}>
            Craft That Cares for
            <br />
            <em className={styles.heroTitleEm}>Earth &amp; People</em>
          </h1>
          <p className={styles.heroSub}>
            Sustainability at itsHandicrafted isn't a checkbox — it's the
            foundation. From the quarry to your doorstep, every decision is
            measured against its impact on land, livelihood, and legacy.
          </p>
          <div className={styles.heroDivider} aria-hidden="true" />
          <div className={styles.statsRow}>
            {metrics.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro Strip ── */}
      <section className={styles.introStrip}>
        <div className={styles.introInner}>
          <i
            className="bi bi-quote"
            aria-hidden="true"
            className={styles.introQuoteIcon}
          />
          <blockquote className={styles.introQuote}>
            Stone is ancient. Our responsibility to it — and to the hands that
            shape it — must be equally enduring.
          </blockquote>
          <p className={styles.introAttr}>
            — itsHandicrafted, Founding Principle
          </p>
        </div>
      </section>

      {/* ── Six Pillars ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>What we stand for</p>
            <h2 className={styles.sectionTitle}>Our Six Pillars</h2>
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((p) => (
              <div key={p.title} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <i className={`bi ${p.icon}`} />
                </div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>How we got here</p>
            <h2 className={styles.sectionTitle}>Our Sustainability Journey</h2>
          </div>
          <div className={styles.timeline}>
            {timeline.map((t, i) => (
              <div key={t.year} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <span className={styles.timelineYear}>{t.year}</span>
                </div>
                <div className={styles.timelineConnector}>
                  <div className={styles.timelineDot} />
                  {i < timeline.length - 1 && (
                    <div className={styles.timelineLine} />
                  )}
                </div>
                <div className={styles.timelineRight}>
                  <h3 className={styles.timelineTitle}>{t.title}</h3>
                  <p className={styles.timelineDesc}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stone Lifecycle ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Responsible by design</p>
            <h2 className={styles.sectionTitle}>The Stone's Full Journey</h2>
          </div>
          <div className={styles.lifecycle}>
            {[
              {
                icon: "bi-geo-alt-fill",
                step: "01",
                label: "Ethical Quarry",
                sub: "Regulated extraction, Rajasthan",
              },
              {
                icon: "bi-truck",
                step: "02",
                label: "Direct Transport",
                sub: "Minimal handling, no middlemen",
              },
              {
                icon: "bi-hammer",
                step: "03",
                label: "Karigar Workshop",
                sub: "Hand-carved, fair-wage artisans",
              },
              {
                icon: "bi-box-seam",
                step: "04",
                label: "Secure Packaging",
                sub: "Bubble wrap & reinforced boxes",
              },
              {
                icon: "bi-house-heart-fill",
                step: "05",
                label: "Your Home",
                sub: "Lasting piece, generations of use",
              },
            ].map((s, i, arr) => (
              <div key={s.step} className={styles.lifecycleStep}>
                <div className={styles.lifecycleCard}>
                  <span className={styles.lifecycleNum}>{s.step}</span>
                  <div className={styles.lifecycleIconWrap}>
                    <i className={`bi ${s.icon}`} />
                  </div>
                  <p className={styles.lifecycleLabel}>{s.label}</p>
                  <p className={styles.lifecycleSub}>{s.sub}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className={styles.lifecycleArrow} aria-hidden="true">
                    <i className="bi bi-chevron-right" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Verified commitments</p>
            <h2 className={styles.sectionTitle}>
              Recognitions &amp; Certifications
            </h2>
          </div>
          <div className={styles.certsRow}>
            {certifications.map((c) => (
              <div key={c.label} className={styles.certCard}>
                <div className={styles.certIcon}>
                  <i className={`bi ${c.icon}`} />
                </div>
                <p className={styles.certLabel}>{c.label}</p>
                <p className={styles.certSub}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className={styles.cta}>
        <div className={styles.ctaBg} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <div className={styles.ctaIcon} aria-hidden="true">
            <i className="bi bi-leaf-fill" />
          </div>
          <h2 className={styles.ctaTitle}>
            Every Purchase is a Vote for Craft &amp; Planet
          </h2>
          <p className={styles.ctaSub}>
            When you choose itsHandicrafted, you support a supply chain that is
            traceable, fair, and built to last — for artisans, for communities,
            and for the earth beneath our workshops.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/" className={styles.btnPrimary}>
              <i className="bi bi-grid-3x3-gap" /> Shop Responsibly
            </Link>
            <Link to="/artisans" className={styles.btnOutline}>
              <i className="bi bi-people" /> Meet Our Artisans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
