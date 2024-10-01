import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import Card from "../../comoponents/ui/Card";

export default function FeaturedProducts() {
  const { data: featuredProducts, isLoading, error } = useGetAllProductsQuery();
   console.log(featuredProducts)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Grid for Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProducts?.data?.results.slice(0, 6).map((product: TProduct) => (
            <Card key={product._id} product={product} />
          ))}
        </div>

        {/* See More Button */}
    
          <Link to="/products">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              See More
            </button>
          </Link>
      </div>
    </>
  );
}
