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
    <section className="py-10">
      <h2 className="text-center text-2xl font-bold text-slate-300">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProducts?.data?.slice(0, 2).map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Link to="/products">
        <Button className="my-4 mx-auto">See More</Button>
      </Link>
    </section>
  );
}
