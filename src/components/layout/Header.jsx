import {
  FiLock,
  FiHome,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiMapPin,
  FiPackage,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartAsync } from "../../features/cart/cartSlice";
import { getAllWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { fetchAllProductsAsync } from "../../features/product/productSlice";
import styles from "./Header.module.css";
import cart from "../../imgs/cart.png";

/* ─────────────────────────────────────────────────
   Amazon-style icons: count drawn inside the SVG
───────────────────────────────────────────────── */
const CartIcon = ({ count }) => (
  <span style={{ position: "relative" }}>
    <img src={cart} style={{ width: count > 9 ? "22px" : "20px" }} alt="Cart" />
    <span
      style={{
        position: "absolute",
        top: `${count > 9 ? "-2px" : "-4px"}`,
        left: `${count > 9 ? "7px" : "9px"}`,
        fontSize: `${count > 9 ? "0.7rem" : "0.8rem"}`,
      }}
    >
      {count}
    </span>
  </span>
);

const WishlistIcon = ({ count }) => (
  <span className={styles.iconWrap}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      {count > 0 && (
        <text
          x="12"
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="5.8"
          fontWeight="800"
          stroke="none"
          fill="currentColor"
          fontFamily="inherit"
        >
          {count > 99 ? "99+" : count}
        </text>
      )}
    </svg>
  </span>
);

/* ─────────────────────────────────────────────────
   Header
───────────────────────────────────────────────── */
const Header = () => {
  const { handleLogout } = useEcommerce();
  const { cart: productCart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (token) {
      dispatch(getAllCartAsync());
      dispatch(getAllWishlistAsync());
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const navLinkClass = ({ isActive }) =>
    `${styles.navTab} ${isActive ? styles.activeTab : ""}`;

  return (
    <>
      {menuOpen && <div className={styles.backdrop} onClick={closeMenu} />}

      <nav className={styles.navbar} ref={menuRef}>
        <div className={styles.inner}>
          {/* Logo */}
          <NavLink
            to="/"
            state={{ from: "/" }}
            className={styles.brand}
            onClick={closeMenu}
          >
            It's Handicrafted
          </NavLink>

          {/* Nav items */}
          <div className={styles.navItems}>
            {/* Home — desktop only */}
            <NavLink
              to="/"
              end
              className={`${styles.navTab} ${styles.desktopTab}`}
              state={{ from: "/" }}
              style={({ isActive }) =>
                isActive
                  ? { color: "#4f46e5", borderBottomColor: "#4f46e5" }
                  : {}
              }
              onClick={closeMenu}
            >
              <FiHome size={22} />
              <span className={styles.navLabel}>Home</span>
            </NavLink>

            {/* Shop — desktop only */}
            <NavLink
              to="/products"
              state={{ from: "/products" }}
              className={`${styles.navTab} ${styles.desktopTab}`}
              style={({ isActive }) =>
                isActive
                  ? { color: "#4f46e5", borderBottomColor: "#4f46e5" }
                  : {}
              }
              onClick={closeMenu}
            >
              <FiShoppingBag size={22} />
              <span className={styles.navLabel}>Shop</span>
            </NavLink>

            {/* Cart — always visible when logged in */}
            {token && (
              <NavLink
                to="/cart"
                state={{ from: "/cart" }}
                className={navLinkClass}
                onClick={closeMenu}
                aria-label="Cart"
              >
                <CartIcon count={totalItemsInCart} />

                <span className={styles.navLabel}>Cart</span>
              </NavLink>
            )}

            {/* Hamburger — only shown when logged in */}
            {token && (
              <button
                className={`${styles.hamBtn} ${menuOpen ? styles.hamOpen : ""}`}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className={styles.hamIcon}>
                  {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </span>
                <span className={styles.navLabel}>Menu</span>
              </button>
            )}

            {/* Login — shown directly in navbar when logged out */}
            {!token && (
              <NavLink to="/login" className={navLinkClass}>
                <FiLock size={22} />
                <span className={styles.navLabel}>Login</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* ── Dropdown ── */}
        <div
          className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ""}`}
        >
          {/* Home & Shop — mobile only inside drawer */}
          <NavLink
            to="/"
            end
            state={{ from: "/" }}
            className={`${styles.dropItem} ${styles.mobileDropItem}`}
            onClick={closeMenu}
          >
            <FiHome size={16} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/products"
            state={{ from: "/products" }}
            className={`${styles.dropItem} ${styles.mobileDropItem}`}
            onClick={closeMenu}
          >
            <FiShoppingBag size={16} />
            <span>Shop</span>
          </NavLink>

          {token && (
            <>
              {/* Wishlist — inside drawer on ALL screen sizes */}
              <NavLink
                to="/wishlist"
                state={{ from: "/wishlist" }}
                className={styles.dropItem}
                onClick={closeMenu}
              >
                <WishlistIcon count={wishlist.length} />
                <span>Wishlist</span>
                {wishlist.length > 0 && (
                  <span className={styles.dropCount}>{wishlist.length}</span>
                )}
              </NavLink>

              <NavLink
                to="/user"
                state={{ from: "/user" }}
                className={styles.dropItem}
                onClick={closeMenu}
              >
                <FiUser size={16} />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/address"
                state={{ from: "/address" }}
                className={styles.dropItem}
                onClick={closeMenu}
              >
                <FiMapPin size={16} />
                <span>My Address</span>
              </NavLink>
              <NavLink
                to="/orders"
                state={{ from: "/orders" }}
                className={styles.dropItem}
                onClick={closeMenu}
              >
                <FiPackage size={16} />
                <span>My Orders</span>
              </NavLink>

              <button
                className={`${styles.dropItem} ${styles.dropItemBtn} ${styles.dropItemDanger}`}
                onClick={() => {
                  closeMenu();
                  handleLogout(navigate);
                }}
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          )}

          {!token && (
            <NavLink
              to="/login"
              className={styles.dropItem}
              onClick={closeMenu}
            >
              <FiLock size={16} />
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
