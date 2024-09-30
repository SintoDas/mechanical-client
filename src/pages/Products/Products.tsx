
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import Card from "../../comoponents/ui/Card";


const Products: React.FC = () => {
  const { data: featuredProducts, isLoading, error } = useGetAllProductsQuery({});
  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Something went wrong. Please try again later.</p>;


  return (
    <section className="py-20 ">
  
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Explore Our Products</h2>
        <form className="mb-8 py-5 flex flex-col md:flex-row items-center justify-between bg-white shadow-lg p-5 rounded-lg">
          <input
            type="text"
            placeholder="Search by name or brand"
            className="border border-gray-300 mb-3 md:mb-0 md:mr-3 w-full md:w-1/3 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col md:flex-row md:items-center">
            <input
              type="number"
              placeholder="Min Price"
              className="border border-gray-300 mb-3 md:mb-0 md:mr-3 w-full md:w-1/4 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max Price"
              className="border border-gray-300 mb-3 md:mb-0 md:mr-3 w-full md:w-1/4 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className="border border-gray-300 mb-3 md:mb-0 w-full md:w-1/4 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <button
              type="button"
              className="m-1 text-blue-600 border border-blue-600 bg-white hover:bg-blue-600 hover:text-white transition px-4 py-2 rounded-lg shadow-sm"

            >
              Clear Filters
            </button>
            <button
              type="button" // Keeping it as a button since there's no submission
              className="m-1 text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg shadow-sm"
              onClick={() => { /* Add any specific action if needed */ }}
            >
              Apply Filters
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {featuredProducts?.data?.map((product: TProduct) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
   
    </section>
  );
};

export default Products;
