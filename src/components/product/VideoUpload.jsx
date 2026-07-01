import { useEffect, useRef, useState } from "react";
import { privateApi } from "../../utils/axios";
import styles from "./Videoupload.module.css";

const VideoUpload = ({
  productId,
  setError,
  isProdHaveVideo,
  revalidator,
  variationId,
}) => {
  const initialState = {
    title: "",
    videoFor: "product",
  };
  const [videoInfo, setVideoInfo] = useState(initialState);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setError("");
    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type.startsWith("video/")) {
      handleFileSelect(dropped);
    } else {
      setError("Please drop a valid video file.");
    }
  };

  const resetOrDeselectVideo = () => {
    setFile(null);
    setPreviewUrl(null);
    inputRef.current.value = "";
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleInfoChange = (e) => {
    setVideoInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a video to upload.");
    if (videoInfo.videoFor === "features" && !videoInfo.title.trim()) {
      return setError("Please add a title for the feature video.");
    }

    setIsLoading(true);
    try {
      if (videoInfo.videoFor === "product") {
        const formData = new FormData();
        formData.append("video", file);
        const res = await privateApi.patch(
          `/product/${productId}/addVideo/${variationId}`,
          formData,
        );
        console.log(res.data);
      } else {
        const formData = new FormData();
        formData.append("title", videoInfo.title);
        formData.append("product", productId);
        formData.append("video", file);
        const res = await privateApi.post(
          `/product/${productId}/featureVideo/${variationId}`,
          formData,
        );
        console.log(res.data);

        setVideoInfo(initialState);
      }

      revalidator.revalidate();
      resetOrDeselectVideo();
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="file"
        accept="video/*"
        name="video"
        ref={inputRef}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <i className="bi bi-camera-video" aria-hidden="true" />
          </div>
          <div>
            <div className={styles.headerTitle}>Upload Video</div>
            <div className={styles.headerSub}>Product media</div>
          </div>
        </div>
        {!file && (
          <button
            type="button"
            className={styles.chooseBtn}
            onClick={() => inputRef.current?.click()}
          >
            <i className="bi bi-plus" aria-hidden="true" /> Choose
          </button>
        )}
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* Drop zone */}
        {!file && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Click to choose a video or drag and drop"
            className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ""}`}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <i
              className={`bi bi-cloud-arrow-up ${styles.dzIcon}`}
              aria-hidden="true"
            />
            <p className={styles.dzText}>
              <strong>Click to browse</strong> or drag &amp; drop
            </p>
            <span className={styles.dzHint}>
              <i className="bi bi-info-circle" aria-hidden="true" />
              MP4 · MOV · WebM &nbsp;·&nbsp; up to 2 GB
            </span>
          </div>
        )}

        {/* Preview */}
        {file && (
          <>
            <div className={styles.previewCard}>
              <video
                src={previewUrl}
                controls
                className={styles.previewVideo}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={resetOrDeselectVideo}
                aria-label="Remove selected video"
              >
                <i className="bi bi-x" aria-hidden="true" />
              </button>
            </div>

            <div className={styles.filePill}>
              <i className="bi bi-file-earmark-play" aria-hidden="true" />
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>
                {formatFileSize(file.size)}
              </span>
            </div>
          </>
        )}

        <div className={styles.divider} />

        {/* Video type */}
        <div>
          <span className={styles.sectionLabel}>Video type</span>
          <div className={styles.radioGroup}>
            {!isProdHaveVideo && (
              <label
                className={`${styles.radioCard} ${
                  videoInfo.videoFor === "product"
                    ? styles.radioCardChecked
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="videoFor"
                  value="product"
                  checked={videoInfo.videoFor === "product"}
                  onChange={handleInfoChange}
                  className={styles.radioInput}
                />
                <i
                  className={`bi bi-box-seam ${styles.rcIcon}`}
                  aria-hidden="true"
                />
                <span className={styles.rcName}>Product</span>
                <span className={styles.rcDesc}>
                  Added to the image gallery
                </span>
              </label>
            )}

            <label
              className={`${styles.radioCard} ${
                videoInfo.videoFor === "features" ? styles.radioCardChecked : ""
              }`}
            >
              <input
                type="radio"
                name="videoFor"
                value="features"
                checked={videoInfo.videoFor === "features"}
                onChange={handleInfoChange}
                className={styles.radioInput}
              />
              <i
                className={`bi bi-stars ${styles.rcIcon}`}
                aria-hidden="true"
              />
              <span className={styles.rcName}>Feature</span>
              <span className={styles.rcDesc}>Standalone highlight reel</span>
            </label>
          </div>
        </div>

        {/* Title input — feature only */}
        {videoInfo.videoFor === "features" && (
          <div className={styles.inputWrap}>
            <label className={styles.sectionLabel} htmlFor="videoTitle">
              Video title
            </label>
            <input
              type="text"
              id="videoTitle"
              name="title"
              className={styles.textInput}
              placeholder="e.g. How to use this product…"
              value={videoInfo.title}
              onChange={handleInfoChange}
              maxLength={80}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmitVideo}
          disabled={isLoading || !file}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Uploading…
            </>
          ) : (
            <>
              <i className="bi bi-cloud-arrow-up" aria-hidden="true" />
              Upload Video
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
