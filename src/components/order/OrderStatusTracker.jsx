const OrderStatusTracker = ({ order }) => {
  return (
    <>
      {/* ── Order Status Tracker ── */}
      <div className="col-12">
        <div
          className="p-2 rounded-3"
          style={{ background: "#fff", border: "1px solid #e8e4ff" }}
        >
          <h6
            className="fw-bold mb-4 d-flex align-items-center gap-2"
            style={{ color: "#4f46e5" }}
          >
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-2"
              style={{ width: 28, height: 28, background: "#ede9fe" }}
            >
              <i
                className="bi bi-clock-history"
                style={{ fontSize: 13, color: "#4f46e5" }}
              ></i>
            </span>
            Order Status
          </h6>

          {order.orderStatus === "cancelled" ? (
            /* ── Cancelled state ── */
            <div
              className="d-flex align-items-center gap-3 p-3 rounded-3"
              style={{ background: "#fff7f7", border: "1px solid #fee2e2" }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ width: 40, height: 40, background: "#fee2e2" }}
              >
                <i className="bi bi-x-lg" style={{ color: "#ef4444" }}></i>
              </div>
              <div>
                <div
                  className="fw-semibold"
                  style={{ color: "#ef4444", fontSize: "0.9rem" }}
                >
                  Order Cancelled
                </div>
                <small className="text-muted">
                  This order has been cancelled.
                </small>
              </div>
            </div>
          ) : (
            /* ── Progress steps ── */
            <div className="d-flex align-items-start">
              {[
                {
                  key: "accepted",
                  icon: "bi-check2-circle",
                  label: "Order Accepted",
                },
                { key: "dispatched", icon: "bi-box-seam", label: "Dispatched" },
                { key: "out", icon: "bi-truck", label: "Out for Delivery" },
                {
                  key: "delivered",
                  icon: "bi-house-check",
                  label: "Delivered",
                },
              ].map((step, i, arr) => {
                const statuses = ["accepted", "dispatched", "out", "delivered"];
                const curIdx = statuses.indexOf(order.orderStatus);
                const stepIdx = statuses.indexOf(step.key);
                const isDone = stepIdx < curIdx;
                const isActive = stepIdx === curIdx;

                return (
                  <div
                    key={step.key}
                    className="d-flex align-items-center flex-grow-1"
                  >
                    {/* Step bubble + label */}
                    <div
                      className="d-flex flex-column"
                      style={{ minWidth: 70 }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                        style={{
                          width: 38,
                          height: 38,
                          background: isDone
                            ? "#4f46e5"
                            : isActive
                              ? "#fff"
                              : "#f5f3ff",
                          border: isActive
                            ? "2px solid #4f46e5"
                            : isDone
                              ? "2px solid #4f46e5"
                              : "2px solid #e8e4ff",
                          boxShadow: isActive ? "0 0 0 4px #ede9fe" : "none",
                          transition: "all 0.3s",
                        }}
                      >
                        <i
                          className={`bi ${step.icon}`}
                          style={{
                            fontSize: 15,
                            color: isDone
                              ? "#fff"
                              : isActive
                                ? "#4f46e5"
                                : "#c4b8f8",
                          }}
                        ></i>
                      </div>
                      <small
                        className=" fw-semibold"
                        style={{
                          fontSize: "0.68rem",
                          color: isDone || isActive ? "#4f46e5" : "#9ca3af",
                          lineHeight: 1.3,
                        }}
                      >
                        {step.label}
                      </small>
                    </div>

                    {/* Connector line (skip after last step) */}
                    {i < arr.length - 1 && (
                      <div
                        className="flex-grow-1 mb-4"
                        style={{
                          height: 2,
                          background: isDone ? "#4f46e5" : "#e8e4ff",
                          transition: "background 0.3s",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderStatusTracker;
