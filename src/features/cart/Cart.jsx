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
import {
  FiArrowLeft,
  FiShoppingCart,
  FiTag,
  FiTrash2,
  FiHeart,
  FiFileText,
  FiTruck,
  FiTrendingDown,
  FiShoppingBag,
  FiLock,
} from "react-icons/fi";

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
        <main className="min-h-screen bg-slate-50 p-3 pb-24 ">
          <div className="w-full sm:w-11/12 max-w-6xl mx-auto mb-5 ">
            {productCart && productCart.length > 0 ? (
              <>
                {goTo && goTo !== "/cart" && (
                  <Link
                    to={goTo}
                    className="inline-block mb-5 px-4 py-1.5 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
                  >
                    <FiArrowLeft className="inline-block mr-1" /> Back
                  </Link>
                )}

                {/* ── Page Header ── */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center rounded-xl bg-violet-600 shrink-0 w-10 h-10 sm:w-[46px] sm:h-[46px]">
                    <FiShoppingCart className="text-white text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-0 text-slate-900">
                      My Cart
                    </h4>
                    <span className="text-slate-500 text-xs sm:text-sm">
                      {productCart.length}{" "}
                      {productCart.length === 1 ? "item" : "items"} in your cart
                    </span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* ════════════════════════
              LEFT — Cart Items
          ════════════════════════ */}
                  <div className="w-full lg:w-7/12">
                    <div className="flex flex-col gap-3">
                      {productCart.map((cart) => (
                        <div
                          key={cart.id}
                          className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
                        >
                          {/* stack on very small screens, row from sm up */}
                          <div className="flex flex-row">
                            {/* Image */}
                            <div className="w-28 sm:w-1/3 md:w-1/4 shrink-0">
                              <Link
                                to={`/products/${cart.product.id}`}
                                state={{ from: "/cart" }}
                              >
                                <img
                                  src={cart?.selectedVariation?.images[0]?.url}
                                  className="w-full h-full min-h-[110px] sm:min-h-[130px] object-cover block"
                                  alt={cart.selectedVariation.name}
                                />
                              </Link>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="p-2.5 sm:p-3 h-full flex flex-col justify-between">
                                {/* Name */}
                                <p className="font-semibold mb-2 text-slate-900 leading-snug text-[clamp(0.8rem,2vw,0.95rem)] line-clamp-2">
                                  {cart.selectedVariation.name}
                                </p>

                                {/* Price + Save badge */}
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                  <span className="font-bold text-violet-600 text-sm sm:text-[1.05rem]">
                                    ₹{cart.selectedVariation.discountPrice}
                                  </span>
                                  <span className="text-slate-400 text-xs sm:text-sm line-through">
                                    ₹{cart.selectedVariation.price}
                                  </span>
                                  <span className="bg-emerald-50 text-emerald-600 rounded-full px-2 py-0.5 text-[0.6rem] sm:text-[0.62rem] font-medium flex items-center whitespace-nowrap">
                                    <FiTag className="mr-1" size={10} />
                                    Save ₹
                                    {cart.selectedVariation.price -
                                      cart.selectedVariation.discountPrice}
                                  </span>
                                </div>

                                {/* Stepper + actions */}
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  {/* Quantity stepper */}
                                  <div className="flex items-center gap-1 rounded-full px-2 py-1 border border-slate-200 bg-slate-50 w-fit">
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
                                      className="flex items-center justify-center rounded-full border border-slate-200 bg-white text-violet-600 font-bold w-6 h-6 sm:w-[26px] sm:h-[26px] text-sm leading-none disabled:opacity-50 shrink-0"
                                    >
                                      −
                                    </button>
                                    <span className="font-bold text-slate-900 px-1 min-w-[20px] text-center text-xs sm:text-sm">
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
                                      className="flex items-center justify-center rounded-full border border-slate-200 bg-white text-violet-600 font-bold w-6 h-6 sm:w-[26px] sm:h-[26px] text-sm leading-none disabled:opacity-50 shrink-0"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Action buttons */}
                                  <div className="flex gap-1.5 sm:gap-2">
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
                                      className="flex items-center justify-center gap-1 rounded-lg border border-red-500 text-red-500 font-semibold text-xs px-2 sm:px-2.5 py-1 min-w-[32px] sm:min-w-[36px] hover:bg-red-50 transition-colors disabled:opacity-50"
                                    >
                                      {removeFromCartLoading === "loading" &&
                                      cart.selectedVariation.id ===
                                        productId ? (
                                        <span className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <>
                                          <FiTrash2 size={11} />
                                          <span className="hidden sm:inline">
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
                                        className="flex items-center justify-center gap-1 rounded-lg bg-violet-600 text-white font-semibold text-xs px-2 sm:px-2.5 py-1 hover:bg-violet-700 transition-colors"
                                      >
                                        <FiHeart
                                          className="fill-current"
                                          size={11}
                                        />
                                        <span className="hidden sm:inline">
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
                                        className="flex items-center justify-center gap-1 rounded-lg border border-violet-600 text-violet-600 font-semibold text-xs px-2 sm:px-2.5 py-1 min-w-[32px] sm:min-w-[36px] hover:bg-violet-50 transition-colors disabled:opacity-50"
                                      >
                                        {moveToWishlistLoading === "loading" &&
                                        cart.id === cartId ? (
                                          <span className="w-3.5 h-3.5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                          <>
                                            <FiHeart size={11} />
                                            <span className="hidden sm:inline">
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
                  <div className="w-full lg:w-5/12">
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden lg:sticky lg:top-6">
                      {/* Card header */}
                      <div className="border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                        <FiFileText className="text-violet-600" />
                        <span className="font-semibold text-slate-900 text-sm sm:text-base">
                          Order Summary
                        </span>
                        <span className="bg-violet-50 text-violet-600 rounded-full ml-auto px-2.5 py-0.5 text-[0.7rem] font-medium whitespace-nowrap">
                          {totalQuantity(productCart)}{" "}
                          {totalQuantity(productCart) > 1 ? "items" : "item"}
                        </span>
                      </div>

                      <div className="px-4 py-3">
                        {/* Price breakdown rows */}
                        <div className="flex flex-col gap-2 mb-3">
                          <div className="flex justify-between text-xs sm:text-sm text-slate-500">
                            <span>
                              MRP ({totalQuantity(productCart)}{" "}
                              {totalQuantity(productCart) > 1
                                ? "items"
                                : "item"}
                              )
                            </span>
                            <span>₹{totalPrice(productCart)}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-slate-500">Discount</span>
                            <span className="text-emerald-600 font-semibold">
                              − ₹{totalDiscountOnCart}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-slate-500">
                              Delivery Charges
                            </span>
                            <span className="text-emerald-600 font-semibold flex items-center">
                              <FiTruck className="mr-1" size={14} />
                              FREE
                            </span>
                          </div>
                          <hr className="my-1 border-slate-100" />
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              Total Payable
                            </span>
                            <span className="font-bold text-base sm:text-lg text-slate-900">
                              ₹{totalPrice(productCart)}
                            </span>
                          </div>
                        </div>

                        {/* Savings alert */}
                        {totalDiscountOnCart > 0 && (
                          <div className="flex items-center gap-2 py-2 px-3 mb-3 rounded-lg bg-emerald-50 text-emerald-700 text-xs sm:text-sm">
                            <FiTrendingDown className="text-lg shrink-0" />
                            <span>
                              You're saving{" "}
                              <strong className="ml-1">
                                ₹{totalDiscountOnCart}
                              </strong>{" "}
                              on this order!
                            </span>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="grid mb-2">
                          <Link
                            to="/checkout"
                            state={{ from: "/cart" }}
                            className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white font-bold py-2.5 text-sm sm:text-base tracking-wide hover:bg-slate-800 transition-colors text-center"
                          >
                            <FiShoppingBag className="text-amber-400 text-lg shrink-0" />
                            <span className="whitespace-normal sm:whitespace-nowrap">
                              Proceed to Checkout &nbsp;·&nbsp; ₹
                              {totalPrice(productCart)}
                            </span>
                          </Link>
                        </div>

                        {/* Secure note */}
                        <p className="text-center text-slate-500 flex items-center justify-center gap-1 mb-0 text-[0.68rem] sm:text-[0.72rem]">
                          <FiLock className="text-emerald-600 shrink-0" />
                          100% Secure &amp; Encrypted Checkout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ── Empty State ── */
              <div className="flex justify-center">
                <div className="w-full md:w-7/12 lg:w-5/12">
                  <div className="bg-white rounded-2xl shadow-sm text-center">
                    <div className="py-10 sm:py-12 px-4 sm:px-6">
                      <div className="inline-flex items-center justify-center rounded-full bg-violet-50 mb-4 w-16 h-16 sm:w-[88px] sm:h-[88px]">
                        <FiShoppingCart className="text-violet-600" size={30} />
                      </div>
                      <h4 className="font-bold mb-2 text-base sm:text-lg text-slate-900">
                        Your Cart is Empty
                      </h4>
                      <p className="text-slate-500 mb-4 text-xs sm:text-sm">
                        Looks like you haven't added anything yet.
                      </p>
                      <Link
                        to="/products"
                        state={{ from: "/cart" }}
                        className="inline-block bg-violet-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-violet-700 transition-colors text-sm sm:text-base"
                      >
                        <FiShoppingBag className="inline-block mr-2" />
                        Browse Products
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
