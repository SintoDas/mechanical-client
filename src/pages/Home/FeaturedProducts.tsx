import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import { Button } from "flowbite-react";
import ProductCard from "../../comoponents/ui/ProductCard";


export default function FeaturedProducts() {
  const { data: featuredProducts, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  return (
      <>    
      <div className="mt-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {featuredProducts?.data?.slice(0, 6).map((product: TProduct) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
  
  <div className="flex justify-center mt-6">
    <Link to="/products">
      <Button className="px-6 py-2">See More</Button>
    </Link>
  </div>
</div>

      </>
  );
}