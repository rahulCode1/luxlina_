import { Await, useLoaderData } from "react-router-dom";
import { privateApi } from "../../utils/axios";
import BuyNow from "../../components/order/BuyNow";
import { Suspense } from "react";
import Loading from "../../components/Loading";

const BuyNowPage = () => {
  const { buyNow } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={buyNow}>
        {(isDataLoad) => <BuyNow info={isDataLoad?.item} />}
      </Await>
    </Suspense>
  );
};

export default BuyNowPage;

const buyNowItem = async (variationId) => {
  try {
    const res = await privateApi.get(`/order/getBuyNowItem/${variationId}`);

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

export const loader = async ({ req, params }) => {
  const variationId = params.variationId;
  return {
    buyNow: buyNowItem(variationId),
  };
};
