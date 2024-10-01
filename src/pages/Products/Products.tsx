import React, { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import Card from "../../comoponents/ui/Card";


const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("price");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);

  const { data: productsData, isLoading, error, refetch } = useGetAllProductsQuery({
    searchTerm: searchTerm || "",
    sort: sortOrder || "price",
    minPrice: minPrice >= 0 ? minPrice : 0,
    maxPrice: maxPrice < Infinity ? maxPrice : Infinity,
    page: page > 0 ? page : 1,
    limit: limit,
  });

  useEffect(() => {
    refetch();
  }, [searchTerm, sortOrder, minPrice, maxPrice, page, limit, refetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("price");
    setMinPrice(0);
    setMaxPrice(Infinity);
    setPage(1);
    setLimit(2);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset to first page when limit changes
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Something went wrong. Please try again later.</p>;

  const totalPages = productsData?.data?.totalPages || 1;

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">Explore Our Exclusive Products</h2>

      <form className="mb-12 py-6 flex flex-wrap items-start justify-between bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto space-y-4 md:space-y-0">
        {/* Search Field */}
        <div className="w-full md:w-2/5">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search by name or brand</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Price, Sort and Limit Fields */}
        <div className="flex flex-wrap md:flex-nowrap justify-between md:space-x-4 w-full md:w-3/5">
          {/* Min Price */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price</label>
            <input
              id="minPrice"
              type="number"
              placeholder="Min"
              value={minPrice === 0 ? "" : minPrice}
              onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : 0)}
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Max Price */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price</label>
            <input
              id="maxPrice"
              type="number"
              placeholder="Max"
              value={maxPrice === Infinity ? "" : maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : Infinity)}
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Sort Order */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort by</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>

          {/* Limit Selection */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Products per page</label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <button
            type="button"
            className="w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-200"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {productsData?.data?.results?.map((product: TProduct) => (
          <Card key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)} // Go to previous page
        >
          Previous
        </button>

        {/* Page Buttons */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          if (
            pageIndex === 1 || 
            pageIndex === totalPages || 
            (pageIndex >= page - 1 && pageIndex <= page + 1)
          ) {
            return (
              <button
                key={pageIndex}
                className={`px-4 py-2 mx-1 rounded-lg ${page === pageIndex ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
          return null;
        })}

        {/* Next Button */}
        <button
          className={`px-4 py-2 mx-1 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)} // Go to next page
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
