
import Card from "../../comoponents/ui/Card";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";


export default function FeaturedProducts() {
  const { data: featuredProducts, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {featuredProducts?.data.map((product :TProduct) => (
        <Card key = {product._id} product= {product}></Card>
      ))}
    </div>
  );
}
