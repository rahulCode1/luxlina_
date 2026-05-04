import { useLoaderData } from "react-router-dom";
import { privateApi } from "../../utils/axios";
import AllOrders from "../../components/order/AllOrders";

const AllOrdersPage = () => {
  const orders = useLoaderData();
 
  return (
    <>
      <AllOrders orders={orders?.orders} />
    </>
  );
};

export default AllOrdersPage;

export const loader = async () => {
  try {
    const res = await privateApi.get("/order/allOrders");
    
    return res.data;
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
