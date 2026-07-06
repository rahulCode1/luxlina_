import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const PixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return null;
};

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <PixelTracker />
      <Header />
      {isLoading && <div className="global-loader">Loading...</div>}
      <Toaster position="top-center" />
      <Outlet />

      <Footer />
    </>
  );
};


export default Layout;