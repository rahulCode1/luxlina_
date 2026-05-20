import { useParams, useRevalidator } from "react-router-dom";
import { privateApi } from "../../utils/axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ReviewsList from "./ReviewsList";
import styles from "./ProductReview.module.css";
import ErrorModel from "../ErrorModal.jsx";

const ProductReview = ({ reviews }) => {
  const initialValue = { rating: "5", reviewText: "" };
  const [review, setReview] = useState(initialValue);
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const filePickerRef = useRef();
  const productId = params?.id;
  const revalidator = useRevalidator();

  const handleOnChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (files.length === 0) {
      return;
    }

    const filePreviewUrls = [];

    files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        filePreviewUrls.push(fileReader.result);

        if (filePreviewUrls.length === files.length) {
          setPreviewUrl(filePreviewUrls);
        }
      };

      fileReader.readAsDataURL(file);
    });
  }, [files]);

  const pickedHandler = (e) => {
    let pickedFiles;
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files.length <= 2
    ) {
      pickedFiles = Array.from(e.target.files);
      setFiles(pickedFiles);
    }
  };

  const setStateToInitialValue = () => {
    setReview(initialValue);

    setPreviewUrl([]);
    setFiles([]);
  };

  const handleAddProductRating = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      return setError("Please picked atleast 1 image to submit review.");
    }

    const toastId = toast.loading("Adding review...");
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("rating", review.rating);
      formData.append("reviewText", review.reviewText);
      files.forEach((image) => formData.append("images", image));

      const res = await privateApi.post(
        `/product/${productId}/review`,
        formData,
      );

      setStateToInitialValue();
      revalidator.revalidate();
      toast.success(res.data?.message || "Review added successfully.", {
        id: toastId,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add review.");
      toast.error(err?.response?.data?.message || "Failed to add review.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* ── Write a Review ── */}
      {error && <ErrorModel message={error} onClose={() => setError(null)} />}
      <section>
        <h3 className={styles.sectionTitle}>Write a Review</h3>
        <div className={styles.formCard}>
          <form onSubmit={handleAddProductRating}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="rating">
                Rating
              </label>
              <select
                className={styles.select}
                id="rating"
                name="rating"
                value={review.rating}
                onChange={handleOnChange}
                required
              >
                <option value="5">⭐⭐⭐⭐⭐ — Excellent (5 stars)</option>
                <option value="4">⭐⭐⭐⭐ — Good (4 stars)</option>
                <option value="3">⭐⭐⭐ — Average (3 stars)</option>
                <option value="2">⭐⭐ — Poor (2 stars)</option>
                <option value="1">⭐ — Terrible (1 star)</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="reviewText">
                Your Review
              </label>
              <textarea
                className={styles.textarea}
                id="reviewText"
                name="reviewText"
                value={review.reviewText}
                onChange={handleOnChange}
                required
                placeholder="Share your experience with this product…"
              />
            </div>

            <div className={styles.uploadSection}>
              <div className={styles.wrapper}>
                <input
                  type="file"
                  id="images"
                  ref={filePickerRef}
                  onChange={pickedHandler}
                  style={{ display: "none" }}
                  accept=".jpg,.png,.jpeg"
                  name="images"
                  multiple
                />

                <div className={styles.previewArea}>
                  {previewUrl.length > 0 ? (
                    previewUrl.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="preview"
                        className={styles.previewImage}
                      />
                    ))
                  ) : (
                    <span className={styles.placeholder}>
                      No images selected
                    </span>
                  )}
                </div>

                <span className={styles.hint}>
                  Up to 2 images (.jpg, .png, .jpeg)
                </span>

                <button
                  type="button"
                  className={styles.pickButton}
                  onClick={() => filePickerRef.current.click()}
                >
                  📎 Pick image
                </button>
              </div>
            </div>

            <button
              className={styles.submitBtn}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Submitting…" : "Submit Review"}
            </button>
          </form>
        </div>
      </section>

      {/* ── All Reviews ── */}
      <section className={styles.reviewsSection}>
        <h3 className={styles.sectionTitle}>
          Customer Reviews {reviews?.length > 0 && `(${reviews.length})`}
        </h3>
        <ReviewsList reviews={reviews} />
      </section>
    </div>
  );
};

export default ProductReview;
