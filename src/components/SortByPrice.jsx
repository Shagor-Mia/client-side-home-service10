const SortByServiceList = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex justify-end mb-4">
      <label className="form-control w-full max-w-xs">
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by</option>
          <option value="price_asc">Low → High Price</option>
          <option value="price_desc">High → Low Price</option>
        </select>
      </label>
    </div>
  );
};

export default SortByServiceList;
