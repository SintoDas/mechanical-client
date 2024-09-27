import { useState } from "react";

import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import ProductCard from "../../comoponents/ui/ProductCard";

export default function Products() {
  const { data: featuredProducts, isLoading, error } = useGetAllProductsQuery();
  
  // State for search, filter, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter and sort products
  const filteredProducts = featuredProducts?.data
    ?.filter((product: TProduct) => {
      const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriceRange = (minPrice ? product.price >= minPrice : true) && 
                                (maxPrice ? product.price <= maxPrice : true);
      return matchesSearchTerm && matchesPriceRange;
    })
    .sort((a: TProduct, b: TProduct) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("asc");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  return (
    <section className="py-20">
      <div className="mb-5 flex flex-col md:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or brand"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded mb-3 md:mb-0 md:mr-3 w-full md:w-1/3"
        />
        <div className="flex flex-col md:flex-row">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || "")}
            className="border border-gray-300 p-2 rounded mb-3 md:mb-0 md:mr-3 w-full md:w-1/4"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
            className="border border-gray-300 p-2 rounded mb-3 md:mb-0 md:mr-3 w-full md:w-1/4"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border border-gray-300 p-2 rounded mb-3 md:mb-0 w-full md:w-1/4"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <button onClick={resetFilters} className="bg-blue-500 text-white px-4 py-2 rounded">
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts?.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
