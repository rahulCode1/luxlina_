import { useRevalidator, Link, useLocation } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";


const OrderDetails = ({ order }) => {
  const { isLoading, handleCancelOrder } = useEcommerce();
  const location = useLocation();
  const goTo = location?.state?.from || "/orders";

  const revalidator = useRevalidator();

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

  return (
    <main className="w-screen min-h-screen">
      <div
        className="p-3 max-w-[1200px] mx-auto mb-5"
        
      >
        <Link
          to={goTo}
          className="inline-flex items-center gap-1 rounded-lg text-white px-4 py-2 mb-3 text-sm font-medium"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
        >
          <i className="bi bi-arrow-left"></i>
          {goTo ? "Back" : "Go to All Orders"}
        </Link>

        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl text-white w-11 h-11 sm:w-[52px] sm:h-[52px] shrink-0"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              }}
            >
              <i className="bi bi-receipt-cutoff text-lg"></i>
            </div>
            <div>
              <h1
                className="font-bold mb-0 text-[#1e1b4b] leading-tight"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  letterSpacing: "-0.5px",
                }}
              >
                Order Details
              </h1>
              <p className="text-gray-500 mb-0 text-sm">
                Track and manage your order
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* ── Card wrapper ── */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(79,70,229,0.07),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
            {/* Card Header */}
            <div
              className="px-4 py-3"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <small className="text-white/85 text-sm">
                  <i className="bi bi-calendar3 me-1"></i>
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
                <div className="flex flex-wrap gap-2 items-center">
                  <span
                    className={`px-3 py-1.5 rounded-full font-semibold text-xs bg-${getStatusBadge(order.paymentStatus)}`}
                  >
                    <i className="bi bi-credit-card me-1"></i>
                    Payment: {order.paymentStatus}
                  </span>
                  <span className="px-3 py-1.5 rounded-full font-semibold text-xs bg-white/20 text-white">
                    <i className="bi bi-truck me-1"></i>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
              

                {/* ── Products Table ── */}
                <div className="w-full">
                  <h6 className="font-bold mb-3 flex items-center gap-2 text-[#4f46e5]">
                    <span className="inline-flex items-center justify-center rounded-lg w-7 h-7 bg-[#ede9fe] shrink-0">
                      <i className="bi bi-box-seam text-[13px] text-[#4f46e5]"></i>
                    </span>
                    Order Items
                    <span className="rounded-full ms-1 px-2 py-0.5 font-semibold text-xs bg-[#ede9fe] text-[#4f46e5]">
                      {order.products.length}
                    </span>
                  </h6>

                  <div className="overflow-x-auto rounded-lg border border-[#e8e4ff]">
                    <table
                      className="w-full align-middle mb-0 border-collapse"
                      style={{ fontSize: "clamp(0.72rem, 1.8vw, 0.855rem)" }}
                    >
                      <thead className="bg-[#f5f3ff]">
                        <tr>
                          <th className="py-2 px-3 font-semibold text-left text-[#4f46e5] border-b border-[#e8e4ff]">
                            Product
                          </th>
                          <th className="py-2 px-3 font-semibold text-center text-[#4f46e5] border-b border-[#e8e4ff]">
                            Qty
                          </th>
                          <th className="py-2 px-3 font-semibold text-right text-[#4f46e5] border-b border-[#e8e4ff]">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.products.map((product, pIndex) => (
                          <tr
                            key={pIndex}
                            className="border-b border-[#f5f3ff]"
                          >
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={
                                    product?.selectedVariation?.images[0].url
                                  }
                                  alt={product?.selectedVariation?.name}
                                  className="rounded-lg shrink-0 object-cover border-2 border-[#ede9fe]"
                                  style={{
                                    width: "clamp(36px, 5vw, 48px)",
                                    height: "clamp(36px, 5vw, 48px)",
                                  }}
                                />
                                <div>
                                  <div
                                    className="font-semibold text-[#1e1b4b] leading-tight"
                                    style={{
                                      fontSize: "clamp(0.7rem, 1.7vw, 0.8rem)",
                                    }}
                                  >
                                    {product?.selectedVariation?.name}
                                  </div>
                                  <small className="text-gray-500 text-xs">
                                    {product?.product?.materialType}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span className="rounded-full px-2 py-0.5 font-semibold text-xs bg-[#ede9fe] text-[#4f46e5]">
                                {product?.product?.quantity}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#4f46e5]">
                              ₹
                              {product?.selectedVariation?.discountPrice.toFixed(
                                2,
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── Bottom grid: Summary | Placed By | Address ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {/* Order Summary */}
                  <div className="border border-gray-200 rounded-xl h-full bg-white flex flex-col">
                    <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2 rounded-t-xl">
                      <i className="bi bi-receipt text-[#4f46e5] text-sm"></i>
                      <span className="font-semibold text-gray-800 text-sm">
                        Order Summary
                      </span>
                    </div>

                    <div className="p-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center py-1 border-b border-gray-200 text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <i className="bi bi-stack text-[#4f46e5] text-[13px]"></i>
                          Total Items
                        </span>
                        <span className="font-semibold text-gray-800">
                          {order.summary.totalQuantity}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1 border-b border-gray-200 text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <i className="bi bi-tag text-[#4f46e5] text-[13px]"></i>
                          MRP
                        </span>
                        <span className="font-semibold text-gray-800">
                          ₹{order.summary.totalPrice || 0}
                        </span>
                      </div>

                      {order.summary.totalDiscount > 0 && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200 text-sm">
                          <span className="text-gray-500 flex items-center gap-2">
                            <i className="bi bi-percent text-green-500 text-[13px]"></i>
                            Discount
                          </span>
                          <span className="font-semibold text-green-600">
                            − ₹{order.summary.totalDiscount}
                            {console.log(order.summary.totalDiscount)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center py-1 border-b border-gray-200 text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <i className="bi bi-truck text-[#4f46e5] text-[13px]"></i>
                          Delivery
                        </span>
                        {order.paymentMethod === "COD" ? (
                          <span className="font-semibold text-amber-500">
                            + ₹60
                          </span>
                        ) : (
                          <span className="font-semibold text-green-600">
                            FREE
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-2 border-t-2 border-dashed border-gray-200">
                        {order.paymentMethod === "COD" ? (
                          <span className="font-bold text-gray-800">
                            Total Payable
                          </span>
                        ) : (
                          <span className="font-bold text-gray-800">
                            Paied amount
                          </span>
                        )}
                        <span className="font-bold text-[#4f46e5] text-lg">
                          ₹
                          {order.paymentMethod === "COD"
                            ? order.summary.totalPrice + 60
                            : order.summary.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Placed By */}
                  <div className="p-4 rounded-xl h-full bg-white border border-[#e8e4ff]">
                    <h6 className="font-bold mb-3 flex items-center gap-2 text-[#4f46e5]">
                      <span className="inline-flex items-center justify-center rounded-lg w-7 h-7 bg-[#ede9fe] shrink-0">
                        <i className="bi bi-person-fill text-[13px] text-[#4f46e5]"></i>
                      </span>
                      Placed By
                    </h6>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center rounded-full shrink-0 w-10 h-10 bg-[#ede9fe]">
                        <i className="bi bi-person text-[#4f46e5]"></i>
                      </div>
                      <div>
                        <div className="font-semibold text-[#1e1b4b] text-sm">
                          {order.orderPlacedBy.name}
                        </div>
                        <small className="text-gray-500 text-xs">
                          Customer
                        </small>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f5f3ff] text-sm">
                      <i className="bi bi-telephone-fill text-[#4f46e5]"></i>
                      <span className="text-[#1e1b4b]">
                        {order.orderPlacedBy.phoneNumber}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="p-4 rounded-xl h-full bg-white border border-[#e8e4ff] md:col-span-2 xl:col-span-1">
                    <h6 className="font-bold mb-3 flex items-center gap-2 text-[#4f46e5]">
                      <span className="inline-flex items-center justify-center rounded-lg w-7 h-7 bg-[#ede9fe] shrink-0">
                        <i className="bi bi-geo-alt-fill text-[13px] text-[#4f46e5]"></i>
                      </span>
                      Delivery Address
                    </h6>

                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-start gap-2">
                        <i className="bi bi-map mt-1 shrink-0 text-[#7c3aed]"></i>
                        <span className="text-gray-700">
                          <span className="text-gray-500 me-1">Area:</span>
                          {order.address.area}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <i className="bi bi-building mt-1 shrink-0 text-[#7c3aed]"></i>
                        <span className="text-gray-700">
                          <span className="text-gray-500 me-1">City:</span>
                          {order.address.city}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <i className="bi bi-house mt-1 shrink-0 text-[#7c3aed]"></i>
                        <span className="text-gray-700">
                          <span className="text-gray-500 me-1">Address:</span>
                          {order.address.fullAddress}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <i className="bi bi-telephone mt-1 shrink-0 text-[#7c3aed]"></i>
                        <span className="text-gray-700">
                          <span className="text-gray-500 me-1">Phone:</span>
                          {order.address.phoneNumber}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <i className="bi bi-flag mt-1 shrink-0 text-[#7c3aed]"></i>
                        <span className="text-gray-700">
                          <span className="text-gray-500 me-1">State:</span>
                          {order.address.state}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <i className="bi bi-mailbox mt-1 shrink-0 text-[#7c3aed]"></i>
                        <span className="text-gray-700">
                          <span className="text-gray-500 me-1">ZIP:</span>
                          {order.address.zipCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Cancel Button ── */}
                <div className="w-full">
                  <div className="p-3 rounded-xl flex items-center justify-between flex-wrap gap-3 bg-[#fff7f7] border border-[#fee2e2]">
                    <div className="flex items-center gap-2">
                      <i className="bi bi-info-circle text-[#ef4444]"></i>
                      <small className="text-gray-500 text-xs sm:text-sm">
                        {order.orderStatus === "cancelled"
                          ? "Order calcelled successfully."
                          : order.orderStatus === "delevered"
                            ? "Order delereved already"
                            : "Cancellation is only available for eligible orders."}
                      </small>
                    </div>
                    <button
                      disabled={
                        order.orderStatus === "delivered" ||
                        order.orderStatus === "cancelled" ||
                        isLoading
                      }
                      onClick={() => handleCancelOrder(order.id, revalidator)}
                      className="text-sm font-semibold px-4 py-1.5 rounded-lg border-[1.5px] border-[#ef4444] text-[#ef4444] bg-transparent transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {order.orderStatus === "cancelled"
                        ? "Cancelled"
                        : isLoading
                          ? "Canceling..."
                          : "Cancel Order"}
                      {isLoading && (
                        <span className="inline-block w-3 h-3 ms-2 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
