import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

const SearchService = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const fetchAxios = useAxios();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = search.trim();

    if (!query) {
      onSearch(""); // reset search if input is cleared
      return;
    }

    try {
      const res = await fetchAxios.get(`/service/search?search=${query}`);
      onSearch(res.data.items); // send search results to parent
    } catch (err) {
      console.error("Error searching services:", err);
      onSearch([]); // empty array on error
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full max-w-xs"
    >
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search services..."
        className="input input-bordered w-full"
      />
      <button
        type="submit"
        className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchService;
