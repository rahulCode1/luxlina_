import styles from "./FeatureVideosGallary.module.css";
import { privateApi } from "../../utils/axios";
import { useState } from "react";
import { useParams, useRevalidator, useSearchParams } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";

const FeatureVideosGallary = ({ featureVideos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { setError } = useEcommerce();
  const productId = useParams()?.id;
  const revalidator = useRevalidator();
  const hasVideos = featureVideos && featureVideos.length > 0;
  const [searchParams] = useSearchParams();
  const renderVideo = searchParams.get("variationId")
    ? featureVideos.filter(
        (video) => video?.variationId === searchParams.get("variationId"),
      )
    : featureVideos;

  const handleDeleteFeatureVideo = async (videoId, variationId) => {
    try {
      setVideoId(videoId);
      setIsLoading(true);
      const res = await privateApi.delete(
        `product/${productId}/variation/${variationId}/featureVideo/${videoId}`,
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

  return (
    <section className={styles.section}>
      {hasVideos ? (
        <div className={styles.track}>
          {renderVideo.map((video, i) => (
            <div
              key={video.id}
              className={styles.card}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={styles.videoWrap}>
                <video
                  src={video?.url}
                  controls
                  className={styles.video}
                  preload="metadata"
                />
                <button
                  aria-label="Delete video"
                  disabled={isLoading}
                  onClick={() =>
                    handleDeleteFeatureVideo(video.id, video?.variationId)
                  }
                  className={styles.deleteBtn}
                >
                  {video.id === videoId ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i className="bi bi-trash-fill" aria-hidden="true" />
                  )}
                </button>
              </div>
              {video?.title && <p className={styles.title}>{video.title}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <i className="bi bi-camera-video-off" aria-hidden="true" />
          <span>No feature videos for this product yet.</span>
        </div>
      )}
    </section>
  );
};

export default FeatureVideosGallary;
