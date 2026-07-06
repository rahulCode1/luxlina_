import { useNavigate, useSearchParams } from "react-router-dom";
import kitchenCategory from "../../imgs/kitchen.jpg";

import religiousCategory from "../../imgs/religious.jpg";

import ganesh from "../../imgs/ganesh.png";
import tray from "../../imgs/tray.jpg";
import newArrivals from "../../imgs/new.jpg";
import deepakCategoryImg from "../../imgs/deepak.png";
import decorativeBowl from "../../imgs/bowl.jpg";
import Bowls from "../../imgs/Bowls.png";
import Vase from "../../imgs/Vase1.png";
import Coster from "../../imgs/Coster1.png";
import outdoor from "../../imgs/outdoor.png";
import gifts from "../../imgs/gifts.jpg";
import styles from "./HomePage.module.css";
import Footer from "../../components/product/Footer";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const categories = [
    {
      name: "Candle Holders",
      category: "CandleHolders",
      imgUrl: deepakCategoryImg,
    },

    {
      name: "Statues & Idols",
      category: "StatuesIdols",
      imgUrl: ganesh,
    },

    {
      name: "Flower Vase",
      category: "Vases",
      imgUrl: Vase,
    },
    {
      name: "Costers",
      category: "Coasters",
      imgUrl: Coster,
    },

    {
      name: "Incense Holders",
      category: "IncenseHolders",
      imgUrl: religiousCategory,
    },

    {
      name: "Kitchen & Dining",
      category: "KitchenDining",
      imgUrl: kitchenCategory,
    },

    {
      name: "Decorative Bowls",
      category: "DecorativeBowls",
      imgUrl: decorativeBowl,
    },
    { name: "Serving Platters", category: "ServingPlatters", imgUrl: tray },
    { name: "Corporate Gifts", category: "CorporateGifts", imgUrl: gifts },
    { name: "Garden Outdoor", category: "GardenOutdoor", imgUrl: outdoor },
  ];

  const newArrival = [
    {
      name: "Tray",
      image: tray,
      details: "White marble tray crafted from premium Makrana stone.",
      category: "HomeDecor",
    },
    {
      name: "Basket",
      image: newArrivals,
      details:
        "Handcrafted white marble basket with detailed carving work, ideal for gifting.",
      category: "CorporateGifts",
    },
  ];

  const handleUpdateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
    navigate(`/products?${params}`);
  };

  return (
    <main
      style={{
        background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <div className="py-4  container">
        <section>
          {/* 1. Categories - Horizontal Scroll with improved touch target */}
          <div
            className="d-flex gap-2 sm:gap-3 w-100  pb-3 custom-scrollbar"
            style={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              // scrollbarWidth: "none", // Hides scrollbar for Firefox
            }}
          >
            {categories.map((data, i) => (
              <div
                key={i}
                onClick={() => handleUpdateParams("category", data.category)}
                className="text-center flex-shrink-0 w-[80px] md:w-[120px]"
              >
                <div
                  className={`w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-circle mx-auto mb-2 overflow-hidden border-2 ${
                    "all" === data.category
                      ? "border border-dark"
                      : "border border-transparent"
                  }`}
                >
                  <img
                    src={data?.imgUrl}
                    alt={data.name}
                    className="w-100 h-100 object-fit-cover"
                    style={{ filter: "brightness(0.95)" }}
                  />
                </div>
                <p
                  className="mb-0 fw-bold text-uppercase"
                  style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
                >
                  {data.name}
                </p>
              </div>
            ))}
          </div>

          <div className="my-4 flex flex-col gap-4">
            {/* Marble Bowl — text left, img right */}
            <div
              onClick={() => handleUpdateParams("category", "DecorativeBowls")}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="md:w-1/2 overflow-hidden">
                <img
                  src={Bowls}
                  alt="Marble Decorative Bowl"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
                />
              </div>

              {/* Content */}
              <div className="flex md:w-1/2 flex-col justify-center p-6 sm:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
                  Spiritual Collection
                </p>

                <h5 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                  Marble Decorative Bowl — Handcrafted Elegance for Every Pooja.
                </h5>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  Crafted from premium white marble, perfect for floating
                  flowers, festive décor, and adding timeless elegance to your
                  home.
                </p>

                <span className="mt-6 inline-flex items-center font-semibold text-orange-600 transition-all duration-300 group-hover:translate-x-2">
                  Explore Collection
                  <span className="ml-2 text-lg">→</span>
                </span>
              </div>
            </div>

            {/* Marble Vase */}
            <div
              onClick={() => handleUpdateParams("category", "Vases")}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="md:w-1/2 overflow-hidden">
                <img
                  src={Vase}
                  alt="White Marble Vase"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
                />
              </div>

              {/* Content */}
              <div className="flex md:w-1/2 flex-col justify-center p-6 sm:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
                  Luxury Home Décor
                </p>

                <h5 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                  Handcrafted Marble Vases — Timeless Elegance for Every
                  Interior.
                </h5>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  Beautifully handcrafted from premium marble, perfect for fresh
                  flowers, dried arrangements, and luxurious home décor.
                </p>

                <span className="mt-6 inline-flex items-center font-semibold text-orange-600 transition-all duration-300 group-hover:translate-x-2">
                  Shop Now
                  <span className="ml-2 text-lg">→</span>
                </span>
              </div>
            </div>

            {/* Marble Coasters */}
            <div
              onClick={() => handleUpdateParams("category", "Coasters")}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col-reverse md:flex-row"
            >
              {/* Content */}
              <div className="flex md:w-1/2 flex-col justify-center p-6 sm:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
                  Table Essentials
                </p>

                <h5 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                  Black Marble Coasters — Protect Your Surfaces with Handcrafted
                  Luxury.
                </h5>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  Crafted from natural black marble, these elegant coasters
                  protect your furniture while adding a premium touch to every
                  table setting.
                </p>

                <span className="mt-6 inline-flex items-center font-semibold text-orange-600 transition-all duration-300 group-hover:translate-x-2">
                  View Collection
                  <span className="ml-2 text-lg">→</span>
                </span>
              </div>

              {/* Image */}
              <div className="md:w-1/2 overflow-hidden">
                <img
                  src={Coster}
                  alt="Black Marble Coasters"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
                />
              </div>
            </div>
          </div>
          {/* 2. Hero Banner - Responsive text and height */}
          <div
            className={styles.container}
            onClick={() => handleUpdateParams("category", "StatuesIdols")}
          >
            {/* Background Image */}
            <img
              src={ganesh}
              alt="Stone Handicraft"
              className={styles.bgImage}
            />

            {/* Overlay Content */}
            <div className={styles.overlay}>
              <div className={styles.content}>
                <p className={styles.subtitle}>Premium Stone Handicrafts</p>

                <h1 className={styles.title}>Timeless Stone Art</h1>

                <div className={styles.divider} />

                <p className={styles.description}>
                  Handcrafted marble sculptures and decor pieces that bring
                  heritage, spirituality and elegance into your home.
                </p>

                <button className={styles.button}>Explore Collection</button>
              </div>
            </div>
          </div>

          {/* 3. New Arrivals - Responsive Grid */}
          <div className="row g-4 mt-4">
            {newArrival.map((product, i) => (
              <div
                className="col-12 col-lg-6"
                key={i}
                onClick={() => handleUpdateParams("category", product.category)}
              >
                <div
                  className="card border-0 shadow-sm rounded-4 overflow-hidden h-100"
                  style={{
                    cursor: "pointer",
                    transition: "all .3s ease",
                  }}
                >
                  {/* Badge */}
                  <span className="position-absolute top-0 start-0 m-3 badge bg-dark px-3 py-2 z-3">
                    NEW
                  </span>

                  <div className="row g-0">
                    {/* Image */}
                    <div className="col-5 col-md-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-100 h-100 object-fit-cover"
                        style={{
                          minHeight: "180px",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="col-7 col-md-8">
                      <div className="card-body h-100 d-flex flex-column justify-content-center p-3 p-md-4">
                        <p
                          className="text-primary text-uppercase fw-semibold mb-2"
                          style={{
                            fontSize: ".7rem",
                            letterSpacing: "2px",
                          }}
                        >
                          New Arrival
                        </p>

                        <h5
                          className="fw-bold mb-2"
                          style={{
                            fontFamily: "serif",
                            fontSize: "clamp(1rem,2vw,1.5rem)",
                          }}
                        >
                          {product.name}
                        </h5>

                        {/* Description */}
                        <p
                          className="text-muted mb-3"
                          style={{
                            fontSize: "clamp(.8rem,1.5vw,.95rem)",
                            lineHeight: "1.6",
                          }}
                        >
                          {product.details}
                        </p>

                        {/* Button */}
                        <div className="mt-auto">
                          <span
                            className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold"
                            style={{
                              fontSize: ".8rem",
                              letterSpacing: ".5px",
                            }}
                          >
                            VIEW DETAILS →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer from="/" />
    </main>
  );
};

export default HomePage;
