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
        <div className={styles.specsBlock}>
          <h4 className={styles.specsTitle}>
            <i className="bi bi-rulers" aria-hidden="true" /> Dimensions &amp;
            Details
          </h4>
          <div className={styles.specsGrid}>
            {SPECS.map(({ label, value, alt }) => (
              <div key={label} className={styles.specItem}>
                <span className={styles.specLabel}>{label}</span>
                <span className={styles.specValue}>
                  {value}
                  {alt && <span className={styles.specAlt}>/ {alt}</span>}
                </span>
              </div>
            ))}
          </div>
          {productInfo.care && (
            <div className={styles.specCare}>
              <i className="bi bi-info-circle" aria-hidden="true" />
              <span>
                <strong>Care:</strong> {productInfo.care}
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
