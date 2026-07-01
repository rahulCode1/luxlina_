import { NavLink } from "react-router-dom";
import { FiUser, FiLogOut, FiMapPin, FiPackage } from "react-icons/fi";
import styles from "./Header.module.css";

const WishlistIcon = ({ count }) => (
  <span className={`${styles.iconWrap} flex items-center justify-center`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

const navItemClass = ({ isActive }) =>
  `
    flex items-center gap-3
    w-full
    rounded-lg
    px-3
    py-2
    text-sm
    no-underline
    transition-all
    duration-200
    ${
      isActive
        ? "bg-violet-100 text-violet-700 font-semibold"
        : "text-slate-700 hover:bg-violet-50 hover:text-violet-700"
    }
`;

const MenuDropdown = ({  wishlist, closeMenu, logout }) => {
  return (
    <div
      style={{ zIndex: 1050 }}
      className={`
        absolute
        right-0
        top-full
        mt-2
        w-64
        md:w-72
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-xl
      
      `}
    >
      <ul className="space-y-1 p-2">
        <li onClick={closeMenu}>
          <NavLink to="/wishlist" className={navItemClass}>
            <WishlistIcon count={wishlist.length} />
            <span>Wishlist</span>
          </NavLink>
        </li>

        <li onClick={closeMenu}>
          <NavLink to="/address" className={navItemClass}>
            <FiMapPin size={18} />
            <span>Address</span>
          </NavLink>
        </li>

        <li onClick={closeMenu}>
          <NavLink to="/orders" className={navItemClass}>
            <FiPackage size={18} />
            <span>My Orders</span>
          </NavLink>
        </li>

        <li onClick={closeMenu}>
          <NavLink to="/user" className={navItemClass}>
            <FiUser size={18} />
            <span>Profile</span>
          </NavLink>
        </li>

        <div className="my-1 border-t border-slate-200" />

        <li>
          <button
            onClick={logout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-red-600
              transition-all
              duration-200
              hover:bg-red-50
              hover:text-red-700
            "
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuDropdown;
