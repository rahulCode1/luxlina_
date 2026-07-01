import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import Loading from "../Loading";
import { privateApi } from "../../utils/axios";

import {
  inputFields,
  ratingField,
  seoInputs,
  materialTypeField,
  categoryField,
} from "../../utils/arrays";

const UpdateProduct = ({ product }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initialFormData = {
    name: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    rating: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    materialType: "",
    care: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  };

 

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({ ...prevStat, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await privateApi.patch(`/product/${product.id}`, formData);
      console.log(res.data);

      return navigate(`/products/${product.id}`);
    } catch (error) {
      console.log(error.response?.data?.message);
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
              <h1 className="mb-0 fw-bold fs-3">Update Product</h1>
              <p className="text-muted mb-0 small">
                Fill in the details to update product
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="overlay">
            <Loading />
          </div>
        )}

        {error && <ErrorModal message={error} onClose={() => setError(null)} />}

        <Form onSubmit={handleFormSubmit}>
          {/* ── Section 1: Basic Info ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">1</span>
                Basic Information
              </h6>
            </div>
            <div className="card-body px-4 py-4">
              {/* Text input fields */}
              <div className="row g-3 mb-4">
                {inputFields.map((field) => (
                  <div className="col-md-6" key={field.id}>
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

              {/* Rating */}
              <div className="mb-3">
                <label
                  htmlFor={ratingField.id}
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {ratingField.label}
                </label>
                <select
                  id={ratingField.id}
                  name={ratingField.name}
                  className="form-select form-select-lg border-2"
                  style={{ borderRadius: "10px" }}
                  value={formData[ratingField.name]}
                  onChange={handleOnChange}
                >
                  <option value="" disabled>
                    {ratingField.placeholder}
                  </option>
                  {ratingField.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Section 2: Classification ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">2</span>
                Classification
              </h6>
            </div>
            <div className="card-body px-4 py-4">
              <div className="row g-3">
                {[materialTypeField, categoryField].map((field) => (
                  <div className="col-md-6" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="form-label fw-semibold small text-secondary text-uppercase"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {field.label}
                    </label>
                    <select
                      id={field.id}
                      name={field.name}
                      className="form-select form-select-lg border-2"
                      style={{ borderRadius: "10px" }}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      required
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section 3: Care & Images ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">3</span>
                Care & Media
              </h6>
            </div>
            <div className="card-body px-4 py-4">
              {/* Care Instructions */}
              <div className="mb-4">
                <label
                  htmlFor="care"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Care Instructions
                </label>
                <textarea
                  id="care"
                  name="care"
                  className="form-control border-2"
                  style={{ borderRadius: "10px", resize: "vertical" }}
                  rows={5}
                  required
                  value={formData.care}
                  placeholder="Enter product care instructions (comma separated)"
                  onChange={handleOnChange}
                />
                <div className="form-text">
                  Separate multiple instructions with commas.
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 4: SEO ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0 fw-semibold text-dark">
                  <span className="badge bg-primary me-2 rounded-pill">4</span>
                  SEO Information
                </h6>
                <span className="badge bg-success-subtle text-success border border-success-subtle small">
                  Boost visibility
                </span>
              </div>
            </div>
            <div className="card-body px-4 py-4">
              <div className="row g-3 mb-4">
                {seoInputs.map((field) => (
                  <div className="col-md-12" key={field.id}>
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
                      className="form-control border-2"
                      style={{ borderRadius: "10px" }}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Meta Description */}
              <div className="mb-2">
                <label
                  htmlFor="metaDescription"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  className="form-control border-2"
                  style={{ borderRadius: "10px", resize: "none" }}
                  rows="3"
                  placeholder="Enter SEO description (max 160 characters)"
                  maxLength="160"
                  required
                  onChange={handleOnChange}
                  value={formData.metaDescription}
                />
                <div className="d-flex justify-content-between form-text mt-1">
                  <span>
                    Recommended: 120–160 characters for best SEO results.
                  </span>
                  <span
                    className={`fw-semibold ${
                      (formData.metaDescription?.length || 0) > 140
                        ? "text-danger"
                        : "text-muted"
                    }`}
                  >
                    {formData.metaDescription?.length || 0}/160
                  </span>
                </div>
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
                  Updating...
                </>
              ) : (
                "✎ Update Product "
              )}
            </button>
          </div>
        </Form>
      </main>
    </>
  );
};

export default UpdateProduct;
