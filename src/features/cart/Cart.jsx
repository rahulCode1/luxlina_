import { Link, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import { totalPrice, totalQuantity } from "../../functions/reUseFunctions";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartQuantityAsync,
  decreaseCartQuantityAsync,
  removeFromCartAsync,
  moveToWishlistAsync,
  clearError,
} from "./cartSlice";
import { addToWishlist } from "../wishlist/wishlistSlice";
import ErrorModal from "../../components/ErrorModal";
import { useState } from "react";

const Cart = () => {
  const [productId, setProductId] = useState("");
  const [cartId, setCartId] = useState(null);
  const dispatch = useDispatch();
  const {
    cart: productCart,
    increaseQuantityLoading,
    decreaseQuantityLoading,
    getCartsLoading,
    moveToWishlistLoading,
    removeFromCartLoading,
    error,
  } = useSelector((state) => state.cart);

  const { wishlist } = useSelector((state) => state.wishlist);
  const location = useLocation();
  const goTo = location.state?.from;
  const isExistOnWishlist = (productId) => {
    return wishlist.some((wish) => wish.id === productId);
  };

  const handleIncreaseQuantity = async (productId, variationId) => {
    const toastId = toast.loading("Quantity increasing...");
    try {
      const response = await dispatch(
        increaseCartQuantityAsync({ productId, variationId }),
      ).unwrap();
      toast.success(response.message || "Quantity increased successfully.", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to  increase quantity.", {
        id: toastId,
      });
    }
  };

  const handleDecreaseQuantity = async (productId, variationId) => {
    const toastId = toast.loading("Quantity decreasing...");
    try {
      const response = await dispatch(
        decreaseCartQuantityAsync({ productId, variationId }),
      ).unwrap();
      toast.success(response.message || "Quantity decreased successfully.", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to  decrease quantity.", {
        id: toastId,
      });
    }
  };

  const handleRemoveFromCart = async (productId, variationId) => {
    const tostId = toast.loading("Remove from cart...");
    try {
      setProductId(productId);
      const response = await dispatch(
        removeFromCartAsync({ productId, variationId }),
      ).unwrap();
      toast.success(response.message || "Successfully removed from cart.", {
        id: tostId,
      });
    } catch (error) {
      toast.error(error || "Failed to remove from cart.");
      console.log(error);
    }
  };

  const handleCartToWishList = async (cart) => {
    const toastId = toast.loading("Moving to wishlist...");

    try {
      setCartId(cart?.id);
      const res = await dispatch(
        moveToWishlistAsync({
          productId: cart?.product.id,
          variationId: cart?.selectedVariation?.id,
        }),
      ).unwrap();
      dispatch(addToWishlist(cart));
      setCartId("");
      toast.success(res.message || "Successfully moved to wishlist", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to  move to wishlist", { id: toastId });
    }
  };

  const totalDiscountOnCart = productCart.reduce((acc, curr) => {
    return (
      acc +
      (curr.selectedVariation.price - curr.selectedVariation.discountPrice) *
        curr.quantity
    );
  }, 0);


  return (
    <>
      {error && (
        <ErrorModal message={error} onClose={() => dispatch(clearError())} />
      )}
      {getCartsLoading === "loading" ? (
        <Loading />
      ) : (
        <main
          className="min-vh-100 py-4 py-md-5 bg-light"
          style={{ marginBottom: "6em" }}
        >
          <div className="container">
            {productCart && productCart.length > 0 ? (
              <>
                {goTo && goTo !== "/cart" && (
                  <Link
                    to={goTo}
                    style={{
                      padding: "6px 15px",
                      marginBottom: "20px",
                      display: "inline-block",
                    }}
                    className="text-light rounded bg-primary text-decoration-none"
                  >
                    <i className="bi bi-arrow-left"></i> Back
                  </Link>
                )}

                {/* ── Page Header ── */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary flex-shrink-0"
                    style={{ width: 46, height: 46 }}
                  >
                    <i className="bi bi-cart3 text-white fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0 text-dark">My Cart</h4>
                    <span className="text-muted small">
                      {productCart.length}{" "}
                      {productCart.length === 1 ? "item" : "items"} in your cart
                    </span>
                  </div>
                </div>

                <div className="row g-4 align-items-start">
                  {/* ════════════════════════
                  LEFT — Cart Items
              ════════════════════════ */}
                  <div className="col-12 col-lg-7">
                    <div className="d-flex flex-column gap-3">
                      {productCart.map((cart) => (
                        <div
                          key={cart.id}
                          className="card border rounded-4 overflow-hidden"
                        >
                          <div className="row g-0">
                            {/* Image */}
                            <div className="col-4 col-sm-3">
                              <Link
                                to={`/products/${cart.product.id}`}
                                state={{ from: "/cart" }}
                              >
                                <img
                                  src={cart?.selectedVariation?.images[0]?.url}
                                  className="w-100 h-100"
                                  style={{
                                    objectFit: "cover",
                                    minHeight: 130,
                                    display: "block",
                                  }}
                                  alt={cart.selectedVariation.name}
                                />
                              </Link>
                            </div>

                            {/* Info */}
                            <div className="col-8 col-sm-9">
                              <div className="p-3 h-100 d-flex flex-column justify-content-between">
                                {/* Name */}
                                <p
                                  className="fw-semibold mb-2 text-dark lh-sm"
                                  style={{
                                    fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
                                  }}
                                >
                                  {cart.selectedVariation.name}
                                </p>

                                {/* Price + Save badge */}
                                <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                  <span
                                    className="fw-bold text-primary"
                                    style={{ fontSize: "1.05rem" }}
                                  >
                                    ₹{cart.selectedVariation.discountPrice}
                                  </span>
                                  <span className="text-muted small text-decoration-line-through">
                                    ₹{cart.selectedVariation.price}
                                  </span>
                                  <span
                                    className="badge bg-success-subtle text-success rounded-pill"
                                    style={{ fontSize: "0.62rem" }}
                                  >
                                    <i className="bi bi-tag-fill me-1" />
                                    Save ₹
                                    {cart.selectedVariation.price -
                                      cart.selectedVariation.discountPrice}
                                  </span>
                                </div>

                                {/* Stepper + actions */}
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                  {/* Quantity stepper */}
                                  <div
                                    className="d-flex align-items-center gap-1 rounded-pill px-2 py-1 border bg-light"
                                    style={{ width: "fit-content" }}
                                  >
                                    <button
                                      disabled={
                                        decreaseQuantityLoading === "loading" &&
                                        cart.selectedVariation.id === productId
                                      }
                                      onClick={() =>
                                        handleDecreaseQuantity(
                                          cart.product.id,
                                          cart.selectedVariation.id,
                                        )
                                      }
                                      className="btn btn-sm d-flex align-items-center justify-content-center rounded-circle border bg-white text-primary fw-bold p-0"
                                      style={{
                                        width: 26,
                                        height: 26,
                                        fontSize: 15,
                                        lineHeight: 1,
                                      }}
                                    >
                                      −
                                    </button>
                                    <span
                                      className="fw-bold text-dark px-1"
                                      style={{
                                        minWidth: 22,
                                        textAlign: "center",
                                        fontSize: "0.88rem",
                                      }}
                                    >
                                      {cart.quantity}
                                    </span>
                                    <button
                                      disabled={
                                        increaseQuantityLoading === "loading" &&
                                        cart.selectedVariation.id === productId
                                      }
                                      onClick={() =>
                                        handleIncreaseQuantity(
                                          cart.product.id,
                                          cart.selectedVariation.id,
                                        )
                                      }
                                      className="btn btn-sm d-flex align-items-center justify-content-center rounded-circle border bg-white text-primary fw-bold p-0"
                                      style={{
                                        width: 26,
                                        height: 26,
                                        fontSize: 15,
                                        lineHeight: 1,
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Action buttons */}
                                  <div className="d-flex gap-2">
                                    {/* Remove */}
                                    <button
                                      disabled={
                                        removeFromCartLoading === "loading" &&
                                        cart.selectedVariation.id === productId
                                      }
                                      onClick={() =>
                                        handleRemoveFromCart(
                                          cart.product.id,
                                          cart.selectedVariation.id,
                                        )
                                      }
                                      className="btn btn-outline-danger btn-sm rounded-3 fw-semibold d-flex align-items-center justify-content-center"
                                      style={{
                                        fontSize: "0.75rem",
                                        padding: "4px 10px",
                                        minWidth: 36,
                                      }}
                                    >
                                      {removeFromCartLoading === "loading" &&
                                      cart.selectedVariation.id ===
                                        productId ? (
                                        <span className="spinner-border spinner-border-sm" />
                                      ) : (
                                        <>
                                          <i
                                            className="bi bi-trash3-fill"
                                            style={{ fontSize: 11 }}
                                          />
                                          <span className="d-none d-sm-inline ms-1">
                                            Remove
                                          </span>
                                        </>
                                      )}
                                    </button>

                                    {/* Wishlist */}
                                    {isExistOnWishlist(
                                      cart.selectedVariation.id,
                                    ) ? (
                                      <Link
                                        to="/wishlist"
                                        state={{ from: "/cart" }}
                                        className="btn btn-primary btn-sm rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-1"
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "4px 10px",
                                        }}
                                      >
                                        <i
                                          className="bi bi-heart-fill"
                                          style={{ fontSize: 11 }}
                                        />
                                        <span className="d-none d-sm-inline">
                                          Wishlisted
                                        </span>
                                      </Link>
                                    ) : (
                                      <button
                                        disabled={
                                          moveToWishlistLoading === "loading" &&
                                          cart.id === cartId
                                        }
                                        onClick={() =>
                                          handleCartToWishList(cart)
                                        }
                                        className="btn btn-outline-primary btn-sm rounded-3 fw-semibold d-flex align-items-center justify-content-center"
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "4px 10px",
                                          minWidth: 36,
                                        }}
                                      >
                                        {moveToWishlistLoading === "loading" &&
                                        cart.id === cartId ? (
                                          <span className="spinner-border spinner-border-sm" />
                                        ) : (
                                          <>
                                            <i
                                              className="bi bi-heart"
                                              style={{ fontSize: 11 }}
                                            />
                                            <span className="d-none d-sm-inline ms-1">
                                              Wishlist
                                            </span>
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ════════════════════════
                  RIGHT — Order Summary
              ════════════════════════ */}
                  <div className="col-12 col-lg-5">
                    <div
                      className="card border-0 shadow-sm rounded-4 overflow-hidden position-lg-sticky"
                      style={{ top: 24 }}
                    >
                      {/* Card header */}
                      <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
                        <i className="bi bi-receipt-cutoff text-primary"></i>
                        <span className="fw-semibold text-dark">
                          Order Summary
                        </span>
                        <span
                          className="badge bg-primary-subtle text-primary rounded-pill ms-auto"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {totalQuantity(productCart)}
                          {totalQuantity(productCart) > 1 ? "items" : "item"}
                        </span>
                      </div>

                      <div className="card-body px-4 py-3">
                        {/* Price breakdown rows */}
                        <div className="d-flex flex-column gap-2 mb-3">
                          <div className="d-flex justify-content-between small text-muted">
                            <span>
                              MRP ({totalQuantity(productCart)}{" "}
                              {totalQuantity(productCart) > 1
                                ? "items"
                                : "item"}
                              )
                            </span>
                            <span>₹{totalPrice(productCart)}</span>
                          </div>
                          <div className="d-flex justify-content-between small">
                            <span className="text-muted">Discount</span>
                            <span className="text-success fw-semibold">
                              − ₹{totalDiscountOnCart}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between small">
                            <span className="text-muted">Delivery Charges</span>
                            <span className="text-success fw-semibold">
                              <i className="bi bi-truck me-1"></i>FREE
                            </span>
                          </div>
                          <hr className="my-1" />
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-dark">
                              Total Payable
                            </span>
                            <span className="fw-bold fs-5 text-dark">
                              ₹{totalPrice(productCart)}
                            </span>
                          </div>
                        </div>

                        {/* Savings alert */}
                        {totalDiscountOnCart > 0 && (
                          <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3 rounded-3 small">
                            <i className="bi bi-piggy-bank-fill fs-5"></i>
                            You're saving{" "}
                            <strong className="ms-1">
                              ₹{totalDiscountOnCart}
                            </strong>{" "}
                            on this order!
                          </div>
                        )}

                        {/* CTA */}
                        <div className="d-grid mb-2">
                          <Link
                            to="/checkout"
                            state={{ from: "/cart" }}
                            className="btn btn-dark fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                            style={{
                              fontSize: "1rem",
                              letterSpacing: "0.02em",
                            }}
                          >
                            <i className="bi bi-bag-check-fill text-warning fs-5"></i>
                            Proceed to Checkout &nbsp;·&nbsp; ₹
                            {totalPrice(productCart)}
                          </Link>
                        </div>

                        {/* Secure note */}
                        <p
                          className="text-center text-muted d-flex align-items-center justify-content-center gap-1 mb-0"
                          style={{ fontSize: "0.72rem" }}
                        >
                          <i className="bi bi-shield-lock-fill text-success"></i>
                          100% Secure &amp; Encrypted Checkout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ── Empty State ── */
              <div className="row justify-content-center">
                <div className="col-12 col-md-7 col-lg-5">
                  <div className="card border-0 shadow-sm text-center rounded-4">
                    <div className="card-body py-5 px-4">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-4"
                        style={{ width: 88, height: 88 }}
                      >
                        <i
                          className="bi bi-cart-x text-primary"
                          style={{ fontSize: 36 }}
                        ></i>
                      </div>
                      <h4 className="fw-bold mb-2 text-dark">
                        Your Cart is Empty
                      </h4>
                      <p className="text-muted mb-4 small">
                        Looks like you haven't added anything yet.
                      </p>
                      <Link
                        to="/products"
                        state={{ from: "/cart" }}
                        className="btn btn-primary fw-semibold px-4 py-2 rounded-3"
                      >
                        <i className="bi bi-shop me-2"></i>Browse Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;
