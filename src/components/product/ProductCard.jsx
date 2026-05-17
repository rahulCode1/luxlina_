

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { addOrRemoveWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { useState } from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, from }) {
  const { cart: productCart, addTocartLoading } = useSelector(
    (state) => state.cart,
  );
  const { wishlist, toggleWishlistLoading } = useSelector(
    (state) => state.wishlist,
  );
  const [productId, setProductId] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isWishlisted = (id) => wishlist.some((p) => p.id === id);
  const isInCart = (id) => productCart.some((c) => c.id === id);

  const handleAddToCart = async (product, quantity) => {
    if (!token) return navigate("/login");
    const toastId = toast.loading("Adding to cart...");

    try {
      setProductId(product.id);
      const res = await dispatch(
        addToCartAsync({ productId: product.id, quantity }),
      ).unwrap();
      setProductId("");

      if (window.fbq && res) {
        window.fbq("track", "AddToCart", {
          content_name: product.name,
          content_ids: [product.id],
          value: product.discountPrice,
          currency: "INR",
          contents: [
            {
              id: product.id,
              quantity: quantity,
            },
          ],
        });
      }

      toast.success(res.message || "Product added to cart.", { id: toastId });
    } catch (error) {
      toast.error(error || "Failed to add product to cart.", { id: toastId });
    }
  };

  const handleAddToWishList = async (productId, type) => {
    if (!token) return navigate("/login");
    const toastId = toast.loading(
      type === "add" ? "Adding to wishlist..." : "Removing from wishlist...",
    );
    try {
      setProductId(productId);
      const res = await dispatch(
        addOrRemoveWishlistAsync({ productId }),
      ).unwrap();
      toast.success(
        res.message ||
          (type === "remove" ? "Removed from wishlist" : "Added to wishlist."),
        { id: toastId },
      );
      setProductId("");
    } catch (error) {
      toast.error(
        error ||
          (type === "add"
            ? "Failed to add to wishlist."
            : "Failed to remove from wishlist."),
        { id: toastId },
      );
    }
  };

  const isCartLoading =
    product.id === productId && addTocartLoading === "loading";
  const isWishlistLoading =
    toggleWishlistLoading === "loading" && product.id === productId;

  // Calculate discount % if both prices exist
  const discountPercent =
    product.originalPrice && product.originalPrice > product.discountPrice
      ? Math.round(
          ((product.originalPrice - product.discountPrice) /
            product.originalPrice) *
            100,
        )
      : null;

  return (
    <div className={styles.cardContainer}>
      {/* ── Image Wrapper (ratio-locked) ── */}
      <div className={styles.imgWrapper}>
        <Link to={`/products/${product.id}`} className="d-block h-100">
          <img
            src={product.images[0].url}
            alt={product.name}
            className={styles.imgStyle}
          />
          <div className={styles.imgOverlay} />
        </Link>

        {/* Discount Badge */}
        {discountPercent && (
          <span className={styles.discountBadge}>{discountPercent}% off</span>
        )}

        {/* Wishlist Button */}
        <button
          disabled={isWishlistLoading}
          onClick={() =>
            handleAddToWishList(
              product.id,
              isWishlisted(product.id) ? "remove" : "add",
            )
          }
          className={styles.wishlistBtn}
        >
          {!isWishlistLoading && (
            <i
              className={`bi bi-heart${isWishlisted(product.id) ? "-fill" : ""}`}
              style={{
                color: isWishlisted(product.id) ? "#ef4444" : "#7c3aed",
                fontSize: 13,
              }}
            />
          )}
          {isWishlistLoading && (
            <span className="spinner-border spinner-border-sm" />
          )}
        </button>
      </div>

      {/* ── Card Body ── */}
      <div className={styles.cardBody}>
        {/* Name */}
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <h6 className={styles.productName}>{product.name}</h6>
        </Link>

        {/* Rating */}
        <div className={styles.ratingRow}>
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className={`bi bi-star${index < Math.floor(product.rating) ? "-fill" : ""}`}
              style={{
                fontSize: 10,
                color:
                  index < Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb",
              }}
            />
          ))}
          <span className={styles.ratingValue}>
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.discountPrice}>
            ₹{product.discountPrice.toLocaleString()}
          </span>
          {product.originalPrice &&
            product.originalPrice > product.discountPrice && (
              <span className={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
        </div>

        {/* Action Button */}
        <div className={styles.actionBtn}>
          {isInCart(product.id) ? (
            <Link
              to="/cart"
              state={{ from: from }}
              className={styles.viewCartBtn}
            >
              <i className="bi bi-cart-check-fill" style={{ fontSize: 12 }} />
              View in Cart
            </Link>
          ) : (
            <button
              disabled={isCartLoading}
              onClick={() => handleAddToCart(product, 1)}
              className={styles.cartBtn}
            >
              <i className="bi bi-cart-plus-fill" style={{ fontSize: 12 }} />
              {isCartLoading ? "Adding…" : "Add to Cart"}
              {isCartLoading && (
                <span className="spinner-border spinner-border-sm ms-1" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}