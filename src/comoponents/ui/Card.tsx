import { TProduct } from "../../types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: TProduct;
}

const Card: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold text-gray-900">{product?.title}</h1>
          <h2 className="text-md text-gray-500">{product?.brand}</h2>
          <p className="text-sm text-gray-600 mt-1">Available: {product?.availableQuantity}</p>

          {/* Rating Section */}
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${index < product?.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-semibold">{product?.rating}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900">${product?.price}</span>
            <Link
              to={`/products/${product._id}`}
              className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
