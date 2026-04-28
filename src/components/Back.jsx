import { Link } from "react-router-dom";
import styles from "./Back.module.css";

const Back = ({ goTo  }) => {
  return (
    <>
      {/* ── Back Button ── */}
      <div className={styles.backWrap}>
        <Link to={goTo} className={styles.backBtn}>
          <i className="bi bi-arrow-left" />
          <span>Back </span>
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className={styles.hero}>{/* ...rest unchanged */}</div>
    </>
  );
};

export default Back;
