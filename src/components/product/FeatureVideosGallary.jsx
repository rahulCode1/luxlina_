import styles from "./FeatureVideosGallary.module.css";
import { privateApi } from "../../utils/axios";
import { useState } from "react";
import { useParams, useRevalidator } from "react-router-dom";

const FeatureVideosGallary = ({ featureVideos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoId, setVideoId] = useState(null);
  const productId = useParams()?.id;
  const revalidator = useRevalidator();
  const hasVideos = featureVideos && featureVideos.length > 0;

  const handleDeleteVideo = async (videoId) => {
    try {
      setVideoId(videoId);
      setIsLoading(true);
      const res = await privateApi.delete(
        `product/${productId}/featureVideo?videoId=${videoId}`,
      );
      setVideoId(null);
      revalidator.revalidate();
      console.log(res.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(error);

  return (
    <section className={styles.section}>
      {hasVideos ? (
        <div className={styles.track}>
          {featureVideos.map((video, i) => (
            <div
              key={video.id}
              className={styles.card}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div
                className={styles.videoWrap}
                style={{ position: "relative" }}
              >
                <video
                  src={video?.url}
                  controls
                  className={styles.video}
                  preload="metadata"
                />
                <button
                  disabled={isLoading}
                  onClick={() => handleDeleteVideo(video.id)}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  {video.id === videoId ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <i class="bi bi-trash-fill" />
                  )}
                </button>
              </div>
              {video?.title && <p className={styles.title}>{video.title}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <i className="bi bi-camera-video-off" />
          <span>No feature videos for this product yet.</span>
        </div>
      )}
    </section>
  );
};

export default FeatureVideosGallary;
