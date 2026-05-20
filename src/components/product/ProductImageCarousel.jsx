import { useState, useCallback, useEffect, useRef } from "react";
import styles from "./ProductImageCarousel.module.css";

// ─── Component ───────────────────────────────────────────────────────────────
const ProductImageCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [animClass, setAnimClass] = useState(styles.fade);
  const [key, setKey] = useState(0); // forces re-mount → re-animates
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();

  const go = useCallback(
    (nextIndex, direction = "right") => {
      if (nextIndex === current) return;
      setAnimClass(
        direction === "right" ? styles.slideRight : styles.slideLeft,
      );
      setKey((k) => k + 1);
      setCurrent(nextIndex);
    },
    [current],
  );

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  const prev = useCallback(() => {
    const idx = (current - 1 + images.length) % images.length;
    go(idx, "left");
  }, [current, images.length, go]);

  const next = useCallback(() => {
    const idx = (current + 1) % images.length;
    go(idx, "right");
  }, [current, images.length, go]);

  // ── Touch / swipe support ─────────────────────────────────────────────────
  const touchStartX = useCallback((e) => {
    touchStartX._x = e.touches[0].clientX;
  }, []);

  const touchEnd = useCallback(
    (e) => {
      const dx = e.changedTouches[0].clientX - (touchStartX._x || 0);
      if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    },
    [next, prev],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnd);

    setIsPlaying(false);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnd);
    };
  }, [current]);

  if (!images || images.length === 0) return null;



  return (
    <div className={styles.wrapper}>
      {/* ── Stage ── */}
      {/* <button onClick={() => setIsPlaying((prev) => !prev)}>Toggle </button> */}
      <div
        className={styles.stage}
        onTouchStart={touchStartX}
        onTouchEnd={touchEnd}
        role="region"
        aria-label="Product images"
      >
        {/* Main image */}
        {images[current]?.type === "image" ? (
          <img
            key={key}
            src={images[current]?.url}
            alt={images[current]?.alt || `Product image ${current + 1}`}
            className={`${styles.mainImg} ${animClass}`}
            draggable={false}
          />
        ) : (
          <div className={styles.videoWrapper}>
            <video
              key={images[current]?.url}
              src={images[current]?.url}
              controls
              ref={videoRef}
              width={"200"}
              className={`${styles.mainImg} ${animClass}`}
            />

            {!isPlaying && (
              <button
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  backdropFilter: "blur(50px)",
                  transform: "translate(-50%, -50%)",
                  background: "transparent",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  color: "white",
                  border: "none",
                }}
                onClick={() => videoRef.current.play()}
              >
                ▶︎
              </button>
            )}
          </div>
        )}

        {/* Arrow buttons — visible on md/lg via CSS, hidden on mobile */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Previous image"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M6.5 2L3.5 5L6.5 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Next image"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M3.5 2L6.5 5L3.5 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators — only if more than 1 image */}
        {images.length > 1 && (
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Image navigation"
          >
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${
                  i === current ? styles.dotActive : styles.dotInactive
                }`}
                onClick={() => go(i, i > current ? "right" : "left")}
                aria-label={`Image ${i + 1}`}
                aria-selected={i === current}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
