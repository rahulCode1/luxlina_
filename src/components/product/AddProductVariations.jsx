import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-hot-toast";
import { inputFields } from "../../utils/arrays";
import { privateApi } from "../../utils/axios";

const AddProductVariations = ({ productId, setError, revalidator }) => {
  const initialFormData = {
    name: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    packQuantity: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imgPreviewUrl, setImgPreviewUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef();

  const onPickedFile = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles(files);

    const previewUrl = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImgPreviewUrl(previewUrl);
  };

  useEffect(() => {
    return () => {
      imgPreviewUrl.forEach((img) => {
        URL.revokeObjectURL(img.previewUrl);
      });
    };
  }, [imgPreviewUrl]);

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({ ...prevStat, [e.target.id]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const tostId = toast.loading("Adding product variation...");

    setIsLoading(true);
    try {
      const appendData = new FormData();
      appendData.append("name", formData.name);
      appendData.append("shortDescription", formData.shortDescription);
      appendData.append("price", formData.price);
      appendData.append("discountPrice", formData.discountPrice);
      appendData.append("length", formData.length);
      appendData.append("width", formData.width);
      appendData.append("height", formData.height);
      appendData.append("weight", formData.weight);
      appendData.append("packQuantity", formData.packQuantity);

      selectedFiles.forEach((img) => {
        appendData.append("images", img);
      });

      const res = await privateApi.patch(
        `/product/${productId}/variation/add`,
        appendData,
      );

      console.log(res.data);
      setFormData(initialFormData);
      setSelectedFiles([]);
      setImgPreviewUrl([]);
      fileInputRef.current.value = "";
      revalidator.revalidate();
      toast.success("Product variation added successfully.", { id: tostId });
    } catch (error) {
      setError(error?.response?.data?.message);

      toast.error(
        error?.response?.data?.message ||
          "An error occurred while add  product variation.",
        {
          id: tostId,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main
        className="container py-5"
        style={{ marginBottom: "5em", maxWidth: "860px" }}
      >
        {/* Page Header */}
        <div className="mb-4 pb-2 border-bottom border-2">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
              style={{
                width: "44px",
                height: "44px",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              +
            </div>
            <div>
              <h1 className="mb-0 fw-bold fs-3">Add Product Variation</h1>
              <p className="text-muted mb-0 small">
                Fill in the details to list a new product variation
              </p>
            </div>
          </div>
        </div>

        <Form onSubmit={handleFormSubmit}>
          {/* ── Section 1: Basic Info ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">1</span>
                Basic Information
              </h6>
              <div className="row g-3 mb-4">
                {inputFields.map((field) => (
                  <div className="" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="form-label fw-semibold small text-secondary text-uppercase"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="form-control form-control-lg border-2"
                      style={{ borderRadius: "10px" }}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="">
                <label
                  htmlFor="packQuantity"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Pack of Quantity
                </label>
                <input
                  type="number"
                  id="packQuantity"
                  name="packQuantity"
                  placeholder="Number of items to sell"
                  className="form-control form-control-lg border-2"
                  style={{ borderRadius: "10px" }}
                  value={formData.packQuantity}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            {/* ── Section 3:  Images ── */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
                <h6 className="mb-0 fw-semibold text-dark">
                  <span className="badge bg-primary me-2 rounded-pill">3</span>
                  Media
                </h6>
              </div>
              <div className="card-body px-4 py-4">
                {/* Image Upload */}
                <div className="mb-4">
                  <label
                    htmlFor="images"
                    className="form-label fw-semibold small text-secondary text-uppercase"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Product Images
                  </label>
                  <div
                    className="border border-2 border-dashed rounded-3 p-4 text-center"
                    style={{
                      borderColor: "#dee2e6",
                      background: "#f8f9fa",
                      cursor: "pointer",
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div
                      className="text-muted mb-1"
                      style={{ fontSize: "2rem" }}
                    >
                      🖼️
                    </div>
                    <p className="mb-1 fw-semibold text-primary">
                      Click to upload images
                    </p>
                    <p className="mb-0 text-muted small">
                      JPG, JPEG, PNG accepted · Multiple files allowed
                    </p>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      required
                      multiple
                      accept=".jpg,.png,.jpeg"
                      onChange={onPickedFile}
                      ref={fileInputRef}
                      className="form-control d-none"
                    />
                  </div>
                </div>

                {/* Image Previews — desktop */}
                <div className="d-none d-md-flex flex-row gap-3 flex-wrap">
                  {imgPreviewUrl && imgPreviewUrl.length !== 0 ? (
                    imgPreviewUrl.map((img, index) => (
                      <div key={index} className="position-relative">
                        <img
                          src={img.previewUrl}
                          className="rounded-3 shadow-sm"
                          style={{
                            width: "180px",
                            height: "180px",
                            objectFit: "cover",
                          }}
                          alt={`Preview ${index + 1}`}
                        />
                        <span
                          className="position-absolute top-0 start-0 badge bg-dark text-white m-1"
                          style={{ fontSize: "10px", borderRadius: "6px" }}
                        >
                          {index + 1}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted fst-italic small">
                      No images selected yet.
                    </p>
                  )}
                </div>

                {/* Image Previews — mobile */}
                <div className="d-md-none d-flex flex-row gap-2 flex-wrap">
                  {imgPreviewUrl && imgPreviewUrl.length !== 0 ? (
                    imgPreviewUrl.map((img, index) => (
                      <img
                        key={index}
                        src={img.previewUrl}
                        className="rounded-3 shadow-sm"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        alt={`Preview ${index + 1}`}
                      />
                    ))
                  ) : (
                    <p className="text-muted fst-italic small">
                      No images selected yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div className="d-grid mt-2">
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary btn-lg py-3 fw-semibold"
                style={{
                  borderRadius: "12px",
                  fontSize: "1.05rem",
                  letterSpacing: "0.02em",
                }}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Adding Product...
                  </>
                ) : (
                  "Add Product →"
                )}
              </button>
            </div>
          </div>
        </Form>
      </main>
    </>
  );
};

export default AddProductVariations;
