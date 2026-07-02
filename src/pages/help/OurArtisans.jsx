import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./OurArtisans.module.css";
import Back from "../../components/Back";

const stats = [
  { num: "50+", label: "Master Artisans" },
  { num: "3rd", label: "Generation Craft" },
  { num: "25+", label: "Years Avg. Experience" },
  { num: "100%", label: "Fair Wage Certified" },
];

const artisans = [
  {
    id: 1,
    name: "Ramesh Kumawat",
    title: "Master Marble Carver",
    experience: "32 years",
    origin: "Makrana, Rajasthan",
    specialty: "Intricate Inlay & Pietra Dura",
    generation: "3rd Generation",
    quote:
      "Each vein in the marble tells me where the chisel must go. The stone already knows its shape — I simply help it arrive.",
    skills: ["Pietra Dura", "Jali Work", "Idol Carving", "Inlay"],
    icon: "bi-gem",
  },
  {
    id: 2,
    name: "Suresh Prajapat",
    title: "Sandstone Sculptor",
    experience: "24 years",
    origin: "Jodhpur, Rajasthan",
    specialty: "Architectural Jaali & Panels",
    generation: "2nd Generation",
    quote:
      "Sandstone breathes. It holds the warmth of the sun and the patience of the earth. I carve with that in mind always.",
    skills: ["Jaali Work", "Wall Panels", "Relief Carving", "Garden Pieces"],
    icon: "bi-layers",
  },
  {
    id: 3,
    name: "Dinesh Sharma",
    title: "Soapstone Artisan",
    experience: "18 years",
    origin: "Jaipur, Rajasthan",
    specialty: "Kitchen & Ritual Craft",
    generation: "2nd Generation",
    quote:
      "Soapstone is generous. It forgives you as you learn. But once you master it, it rewards you with something truly alive.",
    skills: ["Mortars & Pestles", "Ritual Items", "Figurines", "Kitchen Craft"],
    icon: "bi-stars",
  },
  {
    id: 4,
    name: "Meena Devi",
    title: "Decorative Inlay Artist",
    experience: "21 years",
    origin: "Agra, Rajasthan",
    specialty: "Floral Motif & Mughal Patterns",
    generation: "3rd Generation",
    quote:
      "My grandmother taught me that every flower has seven petals of meaning. I carve those petals in stone so they never wilt.",
    skills: ["Floral Inlay", "Mughal Patterns", "Home Décor", "Custom Pieces"],
    icon: "bi-flower1",
  },
  {
    id: 5,
    name: "Vijay Singh Rawat",
    title: "Religious Iconographer",
    experience: "28 years",
    origin: "Nathdwara, Rajasthan",
    specialty: "Temple Idols & Sacred Forms",
    generation: "3rd Generation",
    quote:
      "Before I lift the chisel, I sit in stillness. The deity must be felt before it can be carved. This is not craft — it is devotion.",
    skills: ["Deity Idols", "Temple Art", "Sacred Geometry", "Ritual Vessels"],
    icon: "bi-brilliance",
  },
  {
    id: 6,
    name: "Prakash Nath",
    title: "Fine Detail Carver",
    experience: "15 years",
    origin: "Jaipur, Rajasthan",
    specialty: "Miniature & Precision Work",
    generation: "1st Generation",
    quote:
      "People say the smallest details matter least. I have proved them wrong every day for fifteen years.",
    skills: ["Miniatures", "Precision Carving", "Bookends", "Desk Pieces"],
    icon: "bi-pencil",
  },
];

const values = [
  {
    icon: "bi-cash-coin",
    title: "Fair Wages",
    desc: "Every artisan earns above the regional median wage. We publish our wage index annually.",
  },
  {
    icon: "bi-shield-check",
    title: "Safe Workshops",
    desc: "Dust-filtered studios, ergonomic tools, and regular health check-ups — funded by Luxlina.",
  },
  {
    icon: "bi-mortarboard",
    title: "Skill Development",
    desc: "We fund apprenticeships for the next generation, ensuring ancient techniques are never lost.",
  },
  {
    icon: "bi-heart",
    title: "Creative Ownership",
    desc: "Artisans retain rights to their signature designs. We never replicate their work without consent.",
  },
];

const process = [
  {
    step: "01",
    title: "Stone Selection",
    desc: "The artisan personally inspects and selects each stone block at the quarry, reading its grain, veining, and character before a single cut is made.",
  },
  {
    step: "02",
    title: "Design Marking",
    desc: "Using traditional chalk and charcoal techniques passed down through generations, the design is mapped directly onto the stone surface.",
  },
  {
    step: "03",
    title: "Rough Carving",
    desc: "Heavy chisels remove bulk material. This stage requires raw strength and spatial precision — the foundation of everything that follows.",
  },
  {
    step: "04",
    title: "Detail Work",
    desc: "Fine chisels, files, and hand-ground tools work inward, adding depth, texture, and the motifs that give each piece its identity.",
  },
  {
    step: "05",
    title: "Surface Finishing",
    desc: "Progressive grits of sandpaper, followed by natural polish or mineral oil, bring the stone to its final luminous surface.",
  },
  {
    step: "06",
    title: "Quality Inspection",
    desc: "The artisan and our quality team inspect every dimension and surface under natural light before the piece is approved for packaging.",
  },
];

const OurArtisans = () => {
  const [activeArtisan, setActiveArtisan] = useState(null);
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
            <i className="bi bi-people" /> The Hands Behind Every Piece
          </span>
          <h1 className={styles.heroTitle}>
            Our
            <br />
            <em className={styles.heroEm}>Artisans</em>
          </h1>
          <p className={styles.heroSub}>
            Every Luxlina piece begins with a person — a karigar who has
            spent decades mastering their craft in the workshops of Rajasthan.
            These are their stories.
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

      {/* ── Intro ── */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introText}>
            <p className={styles.sectionEyebrow}>Who they are</p>
            <h2 className={styles.sectionTitle}>
              Masters of an Ancient Tradition
            </h2>
            <p className={styles.introP}>
              Our artisans are not factory workers or contractors. They are
              karigars — hereditary craftspeople whose knowledge of stone has
              been passed from parent to child for generations. Most of our
              master carvers learned their first cuts before the age of ten,
              sitting beside a parent in a workshop fragrant with stone dust and
              mineral oil.
            </p>
            <p className={styles.introP}>
              We partner exclusively with artisans based in and around Jaipur —
              the heartland of Rajasthani stone craft — and we work directly
              with them, without middlemen, ensuring that a meaningful share of
              every purchase reaches the hands that made it.
            </p>
          </div>
          <div className={styles.introVisual}>
            <div className={styles.introCard}>
              <i className="bi bi-hammer" />
              <blockquote className={styles.introQuote}>
                "Stone does not forgive haste. It rewards only patience,
                practice, and profound respect for the material."
              </blockquote>
              <p className={styles.introAttr}>
                — Ramesh Kumawat, 32 years of craft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Artisan Profiles ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Meet the karigars</p>
            <h2 className={styles.sectionTitle}>The People Who Make It</h2>
            <p className={styles.sectionSubtitle}>
              Click on any artisan to read their story.
            </p>
          </div>

          <div className={styles.artisansGrid}>
            {artisans.map((a) => (
              <div
                key={a.id}
                className={`${styles.artisanCard} ${activeArtisan === a.id ? styles.artisanCardOpen : ""}`}
                onClick={() =>
                  setActiveArtisan(activeArtisan === a.id ? null : a.id)
                }
              >
                {/* Card header */}
                <div className={styles.artisanTop}>
                  <div className={styles.artisanAvatar}>
                    <i className={`bi ${a.icon}`} />
                  </div>
                  <div className={styles.artisanMeta}>
                    <h3 className={styles.artisanName}>{a.name}</h3>
                    <p className={styles.artisanTitle}>{a.title}</p>
                    <div className={styles.artisanBadges}>
                      <span className={styles.artisanBadge}>
                        <i className="bi bi-geo-alt" /> {a.origin}
                      </span>
                      <span className={styles.artisanBadge}>
                        <i className="bi bi-clock-history" /> {a.experience}
                      </span>
                    </div>
                  </div>
                  <div className={styles.artisanToggle}>
                    <i
                      className={`bi ${activeArtisan === a.id ? "bi-dash" : "bi-plus"}`}
                    />
                  </div>
                </div>

                {/* Specialty row */}
                <div className={styles.artisanSpecialty}>
                  <span className={styles.specialtyLabel}>Speciality</span>
                  <span className={styles.specialtyValue}>{a.specialty}</span>
                  <span className={styles.generationTag}>{a.generation}</span>
                </div>

                {/* Expandable detail */}
                {activeArtisan === a.id && (
                  <div className={styles.artisanDetail}>
                    <blockquote className={styles.artisanQuote}>
                      <i className="bi bi-quote" />
                      {a.quote}
                    </blockquote>
                    <div className={styles.skillsRow}>
                      <p className={styles.skillsLabel}>Crafts</p>
                      <div className={styles.skills}>
                        {a.skills.map((sk) => (
                          <span key={sk} className={styles.skill}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Craft Process ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>From quarry to your home</p>
            <h2 className={styles.sectionTitle}>The Making of a Piece</h2>
          </div>
          <div className={styles.processGrid}>
            {process.map((p, idx) => (
              <div key={p.step} className={styles.processStep}>
                <div className={styles.processNum}>{p.step}</div>
                {idx < process.length - 1 && (
                  <div className={styles.processLine} aria-hidden="true" />
                )}
                <h3 className={styles.processTitle}>{p.title}</h3>
                <p className={styles.processDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Commitments ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>How we show up</p>
            <h2 className={styles.sectionTitle}>Our Commitment to Artisans</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className={`bi ${v.icon}`} />
                </div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaIcon}>
            <i className="bi bi-hammer" />
          </div>
          <h2 className={styles.ctaTitle}>Take Home Their Work</h2>
          <p className={styles.ctaSub}>
            Every purchase directly supports the artisan who made your piece.
            Their name, story, and years of practice live in every chisel mark.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/" className={styles.btnPrimary}>
              <i className="bi bi-grid-3x3-gap" /> Shop the Collection
            </Link>
            <Link to="/contact" className={styles.btnOutline}>
              <i className="bi bi-pencil-square" /> Commission a Custom Piece
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurArtisans;
