const totalPrice = (productCart) => {
  return productCart.reduce(
    (acc, curr) =>
      acc + Number(curr.selectedVariation.discountPrice) * curr.quantity,
    0,
  );
};
const totalQuantity = (productCart) => {
  return productCart.reduce((acc, curr) => acc + curr.quantity, 0);
};
const totalDiscount = (productCart) => {
  return productCart.reduce(
    (acc, curr) =>
      acc + (Number(curr.price) - Number(curr.selectedVariation.discountPrice)),
    0,
  );
};

export { totalPrice, totalQuantity, totalDiscount };
