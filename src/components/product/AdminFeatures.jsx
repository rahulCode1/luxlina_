import { Link } from "react-router-dom";
import VideoUpload from "./VideoUpload";
import { privateApi } from "../../utils/axios";
import { useState } from "react";
import styles from "./AdminFeatures.module.css";
import AddProductVariations from "./AddProductVariations";

const AdminFeatures = ({
  productId,
  setError,
  media,
  revalidator,
  variationId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const isProdHaveVideo = media?.some((item) => item.type === "video");

  const handleDeleteVideo = async () => {
    try {
      setIsLoading(true);
      const res = await privateApi.patch(
        `/product/${productId}/deleteVideo/${variationId}`,
      );
      revalidator.revalidate();
      console.log(res.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message || "Failed to delete video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.adminPanel}>
      {/* Header */}
      <div className={styles.adminHeader}>
        <span className={styles.adminIcon}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </span>
        <span className={styles.adminLabel}>Admin Controls</span>
      </div>

      {/* Actions */}
      <div className={styles.adminActions}>
        {/* Edit Product */}
        <Link to="edit" className={styles.editBtn}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Product
        </Link>

        {/* Video section */}

        <div className={styles.videoUploadWrapper}>
          <VideoUpload
            productId={productId}
            setError={setError}
            isProdHaveVideo={isProdHaveVideo}
            revalidator={revalidator}
            variationId={variationId}
          />
        </div>

        {isProdHaveVideo && (
          <button
            disabled={isLoading}
            onClick={handleDeleteVideo}
            className={styles.deleteVideoBtn}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Deleting…
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Remove Video
              </>
            )}
          </button>
        )}
      </div>

      <h2>Add Product variations </h2>
      <AddProductVariations
        productId={productId}
        setError={setError}
        revalidator={revalidator}
      />
    </div>
  );
};

export default AdminFeatures;
