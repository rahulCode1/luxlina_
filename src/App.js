import "./App.css";
import "swiper/swiper-bundle.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import EcommerceProvider from "./context/EcommerceContext";
import AddProducts from "./features/product/AddProducts";
import AddAddress from "./features/address/AddAddress";
import Checkout from "./pages/order/Checkout";
import NotFound from "./components/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import ProtectedRoutes from "./pages/auth/ProtectedRoutes";
import UpdateProductPage from "./pages/product/UpdateProductPage.jsx";
import AllOrdersPage, {
  loader as allOrdersLoader,
} from "./pages/order/AllOrdersPage.jsx";

const Products = lazy(() => import("./features/product/Products"));
const ProductDetails = lazy(() => import("./features/product/ProductDetails"));
const Cart = lazy(() => import("./features/cart/Cart"));
const Wishlist = lazy(() => import("./features/wishlist/Wishlist"));
const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage"));
const UserOrdersPage = lazy(() => import("./pages/order/UserOrdersPage"));
const OrderDetailsPage = lazy(() => import("./pages/order/OrderDetailsPage"));
const AllAddress = lazy(() => import("./features/address/AllAddress"));
const UpdateAddressPage = lazy(
  () => import("./features/address/UpdateAddressPage"),
);
const LoginWithOtp = lazy(() => import("./features/user/LoginWithOtp"));
const BuyNowPage = lazy(() => import("./pages/order/BuyNowPage"));
const ReturnRefund = lazy(() => import("./pages/help/ReturnRefund.jsx"));
const ShippingPolicy = lazy(() => import("./pages/help/ShippingPolicy.jsx"));
const FAQs = lazy(() => import("./pages/help/FAQs.jsx"));
const ContactUs = lazy(() => import("./pages/help/ContactUs.jsx"));
const AboutUs = lazy(() => import("./pages/help/AboutUs.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/help/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(
  () => import("./pages/help/TermsAndConditions.jsx"),
);
const CancellationPolicy = lazy(
  () => import("./pages/help/CancellationPolicy.jsx"),
);
const OurArtisans = lazy(() => import("./pages/help/OurArtisans.jsx"));
const Sustainability = lazy(() => import("./pages/help/Sustainability.jsx"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <Products />,
            },
            {
              path: "add",
              element: (
                <ProtectedRoutes>
                  <AddProducts />
                </ProtectedRoutes>
              ),
            },
            {
              path: ":id",
              id: "productDetails",
              loader: (meta) =>
                import("./features/product/ProductDetails").then((module) =>
                  module.loader(meta),
                ),
              children: [
                {
                  index: true,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ProductDetails />
                    </Suspense>
                  ),
                },
                {
                  path: "edit",
                  element: <UpdateProductPage />,
                },
              ],
            },
          ],
        },

        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoutes>
                  <AllAddress />
                </ProtectedRoutes>
              ),
            },
            {
              path: "addAddress",
              element: (
                <ProtectedRoutes>
                  <AddAddress />
                </ProtectedRoutes>
              ),
            },
            {
              path: ":id",
              element: (
                <Suspense fallback={<Loading />}>
                  <ProtectedRoutes>
                    <UpdateAddressPage />
                  </ProtectedRoutes>
                </Suspense>
              ),
              loader: (meta) =>
                import("./features/address/UpdateAddressPage").then((module) =>
                  module.loader(meta),
                ),
            },
          ],
        },

        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "buyNow",
          element: (
            <ProtectedRoutes>
              <BuyNowPage />
            </ProtectedRoutes>
          ),
          loader: () =>
            import("./pages/order/BuyNowPage").then((module) =>
              module.loader(),
            ),
        },
        {
          path: "orders",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loading />}>
                  <ProtectedRoutes>
                    <UserOrdersPage />
                  </ProtectedRoutes>
                </Suspense>
              ),
              loader: () =>
                import("./pages/order/UserOrdersPage").then((module) =>
                  module.loader(),
                ),
            },
            {
              path: ":id",
              element: (
                <Suspense fallback={<Loading />}>
                  <ProtectedRoutes>
                    <OrderDetailsPage />
                  </ProtectedRoutes>
                </Suspense>
              ),
              loader: (meta) =>
                import("./pages/order/OrderDetailsPage").then((module) =>
                  module.loader(meta),
                ),
            },
          ],
        },
        {
          path: "user",
          element: (
            <ProtectedRoutes>
              <UserProfilePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: <LoginWithOtp />,
        },

        {
          path: "terms",
          element: <TermsAndConditions />,
        },
        {
          path: "shipping-policy",
          element: <ShippingPolicy />,
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
        {
          path: "returns",
          element: <ReturnRefund />,
        },
        {
          path: "faqs",
          element: <FAQs />,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "cancellation",
          element: <CancellationPolicy />,
        },
        {
          path: "artisans",
          element: <OurArtisans />,
        },
        {
          path: "sustainability",
          element: <Sustainability />,
        },
        {
          path: "admin",
          element: (
            <ProtectedRoutes>
              <AllOrdersPage />
            </ProtectedRoutes>
          ),
          loader: allOrdersLoader,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <EcommerceProvider>
      <RouterProvider router={router} />
    </EcommerceProvider>
  );
}

export default App;
