import { Link, useLocation } from "react-router-dom";
import styles from "./AboutUs.module.css";
import Back from "../../components/Back";

const stats = [
  { num: "500+", label: "Unique Products" },
  { num: "50+", label: "Master Artisans" },
  { num: "27k+", label: "Pin Codes Served" },
  { num: "100%", label: "Handmade" },
];

const values = [
  {
    icon: "bi-people-fill",
    title: "Artisan First",
    desc: "Fair wages, safe workshops, and creative respect for every karigar we partner with. Their livelihood is part of every purchase.",
  },
  {
    icon: "bi-leaf",
    title: "Responsibly Sourced",
    desc: "Stone is extracted from ethical quarries in Rajasthan under regulated conditions, minimising environmental impact.",
  },
  {
    icon: "bi-gem",
    title: "Genuine Handcraft",
    desc: "Zero machine-made pieces. Every item is hand-carved, hand-finished, and inspected before it reaches you.",
  },
  {
    icon: "bi-box-seam",
    title: "Safe Delivery",
    desc: "Bubble-wrap, foam inserts, reinforced double-wall boxes, and transit insurance — your piece arrives as intended.",
  },
  {
    icon: "bi-headset",
    title: "Honest Support",
    desc: "Real humans, Mon–Sat 10 AM–6 PM IST. We respond, we resolve, we care about the experience after the sale.",
  },
  {
    icon: "bi-pencil-square",
    title: "Custom Craft",
    desc: "Need a bespoke size, design, or bulk order? Our artisan team assesses and delivers personalised pieces.",
  },
];

const collections = [
  {
    icon: "bi-egg-fried",
    name: "Kitchen & Dining",
    sub: "Mortars, platters & more",
  },
  {
    icon: "bi-house-heart",
    name: "Home Décor",
    sub: "Vases, urns & sculptures",
  },
  {
    icon: "bi-brilliance",
    name: "Religious & Spiritual",
    sub: "Idols, diyas & incense holders",
  },
  {
    icon: "bi-gift",
    name: "Gifts & Gifting",
    sub: "Curated sets & custom boxes",
  },
  {
    icon: "bi-flower1",
    name: "Garden & Outdoor",
    sub: "Planters & bird baths",
  },
  { icon: "bi-image", name: "Wall Art", sub: "Panels & carved reliefs" },
  {
    icon: "bi-briefcase",
    name: "Office & Desk",
    sub: "Paperweights & bookends",
  },
  { icon: "bi-pencil", name: "Custom Orders", sub: "Your vision, our hands" },
];

const materials = [
  {
    name: "Makrana Marble",
    origin: "Makrana, Rajasthan",
    desc: "The same white marble used in the Taj Mahal. Pure, luminous, and timeless — ideal for sculptures, idols, and decorative pieces.",
  },
  {
    name: "Agaria Sandstone",
    origin: "Jodhpur, Rajasthan",
    desc: "Warm amber hues and natural grain patterns. Highly workable for intricate jaali work, wall panels, and garden pieces.",
  },
  {
    name: " Granite Stone",
    origin: "Kishangarh, Rajasthan",
    desc: "Naturally soft, heat-resistant, and food-safe. The artisan's favourite for kitchen items — mortars, platters, and cookware.",
  },
];

const AboutUs = () => {
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
            <i className="bi bi-stars" /> Our Story
          </span>
          <h1 className={styles.heroTitle}>
            Stone, Shaped by
            <br />
            <em className={styles.heroTitleEm}>Devoted Hands</em>
          </h1>
          <p className={styles.heroSub}>
            Luxlina brings the timeless art of Rajasthani stone-carving
            into modern homes — ethically sourced, hand-finished, and crafted to
            last generations.
          </p>
          <div className={styles.heroDivider} aria-hidden="true" />
          <div className={styles.statsRow}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.story}>
            <div className={styles.storyText}>
              <p className={styles.sectionEyebrow}>Who we are</p>
              <h2 className={styles.sectionTitle}>
                Born in Jaipur,
                <br />
                Built on Craft
              </h2>
              <p className={styles.storyP}>
                Luxlina began with a simple belief — that the
                extraordinary skill of Rajasthani stone artisans deserves a
                modern stage. Every piece leaving our workshop carries centuries
                of tradition and the touch of a real craftsperson.
              </p>
              <p className={styles.storyP}>
                We work directly with master karigars in Jaipur, ensuring fair
                wages, safe conditions, and the creative freedom they deserve.
                No middlemen. No factories. Just stone, tools, and devotion.
              </p>
              <div className={styles.storyBadges}>
                <span className={styles.badge}>
                  <i className="bi bi-geo-alt-fill" /> Jaipur, Rajasthan
                </span>
                <span className={styles.badge}>
                  <i className="bi bi-award" /> Since 2020
                </span>
                <span className={styles.badge}>
                  <i className="bi bi-shield-check" /> Certified Artisans
                </span>
              </div>
            </div>

            <div className={styles.storyVisual}>
              <div className={styles.stoneFrame}>
                <div className={styles.stoneGlyph} aria-hidden="true">
                  <i className="bi bi-hammer" />
                </div>
                <div className={styles.stoneTags}>
                  <span className={styles.stoneTag}>
                    <i className="bi bi-check-circle" /> Ethically sourced
                  </span>
                  <span className={styles.stoneTag}>
                    <i className="bi bi-check-circle" /> Hand-carved
                  </span>
                  <span className={styles.stoneTag}>
                    <i className="bi bi-check-circle" /> No two alike
                  </span>
                </div>
                <blockquote className={styles.stoneQuote}>
                  "When you hold one of our pieces, you hold the patience of a
                  craftsperson — every chisel mark is a signature."
                </blockquote>
                <p className={styles.stoneAttr}>
                  — Founding Artisan, Luxlina
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>What drives us</p>
            <h2 className={styles.sectionTitle}>Our Commitments</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valCard}>
                <div className={styles.valIcon}>
                  <i className={`bi ${v.icon}`} />
                </div>
                <h3 className={styles.valTitle}>{v.title}</h3>
                <p className={styles.valDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>What we make</p>
            <h2 className={styles.sectionTitle}>Our Collections</h2>
          </div>
          <div className={styles.catsGrid}>
            {collections.map((c) => (
              <Link to="/shop" key={c.name} className={styles.catPill}>
                <i className={`bi ${c.icon} ${styles.catIcon}`} />
                <span className={styles.catName}>{c.name}</span>
                <span className={styles.catSub}>{c.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Our craft materials</p>
            <h2 className={styles.sectionTitle}>Stones We Work With</h2>
          </div>
          <div className={styles.matsRow}>
            {materials.map((m) => (
              <div key={m.name} className={styles.matCard}>
                <div className={styles.matAccent} aria-hidden="true" />
                <h3 className={styles.matName}>{m.name}</h3>
                <p className={styles.matOrigin}>
                  <i className="bi bi-geo-alt" /> {m.origin}
                </p>
                <p className={styles.matDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promise strip ── */}
      <section className={styles.promise}>
        <div className={styles.promiseInner}>
          <div className={styles.promiseIcon} aria-hidden="true">
            <i className="bi bi-heart-fill" />
          </div>
          <h2 className={styles.promiseTitle}>Craft That Carries a Promise</h2>
          <p className={styles.promiseSub}>
            Every item you bring home from Luxlina supports a family of
            artisans, keeps a centuries-old tradition alive, and adds a piece of
            genuine Rajasthani heritage to your space.
          </p>
          <div className={styles.promiseBtns}>
            <Link to="/" className={styles.btnPrimary}>
              <i className="bi bi-grid-3x3-gap" /> Explore Collection
            </Link>
            <Link to="/contact" className={styles.btnOutline}>
              <i className="bi bi-pencil-square" /> Custom &amp; Bulk Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
