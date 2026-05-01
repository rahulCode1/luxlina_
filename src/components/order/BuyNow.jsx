import { fetchUserAddressAsync } from "../../features/address/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { privateApi } from "../../utils/axios";
import ErrorModal from "../ErrorModal";

const BuyNow = ({ info }) => {
  const { address } = useSelector((state) => state.address);
  const [payment, setPayment] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const goTo = location.state?.from;

 

  const totalQuantity = info?.quantity;
  const totalPrice =
    Number(info?.product.discountPrice) * Number(info?.quantity);
  const totalDiscount =
    (info?.product.price - info?.product.discountPrice) *
    Number(info?.quantity);
  const finalTotal =
    Number(info?.product.discountPrice) * Number(info?.quantity);
  const discountPct = Math.round(
    ((info?.product.price - info?.product.discountPrice) /
      info?.product.price) *
      100,
  );

  const selectedAddress =
    address &&
    address.length > 0 &&
    address.find((addr) => addr.isDefault === true);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      return navigate("/login");
    }

    if (!address || address.length === 0 || !selectedAddress) {
      return navigate("/address/addAddress", { state: { from: "/buyNow" } });
    }

    const toastId = toast.loading("Placing your order...");

    try {
      setIsLoading(true);

      const order = {
        address: selectedAddress.id,
        summary: { totalPrice, totalDiscount, totalQuantity },
        paymentMethod: payment,
      };

      if (payment === "ONLINE") {
        const { data } = await privateApi.post(`/order/create-order`, {
          amount: totalPrice,
        });

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "It's Handicrafted",
          order_id: data.id,
          method: { upi: true },
          handler: async function (response) {
            const { data } = await privateApi.post(
              `/order/placeOrderViaBuyNow`,
              { ...response, ...order },
            );
            toast.success(data?.message || "Order placed successfully!", {
              id: toastId,
            });
            navigate(`/orders/${data?.orderId}`);
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        const { data } = await privateApi.post(
          `/order/placeOrderViaBuyNow`,
          order,
        );

        if (window.fbq) {
          window.fbq("track", "Purchase", {
            value: totalPrice,
            currency: "INR",
            content_ids: info?.product?.id,
            content_type: "product",
          });
        }

        toast.success(data?.message || "Order placed successfully!", {
          id: toastId,
        });

        console.log(data);

        navigate(`/orders/${data?.orderId}`);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Something went wrong while placing your order.";
      setError(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUserAddressAsync());
  }, [dispatch]);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="bg-dark text-white d-flex align-items-center gap-2 px-3 py-2 border-bottom border-secondary">
        <i className="bi bi-bag-heart-fill text-warning"></i>
        <span className="fw-semibold small">It's Handicrafted</span>
        <span className="vr mx-1 opacity-25"></span>
        <span className="text-white-50 small">Secure Checkout</span>
        <i className="bi bi-shield-lock-fill text-success ms-auto small"></i>
      </div>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <div
        className="bg-light min-vh-100 py-3 pb-5"
        style={{ marginBottom: "5em" }}
      >
        <div className="container" style={{ maxWidth: 540 }}>
          {goTo && (
            <Link
              to={goTo}
              style={{
                padding: "6px 15px",
                marginBottom: "15px",
                display: "inline-block",
              }}
              className="text-light rounded bg-dark text-decoration-none"
            >
              <i className="bi bi-arrow-left"></i> Back
            </Link>
          )}

          {/* Page heading */}
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-cart-check text-primary"></i>
            Review &amp; Place Order
          </h5>

          {/* ════════════════════════════
              CARD 1 — Order Summary
          ════════════════════════════ */}
          <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
              <i className="bi bi-box-seam text-primary"></i>
              <span className="fw-semibold text-dark">Order Summary</span>
              <span
                className="badge bg-primary-subtle text-primary rounded-pill ms-auto"
                style={{ fontSize: "0.7rem" }}
              >
                {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              </span>
            </div>

            <div className="card-body px-4 py-3">
              {/* Product row */}
              <Link
                to={`/products/${info.product._id}`}
                className="text-decoration-none"
              >
                <div className="d-flex gap-3 align-items-start">
                  <img
                    src={info.product.images[0].url}
                    alt={info.product.name}
                    className="rounded-3 border flex-shrink-0"
                    style={{ width: 88, height: 88, objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <p
                      className="fw-semibold text-dark mb-1 lh-sm"
                      style={{ fontSize: "0.92rem" }}
                    >
                      {info.product.name}
                    </p>

                    <div className="d-flex flex-wrap gap-1 mb-2">
                      <span
                        className="badge bg-secondary-subtle text-secondary rounded-pill"
                        style={{ fontSize: "0.68rem" }}
                      >
                        {info.product.category}
                      </span>
                      <span
                        className="badge bg-light text-muted border rounded-pill"
                        style={{ fontSize: "0.68rem" }}
                      >
                        <i className="bi bi-layers me-1"></i>Qty:{" "}
                        {info.quantity}
                      </span>
                      {discountPct > 0 && (
                        <span
                          className="badge bg-success-subtle text-success rounded-pill"
                          style={{ fontSize: "0.68rem" }}
                        >
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    <div className="d-flex align-items-baseline gap-2">
                      <span className="fw-bold fs-6 text-dark">
                        ₹{info.product.discountPrice}
                      </span>
                      <span className="text-decoration-line-through text-muted small">
                        ₹{info.product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <hr className="my-3" />

              {/* Price breakdown */}
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between small text-muted">
                  <span>
                    MRP ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                  </span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Discount</span>
                  <span className="text-success fw-medium">
                    − ₹{totalDiscount}
                  </span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Delivery Charges</span>
                  {payment === "ONLINE" ? (
                    <span className="text-success fw-medium">
                      <i className="bi bi-truck me-1"></i>FREE
                    </span>
                  ) : (
                    <span className="text-warning fw-medium">
                      <i className="bi bi-truck me-1"></i>+ ₹60
                    </span>
                  )}
                </div>
                <hr className="my-1" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark">Total Payable</span>
                  <span className="fw-bold fs-5 text-dark">
                    ₹{payment === "ONLINE" ? finalTotal : finalTotal + 60}
                  </span>
                </div>
              </div>

              {totalDiscount > 0 && (
                <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-0 mt-3 rounded-3 small">
                  <i className="bi bi-piggy-bank-fill fs-5"></i>
                  You're saving{" "}
                  <strong className="ms-1">₹{totalDiscount}</strong> on this
                  order!
                </div>
              )}
            </div>
          </div>

          {/* ════════════════════════════
              CARD 2 — Delivery Address  (RESTYLED)
          ════════════════════════════ */}
          <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            {/* Header */}
            <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span
                className="fw-semibold text-dark"
                style={{ fontSize: "0.92rem" }}
              >
                Delivery Address
              </span>
              {/* Always-visible Add New button in header */}
              <Link
                to="/address/addAddress"
                state={{ from: "/buyNow" }}
                className="btn btn-outline-primary btn-sm rounded-3 fw-semibold ms-auto d-flex align-items-center gap-1"
                style={{ fontSize: "0.72rem", padding: "5px 10px" }}
              >
                <i className="bi bi-plus-lg"></i> Add new
              </Link>
            </div>

            <div className="card-body px-4 py-3">
              {selectedAddress ? (
                <>
                  {/* ── Existing default address block ── */}
                  <div
                    className="rounded-3 p-3"
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {/* Name + Default badge */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span
                        className="fw-semibold text-dark"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {selectedAddress.name}
                      </span>
                      {selectedAddress.isDefault && (
                        <span
                          className="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill d-flex align-items-center gap-1"
                          style={{ fontSize: "0.65rem" }}
                        >
                          <i className="bi bi-patch-check-fill"></i> Default
                        </span>
                      )}
                    </div>

                    {/* Detail rows */}
                    <div className="d-flex flex-column gap-2 mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="bi bi-telephone-fill text-muted flex-shrink-0"
                          style={{ fontSize: "0.82rem" }}
                        ></i>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.82rem" }}
                        >
                          {selectedAddress.phoneNumber}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="bi bi-mailbox text-muted flex-shrink-0"
                          style={{ fontSize: "0.82rem" }}
                        ></i>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.82rem" }}
                        >
                          {selectedAddress.zipCode}
                        </span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i
                          className="bi bi-house-fill text-muted flex-shrink-0 mt-1"
                          style={{ fontSize: "0.82rem" }}
                        ></i>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
                        >
                          {selectedAddress.fullAddress}
                          {selectedAddress.area &&
                            `, ${selectedAddress.area}`}, {selectedAddress.city}
                          , {selectedAddress.state}
                        </span>
                      </div>
                    </div>

                    {/* ── Action buttons — clearly recognisable ── */}
                    <div className="d-flex gap-2">
                      <Link
                        to={`/address/${selectedAddress.id}`}
                        state={{ from: "/buyNow" }}
                        className="btn btn-primary btn-sm flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1 fw-medium"
                        style={{ fontSize: "0.8rem", padding: "8px 12px" }}
                      >
                        <i className="bi bi-pencil-fill"></i> Edit
                      </Link>
                    </div>
                  </div>

                  {/* ── Divider with label — clear separation ── */}
                  <div className="d-flex align-items-center gap-2 my-3">
                    <hr
                      className="flex-grow-1 my-0"
                      style={{ borderColor: "#e5e7eb" }}
                    />
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.72rem", whiteSpace: "nowrap" }}
                    >
                      or deliver to a different address
                    </span>
                    <hr
                      className="flex-grow-1 my-0"
                      style={{ borderColor: "#e5e7eb" }}
                    />
                  </div>

                  {/* ── Add New — solid button, unmistakably clickable ── */}
                  <Link
                    to="/address/addAddress"
                    state={{ from: "/buyNow" }}
                    className="btn btn-outline-primary w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium"
                    style={{ fontSize: "0.85rem", padding: "10px" }}
                  >
                    <i className="bi bi-plus-circle-fill"></i>
                    Add a new delivery address
                  </Link>

                  {/* Switch address — only if multiple saved addresses exist */}
                  {address.length > 1 && (
                    <Link
                      to="/address"
                      state={{ from: "/buyNow" }}
                      className="btn btn-outline-secondary w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium mt-2"
                      style={{ fontSize: "0.85rem", padding: "10px" }}
                    >
                      <i className="bi bi-arrow-left-right"></i>
                      Switch to another saved address
                    </Link>
                  )}
                </>
              ) : (
                /* ── No address state ── */
                <div className="text-center py-4">
                  <i
                    className="bi bi-geo-alt text-muted d-block mb-2"
                    style={{ fontSize: "2.5rem", opacity: 0.3 }}
                  ></i>
                  <p className="text-muted small mb-3">
                    No delivery address found
                  </p>
                  <Link
                    to="/address/addAddress"
                    state={{ from: "/buyNow" }}
                    className="btn btn-primary btn-sm rounded-pill px-4 d-inline-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-circle-fill"></i> Add Address
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ════════════════════════════
              CARD 3 — Payment Method  (RESTYLED)
          ════════════════════════════ */}
          <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
            <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
              <i className="bi bi-wallet2 text-success"></i>
              <span className="fw-semibold text-dark">Payment Method</span>
              <span
                className="badge bg-success-subtle text-success border border-success border-opacity-25 rounded-pill ms-auto"
                style={{ fontSize: "0.65rem" }}
              >
                Save ₹60 online
              </span>
            </div>

            <div className="card-body px-4 py-3">
              <div className="d-flex flex-column gap-2">
                {/* ── Pay Online ── */}
                {/* <label
                  className={`d-flex align-items-start gap-3 p-3 rounded-3 border ${
                    payment === "ONLINE"
                      ? "border-primary bg-primary bg-opacity-10"
                      : "border bg-light"
                  }`}
                  style={{ cursor: "pointer", transition: "all 0.15s" }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={payment === "ONLINE"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="form-check-input mt-1 flex-shrink-0"
                  />
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 bg-primary bg-opacity-10"
                    style={{ width: 34, height: 34 }}
                  >
                    <i
                      className="bi bi-lightning-charge-fill text-primary"
                      style={{ fontSize: 15 }}
                    ></i>
                  </div>
                  <div className="flex-grow-1">
                     
                    <p
                      className="fw-semibold mb-1 text-dark d-flex align-items-center flex-wrap gap-2"
                      style={{ fontSize: "0.88rem" }}
                    >
                      Pay Online
                      <span
                        className="badge bg-success-subtle text-success rounded-pill"
                        style={{ fontSize: "0.65rem", fontWeight: 500 }}
                      >
                        FREE delivery
                      </span>
                    </p>
                   
                    <div className="d-flex flex-wrap gap-1 align-items-center">
                  
                      <span
                        className="px-2 py-1 rounded-2 border fw-bold"
                        style={{
                          fontSize: "0.65rem",
                          background: "#fff",
                          color: "#5f259f",
                          borderColor: "#d4b8ec",
                          letterSpacing: "0.02em",
                        }}
                      >
                        UPI
                      </span>
                    
                      <span
                        className="px-2 py-1 rounded-2 border fw-bold"
                        style={{
                          fontSize: "0.65rem",
                          background: "#fff",
                          color: "#1a1f71",
                          borderColor: "#c0c4e0",
                          letterSpacing: "0.03em",
                        }}
                      >
                        VISA
                      </span>
                    
                      <span
                        className="px-2 py-1 rounded-2 border d-inline-flex align-items-center"
                        style={{
                          fontSize: "0.65rem",
                          background: "#fff",
                          borderColor: "#e5d0c8",
                          gap: "1px",
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#eb001b",
                            display: "inline-block",
                          }}
                        ></span>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#f79e1b",
                            display: "inline-block",
                            marginLeft: -4,
                            opacity: 0.9,
                          }}
                        ></span>
                      </span>
                     
                      <span
                        className="px-2 py-1 rounded-2 border fw-medium"
                        style={{
                          fontSize: "0.65rem",
                          background: "#fff",
                          color: "#1b6b38",
                          borderColor: "#b8ddc5",
                        }}
                      >
                        Net Banking
                      </span>
                    </div>
                  </div>
                </label> */}

                {/* ── Cash on Delivery ── */}
                <label
                  className={`d-flex align-items-center gap-3 p-3 rounded-3 border ${
                    payment === "COD"
                      ? "border-warning bg-warning bg-opacity-10"
                      : "border bg-light"
                  }`}
                  style={{ cursor: "pointer", transition: "all 0.15s" }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={payment === "COD"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="form-check-input mt-0 flex-shrink-0"
                  />
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 bg-warning bg-opacity-10"
                    style={{ width: 34, height: 34 }}
                  >
                    <i
                      className="bi bi-cash-coin text-warning"
                      style={{ fontSize: 15 }}
                    ></i>
                  </div>
                  <div>
                    <p
                      className="fw-semibold mb-0 text-dark"
                      style={{ fontSize: "0.88rem" }}
                    >
                      Cash on Delivery
                    </p>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.72rem" }}
                    >
                      Pay when your order arrives ·{" "}
                      <span className="text-warning fw-medium">
                        +₹60 charge
                      </span>
                    </small>
                  </div>
                </label>
              </div>

              <p
                className="text-muted d-flex align-items-center gap-1 mt-3 mb-0"
                style={{ fontSize: "0.72rem" }}
              >
                <i className="bi bi-info-circle text-primary"></i>
                More payment options (UPI, Cards) coming soon.
              </p>
            </div>
          </div>

          {/* ── Place Order Button ── */}
          <div className="d-grid mb-2">
            <button
              onClick={handleSubmitOrder}
              disabled={isLoading}
              className="btn btn-dark fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: "1rem", letterSpacing: "0.02em" }}
            >
              {isLoading ? (
                <>
                  Placing Order…{" "}
                  <span className="spinner-border spinner-border-sm" />
                </>
              ) : (
                <>
                  <i className="bi bi-bag-check-fill text-warning"></i>
                  Place Order &nbsp;·&nbsp; ₹
                  {payment === "ONLINE" ? finalTotal : finalTotal + 60}
                </>
              )}
            </button>
          </div>

          {/* Secure note */}
          <p
            className="text-center text-muted d-flex align-items-center justify-content-center gap-1 mb-0"
            style={{ fontSize: "0.72rem" }}
          >
            <i className="bi bi-shield-lock-fill text-success"></i>
            100% Secure &amp; Trusted Checkout
          </p>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
