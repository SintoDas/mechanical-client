import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";

import { Button } from "flowbite-react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Card from "../../comoponents/ui/Card";

export default function FeaturedProducts() {
  const { data: featuredProducts, isLoading, error } = useGetAllProductsQuery();
  console.log(featuredProducts);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Grid for Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProducts?.data?.results.slice(0, 6).map((product: TProduct) => (
            <motion.div 
              key={product._id} 
              initial={{ opacity: 0, scale: 0.9 }} // Initial state
              animate={{ opacity: 1, scale: 1 }}  // Animation state
              transition={{ duration: 0.3 }}      // Transition effect
            >
              <Card product={product} />
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <Link to="/products">
          <motion.div 
            className="flex justify-center items-center mt-6" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <Button>
              See More
            </Button>
          </motion.div>
        </Link>
      </div>
    </>
  );
}
