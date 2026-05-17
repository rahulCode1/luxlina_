import { Await, useRouteLoaderData } from "react-router-dom";
import ProductItem from "../../components/product/ProductItem";
import { Suspense } from "react";
import Loading from "../../components/Loading";
import { API } from "../../utils/axios";
import SimilarProducts from "../../components/product/SimilarProducts";
import Footer from "../../components/product/Footer";
import ProductReview from "../../components/review/ProductReview";

const ProductDetails = () => {
  const { product, similarProducts, reviews } =
    useRouteLoaderData("productDetails");

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={product}>
          {(isProductLoad) => <ProductItem productData={isProductLoad} />}
        </Await>
      </Suspense>

         <div >
        <h2 >You May Also Like</h2>
        <span >Similar handcrafted pieces</span>
      </div>


      <Suspense fallback={<Loading />}>
        <Await resolve={similarProducts}>
          {(isSimilarProdLoad) => (
            <SimilarProducts
              similarProducts={isSimilarProdLoad.similarProducts}
            />
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Await resolve={reviews}>
          {(isProdReviewsLoad) => (
            <ProductReview reviews={isProdReviewsLoad.reviews} />
          )}
        </Await>
      </Suspense>

      <Footer />
    </>
  );
};

export default ProductDetails;

const productDetails = async (productId) => {
  try {
    const res = await API.get(`/product/${productId}`);

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

const similarProducts = async (productId) => {
  try {
    const res = await API.get(`/product/${productId}/similar`);

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

const productReviews = async (productId) => {
  try {
    const res = await API.get(`/products/${productId}/reviews`);

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};
export const loader = async ({ request, params }) => {
  const productId = params.id;

  return {
    product: productDetails(productId),
    similarProducts: similarProducts(productId),
    reviews: productReviews(productId),
  };
};
