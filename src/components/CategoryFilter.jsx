import { useSearchParams } from "react-router-dom";

const CategoryFilter = ({ filterCategory, setCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productCategory = searchParams.get("category") || "";


  const categories = [
    { id: "CandleHolders", value: "CandleHolders", label: "Candle Holders" },
    { id: "Flower Vase", value: "Vases", label: "Flower Vase" },
    { id: "KitchenDining", value: "KitchenDining", label: "Kitchen & Dining" },
    { id: "StatuesIdols", value: "StatuesIdols", label: "Statues & Idols" },
    { id: "Coasters", value: "Coasters", label: "Costers" },
    {
      id: "Incense Holders",
      value: "IncenseHolders",
      label: "Incense Holders",
    },
    {
      id: "Decorative Bowls",
      value: "DecorativeBowls",
      label: "Decorative Bowls",
    },
    {
      id: "Serving Platters",
      value: "ServingPlatters",
      label: "Serving Platters",
    },
  ];

  const handleSelectCategory = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategory((prevCat) => [...prevCat, value]);
    } else {
      if (productCategory === value) {
        const params = new URLSearchParams(searchParams);
        params.delete("category");
        setSearchParams(params);
      }
      setCategory((prevCat) => prevCat.filter((cat) => cat !== value));
    }
  };

  return (
    <>
      <div className="py-3">
        <label className="form-check-label">
          <strong>Category </strong>
        </label>

        {categories.map((prodCategory) => (
          <div className="form-check" key={prodCategory.id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={prodCategory.id}
              value={prodCategory.value}
              onChange={handleSelectCategory}
              checked={filterCategory.includes(prodCategory.value)}
            />
            <label className="form-check-label" htmlFor={prodCategory.id}>
              {prodCategory.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
