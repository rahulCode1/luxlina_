import { Link, useSearchParams } from "react-router-dom";
import styles from "./UsersOrder.module.css";

const AllOrders = ({ orders }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let filteredOrders = searchParams.get("payment")
    ? orders.filter(
        (order) => order?.paymentStatus === searchParams.get("payment"),
      )
    : orders;

  filteredOrders = searchParams.get("orderStatus")
    ? filteredOrders.filter(
        (order) => order?.orderStatus === searchParams.get("orderStatus"),
      )
    : filteredOrders;

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "warning",
      completed: "success",
      failed: "danger",
      refunded: "info",
      confirmed: "primary",
      shipped: "info",
      delivered: "success",
      cancelled: "danger",
    };
    return statusColors[status] || "secondary";
  };

  const onChangeParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  return (
    <main className="container py-5">
      <h1 className="mb-5">Admin Panel </h1>

      <div className="mb-3">
        <label htmlFor="payment">Payment Status</label>
        <select
          id="payment"
          onChange={(e) => onChangeParams("payment", e.target.value)}
          className="form-select"
        >
          <option value="">All </option>
          <option value="pending">COD </option>
          <option value="completed">Paid </option>
          <option value="refunded">Refunded </option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="orderStatus">Order Status </label>
        <select
          id="orderStatus"
          onChange={(e) => onChangeParams("orderStatus", e.target.value)}
          className="form-select"
        >
          <option value="">All </option>
          <option value="accepted">Accepted </option>
          <option value="dispatched">Dispatched </option>
          <option value="out">Out of Delivery </option>
          <option value="cancelled">Cancelled </option>
        </select>
      </div>

      {filteredOrders && filteredOrders.length > 0 ? (
        <div className="d-flex flex-column gap-4">
          {filteredOrders.map((order, index) => (
            <Link
              to={`/orders/${order.id}`}
              state={{ from: "/admin" }}
              key={index}
              className="text-decoration-none text-reset"
            >
              <div
                key={order._id || index}
                className="card border-0 overflow-hidden pb-2"
                style={{
                  borderRadius: 16,
                  boxShadow:
                    "0 4px 14px -2px rgba(79,70,229,0.09), 0 2px 6px -1px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* Card Header */}
                <div
                  className="card-header border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    padding: "clamp(10px, 2vw, 16px) clamp(14px, 3vw, 22px)",
                  }}
                >
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <div>
                      <div
                        className="fw-bold text-white"
                        style={{
                          fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                          letterSpacing: "-0.3px",
                        }}
                      >
                        Order #{index + 1}
                      </div>
                      <small
                        className="text-white"
                        style={{
                          opacity: 0.82,
                          fontSize: "clamp(0.68rem, 1.8vw, 0.78rem)",
                        }}
                      >
                        <i className="bi bi-calendar3 me-1"></i>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </small>
                    </div>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <span
                        className={`badge px-3 py-2 rounded-pill fw-semibold bg-${getStatusBadge(order.paymentStatus)}`}
                        style={{ fontSize: "clamp(0.62rem, 1.8vw, 0.74rem)" }}
                      >
                        <i className="bi bi-credit-card me-1"></i>Payment:{" "}
                        {order.paymentStatus}
                      </span>
                      <span
                        className="badge px-3 py-2 rounded-pill fw-semibold"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          color: "#fff",
                          fontSize: "clamp(0.62rem, 1.8vw, 0.74rem)",
                        }}
                      >
                        <i className="bi bi-truck me-1"></i>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-0">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                    }}
                    className={styles.orderBodyGrid}
                  >
                    {/* Products Table */}
                    <div
                      style={{
                        padding:
                          "clamp(14px, 2.5vw, 22px) clamp(12px, 3vw, 22px)",
                      }}
                    >
                      <h6
                        className="fw-bold mb-3 d-flex align-items-center gap-2"
                        style={{
                          color: "#4f46e5",
                          fontSize: "clamp(0.78rem, 2vw, 0.88rem)",
                        }}
                      >
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-2"
                          style={{
                            width: 24,
                            height: 24,
                            background: "#ede9fe",
                          }}
                        >
                          <i
                            className="bi bi-box-seam"
                            style={{ fontSize: 11, color: "#4f46e5" }}
                          ></i>
                        </span>
                        Order Items
                        <span
                          className="badge rounded-pill ms-1"
                          style={{
                            background: "#ede9fe",
                            color: "#4f46e5",
                            fontWeight: 600,
                            fontSize: "0.68rem",
                          }}
                        >
                          {order.products.length}
                        </span>
                      </h6>

                      <div
                        className="table-responsive"
                        style={{
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "1px solid #e8e4ff",
                        }}
                      >
                        <table
                          className="table align-middle mb-0"
                          style={{
                            fontSize: "clamp(0.72rem, 1.8vw, 0.855rem)",
                          }}
                        >
                          <thead style={{ background: "#f5f3ff" }}>
                            <tr>
                              <th
                                className="py-2 px-3 fw-semibold"
                                style={{
                                  color: "#4f46e5",
                                  borderBottom: "1px solid #e8e4ff",
                                }}
                              >
                                Product
                              </th>
                              <th
                                className="py-2 px-3 fw-semibold text-center"
                                style={{
                                  color: "#4f46e5",
                                  borderBottom: "1px solid #e8e4ff",
                                }}
                              >
                                Qty
                              </th>
                              <th
                                className="py-2 px-3 fw-semibold text-end"
                                style={{
                                  color: "#4f46e5",
                                  borderBottom: "1px solid #e8e4ff",
                                }}
                              >
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order?.products.map((product, pIndex) => (
                              <tr
                                key={pIndex}
                                style={{ borderBottom: "1px solid #f5f3ff" }}
                              >
                                <td className="py-2 px-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={product?.images[0]?.url}
                                      alt={product.name}
                                      className="rounded-2 flex-shrink-0"
                                      style={{
                                        width: "clamp(36px, 5vw, 48px)",
                                        height: "clamp(36px, 5vw, 48px)",
                                        objectFit: "cover",
                                        border: "2px solid #ede9fe",
                                      }}
                                    />

                                    <div>
                                      <div
                                        className="fw-semibold"
                                        style={{
                                          color: "#1e1b4b",
                                          fontSize:
                                            "clamp(0.7rem, 1.7vw, 0.8rem)",
                                          lineHeight: 1.3,
                                        }}
                                      >
                                        {product.name}
                                      </div>
                                      <small className="text-muted">
                                        {product.materialType}
                                      </small>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background: "#ede9fe",
                                      color: "#4f46e5",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {product.quantity}
                                  </span>
                                </td>
                                <td
                                  className="py-2 px-3 text-end fw-bold"
                                  style={{ color: "#4f46e5" }}
                                >
                                  ₹{product.discountPrice.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary + CTA */}
                    <div
                      style={{
                        padding:
                          "clamp(14px, 2.5vw, 22px) clamp(12px, 3vw, 22px)",
                      }}
                    >
                      <div className="card border rounded-3 h-100">
                        <div className="card-header bg-white border-bottom px-3 py-2 d-flex align-items-center gap-2">
                          <i
                            className="bi bi-receipt text-primary"
                            style={{ fontSize: 14 }}
                          ></i>
                          <span
                            className="fw-semibold text-dark"
                            style={{ fontSize: "0.88rem" }}
                          >
                            Order Summary
                          </span>
                        </div>

                        <div className="card-body p-3 d-flex flex-column gap-2">
                          {/* Total Items */}
                          <div
                            className="d-flex justify-content-between align-items-center py-1 border-bottom"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <span className="text-muted d-flex align-items-center gap-2">
                              <i
                                className="bi bi-stack text-primary"
                                style={{ fontSize: 13 }}
                              ></i>
                              Total Items
                            </span>
                            <span className="fw-semibold text-dark">
                              {order.summary.totalQuantity}
                            </span>
                          </div>

                          {/* MRP */}
                          <div
                            className="d-flex justify-content-between align-items-center py-1 border-bottom"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <span className="text-muted d-flex align-items-center gap-2">
                              <i
                                className="bi bi-tag text-primary"
                                style={{ fontSize: 13 }}
                              ></i>
                              MRP
                            </span>
                            <span className="fw-semibold text-dark">
                              ₹{order.summary.totalPrice}
                            </span>
                          </div>

                          {/* Delivery */}
                          <div
                            className="d-flex justify-content-between align-items-center py-1 border-bottom"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <span className="text-muted d-flex align-items-center gap-2">
                              <i
                                className="bi bi-truck text-primary"
                                style={{ fontSize: 13 }}
                              ></i>
                              Delivery
                            </span>
                            {order.paymentMethod === "COD" ? (
                              <span className="fw-semibold text-warning">
                                + ₹60
                              </span>
                            ) : (
                              <span className="fw-semibold text-success">
                                FREE
                              </span>
                            )}
                          </div>

                          {/* Total */}
                          <div
                            className="d-flex justify-content-between align-items-center mt-auto pt-2"
                            style={{ borderTop: "2px dashed #dee2e6" }}
                          >
                            {order.paymentMethod === "COD" ? (
                              <span className="fw-bold text-dark">
                                Total Payable
                              </span>
                            ) : (
                              <span className="fw-bold text-dark">
                                Paied amount
                              </span>
                            )}
                            <span className="fw-bold text-primary fs-5">
                              ₹
                              {order.paymentMethod === "COD"
                                ? order.summary.totalPrice + 60
                                : order.summary.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Orders not found.</p>
      )}
    </main>
  );
};

export default AllOrders;
