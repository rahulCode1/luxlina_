import { useEffect, useRef, useState } from "react";
import { privateApi } from "../../utils/axios";
import styles from "./Videoupload.module.css";

const VideoUpload = ({ productId, setError, isProdHaveVideo, revalidator }) => {
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
          `/product/${productId}/upload`,
          formData,
        );
        console.log(res.data);
      } else {
        const formData = new FormData();
        formData.append("title", videoInfo.title);
        formData.append("product", productId);
        formData.append("video", file);
        const res = await privateApi.post(
          `/product/${productId}/featureVideo`,
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
            <i className="bi bi-camera-video" />
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
            onClick={() => inputRef.current.click()}
          >
            <i className="bi bi-plus" /> Choose
          </button>
        )}
      </div>

      <div className={styles.body}>
        {/* ── Drop zone (shown when no file) ── */}
        {!file && (
          <div
            className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ""}`}
            onClick={() => inputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <i className={`bi bi-cloud-arrow-up ${styles.dzIcon}`} />
            <p className={styles.dzText}>
              <strong>Click to browse</strong> or drag &amp; drop
              <br />
              MP4, MOV, WebM · up to 2 GB
            </p>
          </div>
        )}

        {/* ── Preview (shown when file selected) ── */}
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
                aria-label="Remove video"
              >
                <i className="bi bi-x" />
              </button>
            </div>

            <div className={styles.filePill}>
              <i className="bi bi-file-earmark-play" />
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>
                {formatFileSize(file.size)}
              </span>
            </div>
          </>
        )}

        <div className={styles.divider} />

        {/* ── Video type radio cards ── */}
        <div>
          <div className={styles.sectionLabel}>Video type</div>
          <div className={styles.radioGroup}>
            {!isProdHaveVideo && (
              <label
                className={`${styles.radioCard} ${videoInfo.videoFor === "product" ? styles.radioCardChecked : ""}`}
              >
                <input
                  type="radio"
                  name="videoFor"
                  value="product"
                  checked={videoInfo.videoFor === "product"}
                  onChange={handleInfoChange}
                  className={styles.radioInput}
                />
                <i className={`bi bi-box-seam ${styles.rcIcon}`} />
                <span className={styles.rcName}>Product</span>
                <span className={styles.rcDesc}>
                  Added to the product image gallery
                </span>
              </label>
            )}

            <label
              className={`${styles.radioCard} ${videoInfo.videoFor === "features" ? styles.radioCardChecked : ""}`}
            >
              <input
                type="radio"
                name="videoFor"
                value="features"
                checked={videoInfo.videoFor === "features"}
                onChange={handleInfoChange}
                className={styles.radioInput}
              />
              <i className={`bi bi-stars ${styles.rcIcon}`} />
              <span className={styles.rcName}>Feature</span>
              <span className={styles.rcDesc}>
                Standalone feature highlight reel
              </span>
            </label>
          </div>
        </div>

        {/* ── Title input (feature only) ── */}
        {videoInfo.videoFor === "features" && (
          <div className={styles.inputWrap}>
            <label className={styles.sectionLabel} htmlFor="title">
              Video title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={styles.textInput}
              placeholder="e.g. How to use this product…"
              value={videoInfo.title}
              onChange={handleInfoChange}
            />
          </div>
        )}

        {/* ── Submit ── */}
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmitVideo}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" />
              Uploading…
            </>
          ) : (
            <>
              <i className="bi bi-cloud-arrow-up" />
              Upload Video
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
