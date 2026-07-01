const CategoryFilter = ({ filterCategory, setCategory }) => {
  const categories = [
    { id: "MortarPestle", value: "MortarPestle", label: "Mortar & Pestle" },
    { id: "SilBatta", value: "SilBatta", label: "Sil & Batta" },
    { id: "ChaklaBelan", value: "ChaklaBelan", label: "Chakla & Belan" },
    { id: "KitchenDining", value: "KitchenDining", label: "Kitchen & Dining" },
    { id: "StatuesIdols", value: "StatuesIdols", label: "Statues & Idols" },
  ];

  const handleSelectCategory = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategory((prevCat) => [...prevCat, value]);
    } else {
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
