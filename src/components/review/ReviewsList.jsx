import styles from "./ReviewsList.module.css";

const ReviewsList = ({ reviews }) => {
  return (
    <div className={styles.container}>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.userName}>{review.user?.name}</p>
              <span className={styles.stars}>
                {[...Array(Number(review.rating))].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </span>
            </div>

            {review.reviewText && (
              <p className={styles.reviewText}>{review.reviewText}</p>
            )}

            {review.images?.length > 0 && (
              <div className={styles.imageRow}>
                {review.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt=""
                    className={styles.reviewImage}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className={styles.empty}>No reviews yet. Be the first to share your thoughts.</p>
      )}
    </div>
  );
};

export default ReviewsList;