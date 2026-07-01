import { useParams, useRevalidator, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import ProductImageCarousel from "./ProductImageCarousel";
import { getAllCartAsync } from "../../features/cart/cartSlice";
import styles from "./ProductItem.module.css";
import AdminFeatures from "./AdminFeatures";
import ErrorModal from "../ErrorModal";
import { useEcommerce } from "../../context/EcommerceContext";
import ProductRightDetails from "./ProductRightDetails";


const ProductItem = ({ productData }) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { error, setError } = useEcommerce();
  const [selectedVariation, setSelectedVariation] = useState(null);
  const revalidator = useRevalidator();
  const userId = localStorage.getItem("userId") || "";

  const dispatch = useDispatch();
  const productId = useParams().id;
  const productInfo = productData?.product;
  const token = localStorage.getItem("token");
  const variationId = searchParams.get("variationId");

  useEffect(() => {
    if (token) dispatch(getAllCartAsync());
  }, [dispatch, token]);

  useEffect(() => {
    if (!productInfo?.variations?.length) return;
    if (variationId) {
      const found = productInfo.variations.find((v) => v?.id === variationId);
      if (found) {
        setSelectedVariation(found);
        return;
      }
    }
    const def = productInfo.variations.find((v) => v.isDefault);
    setSelectedVariation(def || productInfo.variations[0]);
  }, [variationId, productInfo]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  /* FIX: guard against missing productInfo before rendering */
  if (!productInfo) return null;

  const isOwner = productInfo.createdBy === userId;

  return (
    <>
    
      <main className={styles.mainContainer}>
        {error && <ErrorModal message={error} onClose={() => setError(null)} />}

        <div className={styles.container}>
          {/* ── Left: Image ── */}
          <div className={styles.imgColumn}>
            <div className={styles.imgContainer}>
              <ProductImageCarousel images={selectedVariation?.images} />
            </div>
          </div>

          {/* ── Right: Details ── */}
          <ProductRightDetails
            token={token}
            productId={productId}
            productInfo={productInfo}
            revalidator={revalidator}
            selectedVariation={selectedVariation}
            setError={setError}
            setSearchParams={setSearchParams}
            styles={styles}
          />
        </div>

        <div className="mt-5">
          {/* ── Admin section (owner only) ── */}
          {isOwner && (
            <div className="my-4">
              <button
                className={`${styles.adminToggleBtn} ${showAdmin ? styles.adminToggleBtnOpen : ""}`}
                onClick={() => setShowAdmin((p) => !p)}
                aria-expanded={showAdmin}
              >
                <i className="bi bi-shield-lock-fill" aria-hidden="true" />
                Admin Controls
                {/* FIX: dedicated class so only this icon rotates */}
                <i
                  className={`bi bi-chevron-down ${styles.adminChevron}`}
                  aria-hidden="true"
                />
              </button>

              {showAdmin && (
                <div className={styles.adminWrapper}>
                  <AdminFeatures
                    productId={productId}
                    media={selectedVariation?.images}
                    setError={setError}
                    revalidator={revalidator}
                    variationId={selectedVariation?.id}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductItem;
