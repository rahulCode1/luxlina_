import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = ({ from }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Top decorative band */}
      <div className={styles.topBand}>
        <div className={styles.bandInner}>
          <span className={styles.bandItem}>
            <i className="bi bi-truck" /> Free Shipping above ₹999
          </span>
          <span className={styles.bandDivider}>✦</span>
          <span className={styles.bandItem}>
            <i className="bi bi-arrow-counterclockwise" /> 7-Day Returns
          </span>
          <span className={styles.bandDivider}>✦</span>
          <span className={styles.bandItem}>
            <i className="bi bi-shield-check" /> Secure Payments
          </span>
          <span className={styles.bandDivider}>✦</span>
          <span className={styles.bandItem}>
            <i className="bi bi-patch-check" /> 100% Handcrafted
          </span>
        </div>
      </div>

      {/* Main footer body */}
      <div className={styles.body}>
        <div className={styles.inner}>
          {/* Brand column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
            Luxlina
            </Link>
            <p className={styles.tagline}>
              Crafted from the earth, carried into your home. Each piece is
              hand-carved by master artisans using stone sourced from the
              mountains of Rajasthan.
            </p>
            <div className={styles.socialRow}>
              {[
                {
                  icon: "bi-instagram",
                  label: "Instagram",
                  href: "",
                },
                { icon: "bi-facebook", label: "Facebook", href: "#" },
                { icon: "bi-pinterest", label: "Pinterest", href: "#" },
                { icon: "bi-youtube", label: "YouTube", href: "#" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialIcon}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>
            <div className={styles.paymentIcons}>
              <span className={styles.payLabel}>We accept</span>
              <div className={styles.payRow}>
                {["UPI", "Visa", "MC", "RuPay", "COD"].map((p) => (
                  <span key={p} className={styles.payBadge}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Shop column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Shop</h4>
            <ul className={styles.linkList}>
              {[
                { label: "All Products", to: "/products" },
                { label: "Home Décor", to: "/products?category=home-decor" },
                { label: "Garden & Outdoor", to: "/products?category=garden" },
                {
                  label: "Figurines & Idols",
                  to: "/products?category=figurines",
                },
                { label: "Kitchenware", to: "/products?category=kitchenware" },
                { label: "New Arrivals", to: "/products?sort=new" },
                { label: "Best Sellers", to: "/products?sort=popular" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    state={{ from: from }}
                    className={styles.footerLink}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Help & Support</h4>
            <ul className={styles.linkList}>
              {[
                { label: "Track My Order", to: "/orders" },
                { label: "Returns & Refunds", to: "/returns" },
                { label: "Shipping Policy", to: "/shipping-policy" },
                { label: "FAQs", to: "/faqs" },
                { label: "Contact Us", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    state={{ from: from }}
                    className={styles.footerLink}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Company</h4>
            <ul className={styles.linkList}>
              {[
                { label: "About Us", to: "/about" },
                { label: "Our Artisans", to: "/artisans" },
                { label: "Sustainability", to: "/sustainability" },
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Terms & Conditions", to: "/terms" },
                { label: "Cancellation Policy", to: "/cancellation" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    state={{ from: from }}
                    className={styles.footerLink}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter column */}
          <div className={styles.contactCol}>
            <div className={styles.contactBlock}>
              <h4 className={styles.colHeading} style={{ marginTop: "1.5rem" }}>
                Contact
              </h4>
              <div className={styles.contactItem}>
                <i className="bi bi-envelope" />
                <a
                  href="mailto:rahulkumawat50665@gmail.com"
                  className={styles.footerLink}
                >
                  rahulkumawat50665@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <i className="bi bi-telephone" />
                <a href="tel:+916377408633" className={styles.footerLink}>
                  +916377408633
                </a>
              </div>
              <div className={styles.contactItem}>
                <i className="bi bi-geo-alt" />
                <span className={styles.address}>
                Luxlina
                  <br />
                  Kishangarh, Rajasthan 305802
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges row */}
      <div className={styles.trustRow}>
        <div className={styles.trustInner}>
          {[
            { icon: "bi-lock", text: "SSL Secured" },
            { icon: "bi-building", text: "GST Registered" },
            { icon: "bi-hand-thumbs-up", text: "Buyer Protected" },
            { icon: "bi-patch-check-fill", text: "Verified Artisans" },
            { icon: "bi-recycle", text: "Eco Conscious" },
          ].map(({ icon, text }) => (
            <div key={text} className={styles.trustBadge}>
              <i className={`bi ${icon}`} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {currentYear} Luxlina. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <span className={styles.dot}>·</span>
            <Link to="/terms" className={styles.legalLink}>
              Terms of Use
            </Link>
            <span className={styles.dot}>·</span>
            <Link to="/cancellation" className={styles.legalLink}>
              Cancellation
            </Link>
            <span className={styles.dot}>·</span>
            <Link to="/shipping-policy" className={styles.legalLink}>
              Shipping
            </Link>
          </div>
          <p className={styles.madeWith}>
            Handcrafted with ♥ in Rajasthan, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
