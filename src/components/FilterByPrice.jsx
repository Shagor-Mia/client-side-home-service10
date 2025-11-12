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
    <form onSubmit={handleFilter} className="flex ">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="input input-bordered  rounded-tr-none rounded-br-none"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="input input-bordered rounded-tl-none rounded-bl-none border-l-0"
      />
      <button
        type="submit"
        className="btn ml-4 bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0 rounded-tr-none rounded-br-none"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="btn btn-ghost border border-gray-300 border-l-0 rounded-tl-none rounded-bl-none"
      >
        Clear
      </button>
    </form>
  );
};

export default FilterByPrice;
