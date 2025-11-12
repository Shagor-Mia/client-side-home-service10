import { useState } from "react";

const FilterByPrice = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(minPrice, maxPrice);
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    onFilter("", "");
  };

  return (
    <form
      onSubmit={handleFilter}
      className="flex flex-col sm:flex-row gap-3 justify-end mb-4"
    >
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="input input-bordered w-full sm:w-40"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="input input-bordered w-full sm:w-40"
      />
      <button
        type="submit"
        className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="btn btn-ghost border border-gray-300"
      >
        Clear
      </button>
    </form>
  );
};

export default FilterByPrice;
