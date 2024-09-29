import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleProductQuery } from '../../redux/features/product/productsApi';
import { Card } from 'flowbite-react';
import { useAddToCartMutation } from '../../redux/features/carts/cartsApi';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, error, isLoading } = useGetSingleProductQuery(id);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (productData?.data?.availableQuantity) {
      setAvailableQuantity(productData.data.availableQuantity);
    }
  }, [productData]);

  const handleAddToCart = async () => {
    if (availableQuantity > 0) {
      try {
        // Optimistic UI update is handled in the mutation itself (onQueryStarted)
        await addToCart({
          id: productData.data._id,
          name: productData.data.title,
          price: productData.data.price,
          availableQuantity: productData.data.availableQuantity,
        }).unwrap();
        toast.success('Product added to cart successfully!');
        navigate('/carts');
      } catch (error) {
        console.log(error)
        toast.error('Failed to add product to cart. Please try again.');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <img src={productData?.data?.image} alt={productData?.data?.title} className="w-full h-full object-cover" />
        <h1 className="text-2xl font-bold mt-4">{productData?.data?.title}</h1>
        <h2 className="text-lg text-gray-700">{productData?.data?.brand}</h2>
        <p className="text-gray-600 mt-2">Available Quantity: {availableQuantity}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">${productData?.data?.price}</p>
        <div className="flex items-center mt-2">
          {/* Rating component */}
        </div>
        <button
          onClick={handleAddToCart}
          className={`mt-6 bg-cyan-700 text-white font-bold py-2 px-4 rounded hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 ${
            availableQuantity === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={availableQuantity === 0 || isAdding}
        >
          {availableQuantity === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </Card>
    </div>
  );
};

export default ProductDetails;
