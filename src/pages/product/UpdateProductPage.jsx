import { Await, useRouteLoaderData } from "react-router-dom";
import UpdateProduct from "../../components/product/UpdatedProduct";
import { Suspense } from "react";

const UpdateProductPage = () => {
  const { product } = useRouteLoaderData("productDetails");

  return (
    <Suspense>
      <Await resolve={product}>
        {(isProductLoad) => <UpdateProduct product={isProductLoad?.product} />}
      </Await>
    </Suspense>
  );
};

export default UpdateProductPage;
