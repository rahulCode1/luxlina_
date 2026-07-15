import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProductVariation from "./ProductVariation";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { addToCartAsync } from "../../features/cart/cartSlice";
import {
  removeFromWishlistAsync,
  addToWishlistAsync,
} from "../../features/wishlist/wishlistSlice";
import { privateApi } from "../../utils/axios";

const ProductRightDetails = ({
  styles,
  token,
  productInfo,
  selectedVariation,
  setSearchParams,
  productId,
  revalidator,
  setError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { cart: productCart, addTocartLoading } = useSelector(
    (state) => state.cart,
  );
  const { wishlist, addWishlistLoading, removeFromWishlistLoading } =
    useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  /* FIX: safe inch conversion — returns "—" when value is null/undefined */
  const toCm = (v) => (v != null ? `${v} cm` : "—");
  const toInch = (v) => (v != null ? `${(v / 2.54).toFixed(2)}"` : "");
  const toKg = (v) => (v != null ? `${v / 1000} kg` : "");

  const MAX_QUANTITY = 10; // FIX: sensible upper bound

  const SPECS = [
    {
      label: "Length",
      value: toCm(selectedVariation?.length),
      alt: toInch(selectedVariation?.length),
    },
    {
      label: "Width",
      value: toCm(selectedVariation?.width),
      alt: toInch(selectedVariation?.width),
    },
    {
      label: "Height",
      value: toCm(selectedVariation?.height),
      alt: toInch(selectedVariation?.height),
    },
    {
      label: "Weight",
      value:
        selectedVariation?.weight != null
          ? `${selectedVariation.weight} gm`
          : "—",
      alt: toKg(selectedVariation?.weight),
    },
  ];

  
  const getSpec = (label) => SPECS.find((s) => s.label === label) || {};
  const lengthSpec = getSpec("Length");
  const widthSpec = getSpec("Width");
  const heightSpec = getSpec("Height");
  const weightSpec = getSpec("Weight");

  const checkProductIsInCart = (id) =>
    productCart.some(
      (c) => c?.product?.id === id && c?.variation === selectedVariation?.id,
    );

  const checkProductIsWishlist = (id) =>
    wishlist.some(
      (wishlist) =>
        wishlist?.product?.id === id &&
        wishlist?.variation === selectedVariation?.id,
    );

  const handleAddToCart = async (product) => {
    if (!token)
      return navigate("/login", { state: { from: location.pathname } });
    const toastId = toast.loading("Adding to cart...");
    try {
      const res = await dispatch(
        addToCartAsync({
          productId: product?.id,
          quantity,
          variationId: selectedVariation?.id,
        }),
      ).unwrap();
      if (window.fbq && res) {
        window.fbq("track", "AddToCart", {
          content_name: product?.name,
          content_ids: [product.id],
          value: product?.discountPrice,
          currency: "INR",
          contents: [{ id: product.id, quantity }],
        });
      }
      toast.success(res.message || "Product added to cart.", { id: toastId });
    } catch (err) {
      console.log(err);
      setError(err);
      toast.error(err?.message || "Failed to add to cart.", { id: toastId });
    }
  };

  const handleAddToWishList = async (product) => {
    if (!token)
      return navigate("/login", { state: { from: location.pathname } });
    const toastId = toast.loading("Adding to wishlist...");

    try {
      const res = await dispatch(
        addToWishlistAsync({
          productId: product.id,
          variationId: selectedVariation?.id,
        }),
      ).unwrap();
      // if (res) {
      //   window.fbq("track", "AddToWishlist", {
      //     content_name: product.name,
      //     content_ids: [product.id],
      //     value: Number(product.discountPrice),
      //     currency: "INR",
      //   });
      // }
      toast.success(res.message || "Added to wishlist.", { id: toastId });
    } catch (err) {
      toast.error(err || "Failed to add to wishlist.", { id: toastId });
    }
  };

  const handleRemoveFromWishList = async (product) => {
    if (!token) return navigate("/login");
    const toastId = toast.loading("Removing from wishlist...");
    try {
      const res = await dispatch(
        removeFromWishlistAsync({
          productId: product?.id,
          variationId: selectedVariation?.id,
        }),
      ).unwrap();
      toast.success(res.message || "Removed from wishlist", { id: toastId });
    } catch (error) {
      toast.error(error || "Failed to remove from wishlist.", { id: toastId });
    }
  };

  const handleAddToBuyNow = async () => {
    if (!token)
      return navigate("/login", { state: { from: location.pathname } });
    const toastId = toast.loading("Going to checkout...");
    try {
      setIsLoading(true);

      const { data } = await privateApi.post(
        `/order/addItemToBuyNow/${productId}/${selectedVariation?.id}`,
        {
          product: productId,
          quantity,
        },
      );
      if (window.fbq && productInfo) {
        window.fbq("track", "InitiateCheckout", {
          content_name: productInfo.name,
          content_ids: [productInfo.id],
          value: productInfo.discountPrice,
          currency: "INR",
          contents: [{ id: productInfo.id, quantity }],
        });
      }
      // console.log(data);
      toast.success("Added to checkout.", { id: toastId });
      navigate(`/buyNow/${data?.order?.variation}`, {
        state: { from: `/products/${productId}` },
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to proceed to checkout.",
        { id: toastId },
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Reset quantity whenever variation changes ── */
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariation?.id]);

  return (
    <>
      <div className={styles.detailsContainer}>
        {/* Category */}
        <div>
          <span className={styles.categoryBadge}>
            {productInfo.category || "Handicrafts"}
          </span>
        </div>

        {/* Title */}
        <h1>{selectedVariation?.name || productInfo.name}</h1>

        {/* Rating */}
        <div className={styles.ratingWrapper}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(productInfo.rating ?? 0) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className={styles.ratingScore}>
            {productInfo.rating ?? "—"}
          </span>
          <span className={styles.reviewCount}>
            ({productInfo.reviews ?? 0} reviews)
          </span>
        </div>

        {/* Variations */}
        <ProductVariation
          productInfo={productInfo}
          selectedVariation={selectedVariation}
          setSearchParams={setSearchParams}
          styles={styles}
          productId={productId}
          revalidator={revalidator}
        />

        {/* Description */}
        <div className={styles.descriptionBlock}>
          {selectedVariation?.shortDescription && (
            <p>{selectedVariation?.shortDescription}</p>
          )}
          {productInfo.materialType && (
            <div className={styles.materialLine}>
              <strong>Material:</strong> {productInfo.materialType}
            </div>
          )}
        </div>

        {/* Specs */}

        <div className="border border-[#edd9b8] rounded-xl overflow-hidden">
          {/* Title */}
          <h4 className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-[#8a7560] m-0 px-4 py-2.5 bg-[#fdf6ee] border-b border-[#edd9b8] flex items-center gap-2">
            <i className="bi bi-rulers" aria-hidden="true" />
            Dimensions &amp; Details
          </h4>

          {/* Diagram + values, stacked on mobile, side by side from sm up */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
            {/* Diagram with SVG shape + arrows, labels as HTML overlay */}
            <div className="relative w-44 sm:w-48 flex-shrink-0">
              <svg
                viewBox="0 0 300 220"
                className="w-full h-auto"
                aria-hidden="true"
              >
                <defs>
                  <marker
                    id="dimArrow"
                    markerWidth="7"
                    markerHeight="7"
                    refX="3.5"
                    refY="3.5"
                    orient="auto"
                  >
                    <path d="M0,0 L7,3.5 L0,7 Z" fill="#8a7560" />
                  </marker>
                </defs>

                {/* box */}
                <polygon
                  points="70,150 170,150 170,60 70,60"
                  fill="#fdf6ee"
                  stroke="#c97b3a"
                  strokeWidth="1.5"
                />
                <polygon
                  points="70,60 170,60 210,30 110,30"
                  fill="#f2e2c9"
                  stroke="#c97b3a"
                  strokeWidth="1.5"
                />
                <polygon
                  points="170,150 210,120 210,30 170,60"
                  fill="#ead2ac"
                  stroke="#c97b3a"
                  strokeWidth="1.5"
                />

                {/* length arrow (bottom, horizontal) */}
                <line
                  x1="70"
                  y1="175"
                  x2="170"
                  y2="175"
                  stroke="#8a7560"
                  strokeWidth="1.5"
                  markerStart="url(#dimArrow)"
                  markerEnd="url(#dimArrow)"
                />

                {/* width arrow (side, diagonal) */}
                <line
                  x1="185"
                  y1="163"
                  x2="225"
                  y2="133"
                  stroke="#8a7560"
                  strokeWidth="1.5"
                  markerStart="url(#dimArrow)"
                  markerEnd="url(#dimArrow)"
                />

                {/* height arrow (left, vertical) */}
                <line
                  x1="48"
                  y1="60"
                  x2="48"
                  y2="150"
                  stroke="#8a7560"
                  strokeWidth="1.5"
                  markerStart="url(#dimArrow)"
                  markerEnd="url(#dimArrow)"
                />
              </svg>

              {/* Labels rendered as HTML, not SVG text — stays crisp at any size */}
              <span className="absolute left-[40%] top-[85%] -translate-x-1/2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-[#6a5540] whitespace-nowrap">
                Length
              </span>
              <span className="absolute left-[81%] top-[64%] text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-[#6a5540] whitespace-nowrap">
                Width
              </span>
              <span className="absolute left-[6%] top-[47%] -translate-y-1/2 -rotate-90 origin-left text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-[#6a5540] whitespace-nowrap">
                Height
              </span>
            </div>

            {/* value list */}
            <div className="flex flex-col gap-2 w-full min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-[#c97b3a] flex-shrink-0" />
                <span className="text-[0.62rem] font-semibold tracking-wider uppercase text-[#b8a090] w-14 flex-shrink-0">
                  Length
                </span>
                <span className="text-sm font-semibold text-[#1a1208] flex items-baseline gap-1 flex-wrap">
                  {lengthSpec.value}
                  {lengthSpec.alt && (
                    <span className="text-xs font-normal text-[#a89070]">
                      / {lengthSpec.alt}
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-[#a8823f] flex-shrink-0" />
                <span className="text-[0.62rem] font-semibold tracking-wider uppercase text-[#b8a090] w-14 flex-shrink-0">
                  Width
                </span>
                <span className="text-sm font-semibold text-[#1a1208] flex items-baseline gap-1 flex-wrap">
                  {widthSpec.value}
                  {widthSpec.alt && (
                    <span className="text-xs font-normal text-[#a89070]">
                      / {widthSpec.alt}
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-[#8a7560] flex-shrink-0" />
                <span className="text-[0.62rem] font-semibold tracking-wider uppercase text-[#b8a090] w-14 flex-shrink-0">
                  Height
                </span>
                <span className="text-sm font-semibold text-[#1a1208] flex items-baseline gap-1 flex-wrap">
                  {heightSpec.value}
                  {heightSpec.alt && (
                    <span className="text-xs font-normal text-[#a89070]">
                      / {heightSpec.alt}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* weight row */}
          <div className="flex items-center gap-2 px-4 py-2 border-t border-[#f2e8da] text-sm">
            <i className="bi bi-box-seam text-[#c97b3a]" aria-hidden="true" />
            <span className="font-semibold text-[#1a1208] flex items-baseline gap-1 flex-wrap">
              {weightSpec.value}
              {weightSpec.alt && (
                <span className="text-xs font-normal text-[#a89070]">
                  / {weightSpec.alt}
                </span>
              )}
            </span>
          </div>

          {productInfo.care && (
            <div className="flex items-start gap-2 px-4 py-2.5 bg-[#fdfaf6] border-t border-[#edd9b8] text-[0.78rem] leading-relaxed text-[#6a5540]">
              <i
                className="bi bi-info-circle text-[#c97b3a] mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>
                <strong className="text-[#5c4430] font-medium">Care:</strong>{" "}
                {productInfo.care}
              </span>
            </div>
          )}
        </div>

        {/* Quantity */}
        <div className={styles.quantitySection}>
          <label htmlFor="qty-input">Select Quantity</label>
          <div className={styles.incOrDecContainer}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((p) => Math.max(1, p - 1))}
              className={styles.incOrDecBtn}
            >
              −
            </button>
            <input
              id="qty-input"
              value={quantity}
              className={styles.quantityInput}
              readOnly
              aria-live="polite"
            />
            <button
              aria-label="Increase quantity"
              /* FIX: capped at MAX_QUANTITY */
              disabled={quantity >= MAX_QUANTITY}
              onClick={() => setQuantity((p) => Math.min(MAX_QUANTITY, p + 1))}
              className={styles.incOrDecBtn}
            >
              +
            </button>
          </div>

          {/* Cart + Wishlist */}
          <div className={styles.cartAndWishlistContainer}>
            {checkProductIsInCart(productInfo.id) ? (
              <Link
                to="/cart"
                state={{ from: `/products/${productId}` }}
                className={styles.goToCartLink}
              >
                Go to Cart
              </Link>
            ) : (
              <button
                disabled={addTocartLoading === "loading"}
                onClick={() => handleAddToCart(productInfo)}
                className={`${styles.btn} ${styles.addToCartBtn}`}
              >
                {addTocartLoading === "loading" ? (
                  <>
                    Adding…
                    <span
                      className="spinner-border spinner-border-sm ms-2"
                      role="status"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            )}

            {/* {console.log(productInfo)} */}

            {checkProductIsWishlist(productInfo?.id) ? (
              <button
                onClick={() => handleRemoveFromWishList(productInfo)}
                className={styles.wishlistBtn}
              >
                {removeFromWishlistLoading === "loading" &&
                productInfo?.id === productId ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <FaHeart />
                )}
              </button>
            ) : (
              <button
                disabled={addWishlistLoading === "loading"}
                onClick={() => handleAddToWishList(productInfo)}
                className={styles.wishlistBtn}
              >
                {addWishlistLoading === "loading" ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Buy Now */}
        <button
          disabled={isLoading}
          onClick={handleAddToBuyNow}
          className={`${styles.btn} ${styles.buyNowBtn}`}
        >
          {isLoading ? (
            <>
              Buying…
              <span
                className="spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            "Buy Now"
          )}
        </button>

        {/* Trust icons */}
        <div className={styles.trustIconsWrapper}>
          {[
            { icon: "bi-wallet2", label: "Cash on Delivery" },
            { icon: "bi-truck", label: "Free Shipping" },
            { icon: "bi-shield-check", label: "Secure Payment" },
          ].map(({ icon, label }) => (
            <div key={label} className={styles.trustItem}>
              <i className={`bi ${icon}`} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductRightDetails;
