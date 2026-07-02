// import { privateApi } from "../../utils/axios";
// import { useEcommerce } from "../../context/EcommerceContext";
// import { useState } from "react";

const ProductVariation = ({
  productId,
  revalidator,
  productInfo,
  styles,
  selectedVariation,
  setSearchParams,
}) => {
  // const [ setDeletingVariationId] = useState(null);
  // const { setError,  setIsLoading } = useEcommerce();

  // const handleRemoveProductVariation = async (variationId) => {
  //   try {
  //     setDeletingVariationId(variationId);
  //     setIsLoading(true);
  //     const res = await privateApi.delete(
  //       `product/${productId}/removeVariation/${variationId}`,
  //     );
  //     revalidator.revalidate();
  //     console.log(res.data);
  //   } catch (err) {
  //     setError(err?.response?.data?.message);
  //     console.log(err?.response?.data?.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {productInfo.variations?.length > 0 && (
        <div className={styles.variationsWrapper}>
          {productInfo.variations.map((v) => {
            const discountPct =
              v.price > 0
                ? Math.round(((v.price - v.discountPrice) / v.price) * 100)
                : 0;
            const isActive = v.id === selectedVariation?.id;
            return (
              <div
                key={v.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                className={`${styles.variationCard} ${isActive ? styles.variationCardActive : ""}`}
                onClick={() =>
                  /* FIX: pass object so existing params are not dropped */
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.set("variationId", v.id);
                    return next;
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.set("variationId", v.id);
                      return next;
                    });
                }}
              >
                <p>{v.name}</p>
                <div className={styles.variationPriceRow}>
                  <span className={styles.variationDiscountPrice}>
                    ₹{v.discountPrice}
                  </span>
                  {v.price !== v.discountPrice && (
                    <span className={styles.variationOriginalPrice}>
                      ₹{v.price}
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span className={styles.variationDiscount}>
                      {discountPct}% OFF
                    </span>
                  )}
                </div>
                {v.packQuantity && (
                  <p className={styles.variationPackQty}>
                    Pack of {v.packQuantity}
                  </p>
                )}

                {/* <button
                  onClick={() => handleRemoveProductVariation(v.id)}
                  disabled={isLoading}
                  style={{
                    background: "red",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                    marginTop: "5px",
                  }}
                >
                  {isLoading && v.id === deletingVariationId  ? (
                    <span className="spinner-border spinner-border-sm ms-2" />
                  ) : "remove"}
                 
                </button> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductVariation;
