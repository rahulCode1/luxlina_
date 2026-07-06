import CategoryFilter from "../../../components/CategoryFilter";

const ProductFilters = ({
  searchParams,
  setSearchParams,
  productCategory,
  handleClearFilter,
  changePrice,
  setChangePrice,
  productRating,
  setProductRating,
  sortBy,
  setSortBy,
  category,
  setCategory,
}) => {
  const ratingArr = [
    { name: "4 Stars & Above", value: 4, id: "4star", radioName: "rating" },
    { name: "3 Stars & Above", value: 3, id: "3star", radioName: "rating" },
    { name: "2 Stars & Above", value: 2, id: "2star", radioName: "rating" },
    { name: "1 Stars & Above", value: 1, id: "1star", radioName: "rating" },
  ];

  return (
    <>
      {/* ══════════════════════════════
        MOBILE: Offcanvas filter panel
    ══════════════════════════════ */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasResponsive"
        style={{ maxWidth: 320 }}
      >
        <div
          className="offcanvas-header px-4 py-3"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            borderBottom: "1px solid #ede9fe",
          }}
        >
          <h6 className="fw-bold text-white mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-funnel-fill"></i> Filters
          </h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body p-0" style={{ background: "#fafafa" }}>
          <div className="p-4">
            {/* Clear All */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <span
                className="text-muted small fw-semibold text-uppercase"
                style={{ letterSpacing: "0.6px" }}
              >
                Active Filters
              </span>
              <button
                onClick={handleClearFilter}
                className="btn btn-sm fw-semibold"
                style={{
                  border: "1.5px solid #ef4444",
                  color: "#ef4444",
                  borderRadius: 8,
                  background: "transparent",
                  fontSize: "0.75rem",
                }}
              >
                <i className="bi bi-x-circle me-1"></i>Clear All
              </button>
            </div>

            {/* Price Range */}
            <div
              className="p-3 rounded-3 mb-3"
              style={{ background: "#fff", border: "1px solid #ede9fe" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <label
                  htmlFor="range-mobile"
                  className="form-label fw-bold mb-0 small d-flex align-items-center gap-1"
                  style={{ color: "#4f46e5" }}
                >
                  <i className="bi bi-currency-rupee"></i> Price
                </label>
                <span
                  className="badge rounded-pill fw-bold"
                  style={{
                    background: "#ede9fe",
                    color: "#4f46e5",
                    fontSize: "0.78rem",
                  }}
                >
                  ₹{changePrice}
                </span>
              </div>
              <input
                type="range"
                step={50}
                min={0}
                max={5000}
                onChange={(e) => setChangePrice(Number(e.target.value))}
                value={changePrice}
                className="form-range"
                id="range-mobile"
              />
              <div className="d-flex justify-content-between mt-1">
                <small className="text-muted">₹0</small>
                <small className="text-muted">₹5000</small>
              </div>
            </div>

            {/* Category */}
            <div
              className="p-3 rounded-3 mb-3"
              style={{ background: "#fff", border: "1px solid #ede9fe" }}
            >
              <p
                className="fw-bold small mb-2 d-flex align-items-center gap-1"
                style={{ color: "#4f46e5" }}
              >
                <i className="bi bi-grid-fill"></i> Category
              </p>
              <CategoryFilter
                setCategory={setCategory}
                filterCategory={category}
                productCategory={productCategory}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>

            {/* Rating */}
            <div
              className="p-3 rounded-3 mb-3"
              style={{ background: "#fff", border: "1px solid #ede9fe" }}
            >
              <p
                className="fw-bold small mb-2 d-flex align-items-center gap-1"
                style={{ color: "#4f46e5" }}
              >
                <i className="bi bi-star-fill"></i> Rating
              </p>
              {ratingArr.map((rating) => (
                <div className="form-check mb-1" key={rating.id}>
                  <input
                    type="radio"
                    id={rating.id}
                    name={rating.radioName}
                    value={rating.value}
                    checked={Math.floor(rating.value) === productRating}
                    onChange={(e) => setProductRating(Number(e.target.value))}
                    className="form-check-input"
                    style={{ accentColor: "#4f46e5" }}
                  />
                  <label className="form-check-label small" htmlFor={rating.id}>
                    {rating.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Sort */}
            <div
              className="p-3 rounded-3"
              style={{ background: "#fff", border: "1px solid #ede9fe" }}
            >
              <p
                className="fw-bold small mb-2 d-flex align-items-center gap-1"
                style={{ color: "#4f46e5" }}
              >
                <i className="bi bi-sort-down"></i> Sort By
              </p>
              <div className="form-check mb-1">
                <input
                  type="radio"
                  value={"HighToLow"}
                  checked={sortBy === "HighToLow"}
                  id="HighToLow-mobile"
                  className="form-check-input"
                  name="sort-mobile"
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ accentColor: "#4f46e5" }}
                />
                <label
                  className="form-check-label small"
                  htmlFor="HighToLow-mobile"
                >
                  Price: High to Low
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  checked={sortBy === "LowToHigh"}
                  id="LowToHigh-mobile"
                  value={"LowToHigh"}
                  className="form-check-input"
                  name="sort-mobile"
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ accentColor: "#4f46e5" }}
                />
                <label
                  className="form-check-label small"
                  htmlFor="LowToHigh-mobile"
                >
                  Price: Low to High
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
        DESKTOP: Sidebar filter panel
    ══════════════════════════════ */}

      <div
        className="col-md-3 d-none d-md-block"
        style={{ background: "#fff", borderRight: "1px solid #ede9fe" }}
      >
        <section className="p-4 sticky-top" style={{ top: 20 }}>
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-2"
                style={{ width: 28, height: 28, background: "#ede9fe" }}
              >
                <i
                  className="bi bi-funnel-fill"
                  style={{ fontSize: 13, color: "#4f46e5" }}
                ></i>
              </div>
              <span
                className="fw-bold text-uppercase"
                style={{
                  letterSpacing: "0.8px",
                  fontSize: "0.8rem",
                  color: "#1e1b4b",
                }}
              >
                Filters
              </span>
            </div>
            <button
              onClick={handleClearFilter}
              className="btn btn-sm fw-semibold"
              style={{
                border: "1.5px solid #ef4444",
                color: "#ef4444",
                borderRadius: 8,
                background: "transparent",
                fontSize: "0.72rem",
              }}
            >
             Clear
            </button>
          </div>

          {/* Price Range */}
          <div
            className="p-3 rounded-3 mb-3"
            style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <label
                htmlFor="range-desktop"
                className="form-label fw-bold mb-0 small d-flex align-items-center gap-1"
                style={{ color: "#4f46e5" }}
              >
                <i className="bi bi-currency-rupee"></i> Price
              </label>
              <span
                className="badge rounded-pill fw-bold"
                style={{
                  background: "#ede9fe",
                  color: "#4f46e5",
                  fontSize: "0.78rem",
                }}
              >
                ₹{changePrice}
              </span>
            </div>
            <input
              type="range"
              step={50}
              min={0}
              max={5000}
              onChange={(e) => setChangePrice(Number(e.target.value))}
              value={changePrice}
              className="form-range"
              id="range-desktop"
            />
            <div className="d-flex justify-content-between mt-1">
              <small className="text-muted">₹0</small>
              <small className="text-muted">₹5000</small>
            </div>
          </div>

          {/* Category */}
          <div
            className="p-3 rounded-3 mb-3"
            style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
          >
            <p
              className="fw-bold small mb-2 d-flex align-items-center gap-1"
              style={{ color: "#4f46e5" }}
            >
              <i className="bi bi-grid-fill"></i> Category
            </p>
            <CategoryFilter
              setCategory={setCategory}
              filterCategory={category}
            />
          </div>

          {/* Rating */}
          <div
            className="p-3 rounded-3 mb-3"
            style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
          >
            <p
              className="fw-bold small mb-2 d-flex align-items-center gap-1"
              style={{ color: "#4f46e5" }}
            >
              <i className="bi bi-star-fill"></i> Rating
            </p>
            {ratingArr.map((rating) => (
              <div className="form-check mb-1" key={rating.id}>
                <input
                  type="radio"
                  id={rating.id}
                  name={rating.radioName}
                  value={rating.value}
                  checked={rating.value === Number(productRating)}
                  onChange={(e) => setProductRating(e.target.value)}
                  className="form-check-input"
                  style={{ accentColor: "#4f46e5" }}
                />
                <label className="form-check-label small" htmlFor={rating.id}>
                  {rating.name}
                </label>
              </div>
            ))}
          </div>

          {/* Sort */}
          <div
            className="p-3 rounded-3"
            style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
          >
            <p
              className="fw-bold small mb-2 d-flex align-items-center gap-1"
              style={{ color: "#4f46e5" }}
            >
              <i className="bi bi-sort-down"></i> Sort By
            </p>
            <div className="form-check mb-1">
              <input
                type="radio"
                value={"HighToLow"}
                checked={sortBy === "HighToLow"}
                id="HighToLow-desktop"
                className="form-check-input"
                name="sort-desktop"
                onChange={(e) => setSortBy(e.target.value)}
                style={{ accentColor: "#4f46e5" }}
              />
              <label
                className="form-check-label small"
                htmlFor="HighToLow-desktop"
              >
                Price: High to Low
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                checked={sortBy === "LowToHigh"}
                id="LowToHigh-desktop"
                value={"LowToHigh"}
                className="form-check-input"
                name="sort-desktop"
                onChange={(e) => setSortBy(e.target.value)}
                style={{ accentColor: "#4f46e5" }}
              />
              <label
                className="form-check-label small"
                htmlFor="LowToHigh-desktop"
              >
                Price: Low to High
              </label>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductFilters;
