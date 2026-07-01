import {
  FiLock,
  FiHome,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
} from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartAsync } from "../../features/cart/cartSlice";
import { getAllWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { fetchAllProductsAsync } from "../../features/product/productSlice";
import MenuDropdown from "./MenuDropdown";

const CartIcon = ({ count }) => {
  return (
    <span className="relative inline-flex items-center justify-center">
      <BsCart3 className="text-slate-800" size={28} />

      {count > 0 && (
        <span className="absolute top-[1px] left-[13px] text-[10px] font-bold leading-none">
          {count}
        </span>
      )}
    </span>
  );
};

/* ─────────────────────────────────────────────────
   Header
───────────────────────────────────────────────── */
const Header = () => {
  const [enteredText, setEnteredText] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const { handleLogout, setSearchText, isLogin } = useEcommerce();
  const { cart: productCart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [menuOpen, setMenuOpen] = useState(false);
  const desktopMenuRef = useRef();
  const mobileMenuRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (isLogin) {
      dispatch(getAllCartAsync());
      dispatch(getAllWishlistAsync());
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const logout = () => {
    handleLogout(navigate);
    closeMenu();
  };

  const cancelSearch = () => {
    setEnteredText("");
    setSearchText("");
  };

  const handleSearch = () => {
    if (!enteredText.trim()) return;

    if (location.pathname !== "/products") {
      navigate("/products");
    }
    setSearchText(enteredText);
  };



  return (
    <header
      className="w-screen sticky top-0  bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md"
      style={{ zIndex: 1050 }}
    >
      {/* Desktop View */}
      <nav
        className={`hidden px-4 py-1 md:flex justify-between items-center gap-4`}
      >
        <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-violet-700 to-indigo-400 bg-clip-text text-transparent">
          Handcrafted
        </h1>
        <div className="relative hidden w-full max-w-[580px] md:block mx-4 ">
          <input
            type="text"
            placeholder="Search products..."
            value={enteredText}
            onChange={(e) => setEnteredText(e.target.value)}
            className="
      h-10
      w-full
      rounded-full
      border
      border-slate-300
      bg-white
      pl-4
      pr-20
      text-sm
      text-slate-700
      placeholder:text-slate-400
      shadow-sm
      outline-none
      transition-all
      duration-200
      focus:border-violet-500
      focus:ring-2
      focus:ring-violet-200
      focus:shadow-md
    "
          />

          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {enteredText && (
              <button
                type="button"
                onClick={cancelSearch}
                className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          text-slate-500
          transition
          duration-200
          hover:bg-slate-100
          hover:text-black
        "
              >
                <FiX size={15} />
              </button>
            )}

            <button
              type="button"
              onClick={handleSearch}
              className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-slate-100
        text-slate-700
        transition-all
        duration-200
        hover:bg-violet-100
        hover:text-violet-700
        active:scale-95
      "
            >
              <FiSearch size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2  py-2 rounded-md transition-all">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black"} flex flex-col items-center no-underline hover:bg-slate-200 rounded py-1 px-2`
            }
          >
            <FiHome size={18} />
            <span className="text-[10px] ">Home </span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black"} flex flex-col items-center no-underline hover:bg-slate-200 rounded py-1 px-2`
            }
          >
            <FiShoppingBag size={18} />
            <span className="text-[10px] ">Products</span>
          </NavLink>

          {isLogin && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black"} relative flex flex-col items-center no-underline hover:bg-slate-200 rounded py-1 px-2`
              }
            >
              <FiShoppingCart size={18} />
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-0 bg-blue-500 text-white text-[9px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
              <span className="text-[10px]">Cart</span>
            </NavLink>
          )}

          {!isLogin && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black"} flex flex-col items-center no-underline hover:bg-slate-200 rounded py-1 px-2`
              }
            >
              <FiLock className="mb-0 pb-0" size={18} />
              <span className="text-[10px] ">Login</span>
            </NavLink>
          )}
          <div className="relative" ref={desktopMenuRef}>
            {isLogin && (
              <button
                className="text-xs flex flex-col items-center hover:bg-slate-200 rounded py-1 px-2  "
                onClick={() => setMenuOpen((prevStat) => !prevStat)}
              >
                {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                <span className="text-[10px]">Menu </span>
              </button>
            )}

            {menuOpen && (
              <MenuDropdown
                logout={logout}
                wishlist={wishlist}
                closeMenu={closeMenu}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile device */}
      <nav className="mx-4 my-1">
        <div className="flex justify-between items-center gap-4 md:hidden">
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-violet-700 to-indigo-400 bg-clip-text text-transparent">
            Handcrafted
          </h1>

          <div className="flex flex-row items-center gap-2">
            {!toggleSearch && (
              <button
                onClick={() => setToggleSearch((prevStat) => !prevStat)}
                className="flex flex-col items-center"
              >
                <FiSearch size={16} />
                <span className="text-[10px]">Search </span>
              </button>
            )}
            {toggleSearch && (
              <button
                onClick={() => setToggleSearch((prevStat) => !prevStat)}
                className="flex flex-col items-center"
              >
                <FiX size={18} />
                <span className="text-[10px]">Close </span>
              </button>
            )}

            {isLogin && (
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `no-underline ${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black"} flex flex-col items-center hover:bg-slate-200 rounded py-1 px-2`
                }
              >
                <CartIcon count={totalItemsInCart} />
                <span className="text-[10px]  mt-0 pt-0">Cart</span>
              </NavLink>
            )}

            {!isLogin && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black"} flex flex-col items-center no-underline hover:bg-slate-200 rounded py-1 px-2`
                }
              >
                <FiLock className="mb-0 pb-0" size={18} />
                <span className="text-[10px] ">Login</span>
              </NavLink>
            )}
            <div className="relative" ref={mobileMenuRef}>
              {isLogin && (
                <button
                  className="text-xs flex flex-col items-center hover:bg-slate-200 rounded py-1  "
                  onClick={() => setMenuOpen((prevStat) => !prevStat)}
                >
                  {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                  <span>Menu </span>
                </button>
              )}

              {menuOpen && (
                <MenuDropdown
                  logout={logout}
                  wishlist={wishlist}
                  closeMenu={closeMenu}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={`relative mx-auto  md:hidden overflow-hidden transition-all duration-300 ${toggleSearch ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={enteredText}
            onChange={(e) => setEnteredText(e.target.value)}
            className="
      h-11
      w-full
      rounded-full
      border
      border-slate-300
      bg-white
      pl-4
      pr-20
      text-sm
      text-slate-700
      placeholder:text-slate-400
      shadow-sm
      outline-none
      transition-all
      duration-200
      focus:border-violet-500
      focus:ring-2
      focus:ring-violet-200
      focus:shadow-md
    "
          />

          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {enteredText && (
              <button
                type="button"
                onClick={cancelSearch}
                className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          text-slate-500
          transition-all
          duration-200
          hover:bg-slate-100
          hover:text-black
          active:scale-95
        "
              >
                <FiX size={15} />
              </button>
            )}

            <button
              type="button"
              onClick={handleSearch}
              className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-slate-100
        text-slate-700
        transition-all
        duration-200
        hover:bg-violet-100
        hover:text-violet-700
        active:scale-95
      "
            >
              <FiSearch size={16} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
