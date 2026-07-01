import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import ScrollToTopBtn from "../../components/scroll/ScrollToTopBtn";
import ProductFilters from "./filters/ProductFilters";
import { useEcommerce } from "../../context/EcommerceContext";

const ProductsList = ({ productsList }) => {
  const [changePrice, setChangePrice] = useState(5000);
  const [category, setCategory] = useState([]);
  const [productRating, setProductRating] = useState(0);
  const { searchText } = useEcommerce();

  const [sortBy, setSortBy] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const productCategory = searchParams.get("category") || "";

  // Sync URL category with checkbox state when component mounts or URL changes
  useEffect(() => {
    if (productCategory && !category.includes(productCategory)) {
      setCategory([productCategory]);
    }
  }, [productCategory, category]);

 

  let filteredProducts = searchText
    ? productsList.filter(
        (product) =>
          product.variations.some((variation) =>
            variation.name.toLowerCase().includes(searchText.toLowerCase()),
          ) ||
          product?.metaTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          product?.metaDescription
            .toLowerCase()
            .includes(searchText.toLowerCase()),
      )
    : productsList;

  filteredProducts = filteredProducts.filter((product) =>
    product.variations.some(
      (vari) => Number(vari.discountPrice) <= Number(changePrice),
    ),
  );

  filteredProducts =
    category.length !== 0
      ? filteredProducts.filter((product) =>
          category.includes(product.category),
        )
      : filteredProducts;

  filteredProducts =
    productRating === 0
      ? filteredProducts
      : filteredProducts.filter((product) => product.rating >= productRating);

  filteredProducts = [...filteredProducts];
  if (sortBy === "HighToLow") {
    filteredProducts = filteredProducts.sort(
      (a, b) => b.variations[0]?.discountPrice - a.variations[0]?.discountPrice,
    );
  } else if (sortBy === "LowToHigh") {
    filteredProducts = filteredProducts.sort(
      (a, b) => a.variations[0]?.discountPrice - b.variations[0]?.discountPrice,
    );
  }

  const handleClearFilter = () => {
    const toastId = toast.loading("removing filters...");
    setChangePrice(5000);
    setCategory([]);

    searchParams.delete("category");
    searchParams.delete("search");
    setSearchParams(searchParams);
    setSortBy("");
    setProductRating(0);
    toast.success("All filters removed", { id: toastId });
  };

  return (
    <>
      <main
        className="py-2"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
          minHeight: "100vh",
        }}
      >
        <div
          className="row g-0 position-relative"
          style={{
            maxWidth: "1400px",
            margin: "auto",
          }}
        >
          <ScrollToTopBtn />

          {/* Filters for mobile and desktop */}
          <ProductFilters
            category={category}
            setCategory={setCategory}
            changePrice={changePrice}
            handleClearFilter={handleClearFilter}
            productRating={productRating}
            setChangePrice={setChangePrice}
            setProductRating={setProductRating}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />

          <ProductGrid
            filteredProducts={filteredProducts}
            handleClearFilter={handleClearFilter}
            productCategory={productCategory}
          />
        </div>
      </main>
    </>
  );
};

export default ProductsList;
