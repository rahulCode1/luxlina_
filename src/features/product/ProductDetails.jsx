import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { API } from "../../utils/axios";

import ProductItem from "../../components/product/ProductItem";
import SimilarProducts from "../../components/product/SimilarProducts";
import Footer from "../../components/product/Footer";
import ProductReview from "../../components/review/ProductReview";
import FeatureVideosGallary from "../../components/product/FeatureVideosGallary";
import Loading from "../../components/Loading";

import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { product, similarProducts, reviews, featureVideos } =
    useRouteLoaderData("productDetails");

  return (
    <div className={styles.page}>

      {/* ── Product main ── */}
      <Suspense fallback={<Loading />}>
        <Await resolve={product}>
          {(data) => <ProductItem productData={data} />}
        </Await>
      </Suspense>

      {/* ── Feature videos ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>Product Videos</h2>
          <span className={styles.sectionSub}>Feature highlights</span>
        </div>
        <Suspense fallback={<Loading />}>
          <Await resolve={featureVideos}>
            {(data) => (
              <FeatureVideosGallary featureVideos={data?.videos} />
            )}
          </Await>
        </Suspense>
      </div>

      {/* ── Reviews ── */}
      <div className={styles.section}>
        <Suspense fallback={<Loading />}>
          <Await resolve={reviews}>
            {(data) => <ProductReview reviews={data.reviews} />}
          </Await>
        </Suspense>
      </div>

      {/* ── Similar products ── */}
      <div className={styles.similarSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>You May Also Like</h2>
          <span className={styles.sectionSub}>Similar handcrafted pieces</span>
        </div>
        <Suspense fallback={<Loading />}>
          <Await resolve={similarProducts}>
            {(data) => (
              <SimilarProducts similarProducts={data.similarProducts} />
            )}
          </Await>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;

/* ── Loader helpers ──────────────────────────────────────────────────── */

const fetchProduct = async (productId) => {
  try {
    const res = await API.get(`/product/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

const fetchSimilarProducts = async (productId) => {
  try {
    const res = await API.get(`/product/${productId}/similar`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

const fetchReviews = async (productId) => {
  try {
    const res = await API.get(`/products/${productId}/reviews`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

const fetchFeatureVideos = async (productId) => {
  try {
    const res = await API.get(`/feature/${productId}/videos`);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

export const loader = async ({ params }) => {
  const productId = params.id;
  return {
    product: fetchProduct(productId),
    similarProducts: fetchSimilarProducts(productId),
    reviews: fetchReviews(productId),
    featureVideos: fetchFeatureVideos(productId),
  };
};