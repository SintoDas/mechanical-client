import { Link } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import { AiFillStar } from "react-icons/ai";
import { TProduct } from "../../types";


interface ProductCardProps {
  product: TProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
    imgSrc={product?.image}
    imgAlt={product?.title}
    className="max-w-sm hover:shadow-lg transition-shadow duration-300"
  >
    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
    <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
    <p className="text-sm text-gray-500 mb-1">
      Available: {product.availableQuantity}
    </p>
    <p className="text-lg font-bold text-primary mb-2">
      ${product.price.toFixed(2)}
    </p>
    <div className="flex items-center mb-3">
      {Array.from({ length: product.rating }, (_, i) => (
        <AiFillStar key={i} className="text-yellow-500" />
      ))}
    </div>
    <Link to={`/product/${product._id}`}>
      <Button gradientMonochrome="info" className="w-full">
        See Details
      </Button>
    </Link>
  </Card>
  );
}