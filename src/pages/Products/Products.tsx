import React, { useState, useEffect } from "react"; 
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import Card from "../../comoponents/ui/Card";


const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOrder, setSortOrder] = useState("price"); 
  const [minPrice, setMinPrice] = useState<number>(0); // Set initial state to 0
  const [maxPrice, setMaxPrice] = useState<number>(Infinity); // Set initial state to Infinity

  // Fetch products based on searchTerm, sortOrder, minPrice, and maxPrice
  const { data: featuredProducts, isLoading, error, refetch } = useGetAllProductsQuery({
    searchTerm,
    sort: sortOrder,
    minPrice: minPrice > 0 ? minPrice : undefined, // Only send minPrice if greater than 0
    maxPrice: maxPrice < Infinity ? maxPrice : undefined // Only send maxPrice if less than Infinity
  });

  useEffect(() => {
    // Refetch products whenever searchTerm, sortOrder, minPrice, or maxPrice changes
    refetch();
  }, [searchTerm, sortOrder, minPrice, maxPrice, refetch]);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Something went wrong. Please try again later.</p>;

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">Explore Our Exclusive Products</h2>

      {/* Filter and Search Form */}
      <form className="mb-12 py-6 flex flex-wrap items-start justify-between bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto space-y-4 md:space-y-0">
        {/* Search Field */}
        <div className="w-full md:w-2/5">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search by name or brand
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Price and Sort Fields */}
        <div className="flex flex-wrap md:flex-nowrap justify-between md:space-x-4 w-full md:w-3/5">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price</label>
            <input
              id="minPrice"
              type="number"
              placeholder="Min"
              value={minPrice === 0 ? "" : minPrice} // Display empty string if minPrice is 0
              onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : 0)} // Reset to 0 if empty
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price</label>
            <input
              id="maxPrice"
              type="number"
              placeholder="Max"
              value={maxPrice === Infinity ? "" : maxPrice} // Display empty string if maxPrice is Infinity
              onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : Infinity)} // Reset to Infinity if empty
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

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
        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <button
            type="button"
            className="w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-200"
            onClick={() => {
              setSearchTerm(""); // Clear the search term
              setSortOrder("price"); // Reset sort to default
              setMinPrice(0); // Reset min price
              setMaxPrice(Infinity); // Reset max price
            }}
          >
            Clear Filters
          </button>
        </div>
      </form>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuredProducts?.data?.map((product: TProduct) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
