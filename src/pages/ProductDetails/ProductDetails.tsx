import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleProductQuery } from '../../redux/features/product/productsApi';
import { Card, Rating, Button } from 'flowbite-react';
import { useAddToCartMutation, useGetCartItemsQuery } from '../../redux/features/carts/cartsApi';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, error, isLoading } = useGetSingleProductQuery(id);
  const { data: cartData, error: cartError, isLoading: isCartLoading } = useGetCartItemsQuery();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (productData?.data?.availableQuantity) {
      setAvailableQuantity(productData.data.availableQuantity);
    }
  }, [productData]);

  const handleAddToCart = async () => {
    const cartItems = cartData?.data ?? [];
    const existingCartItem = Array.isArray(cartItems)
      ? cartItems.find((item: any) => item.productId === id)
      : null;

    if (existingCartItem) {
      toast.info('This product is already in your cart.');
    } else if (availableQuantity > 0) {
      try {
        await addToCart({
          id: productData.data._id,
          name: productData.data.title,
          price: productData.data.price,
          availableQuantity: productData.data.availableQuantity,
          quantity: 1,
        }).unwrap();
        toast.success('Product added to cart successfully!');
        navigate('/carts');
      } catch (error) {
        console.log(error);
        toast.error('Failed to add product to cart. Stock might be finished.');
      }
    }
  };

  if (isLoading || isCartLoading) return <div>Loading...</div>;
  if (error || cartError) return <div>Error loading product or cart data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="flex flex-col md:flex-row md:space-x-6">
        {/* Image */}
        <img
          src={productData?.data?.image}
          alt={productData?.data?.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg"
        />
        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{productData?.data?.title}</h1>
          <h2 className="text-lg text-gray-700 mt-2">Brand: {productData?.data?.brand}</h2>
          <p className="text-gray-600 mt-2">Available Quantity: {productData?.data?.availableQuantity}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${productData?.data?.price}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <Rating>
              {Array.from({ length: productData?.data?.rating || 0 }).map((_, i) => (
                <Rating.Star key={i} filled={true} />
              ))}
              {Array.from({ length: 5 - productData?.data?.rating || 0 }).map((_, i) => (
                <Rating.Star key={i} filled={false} />
              ))}
            </Rating>
            <span className="ml-2 text-sm text-gray-600">({productData?.data?.rating})</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-4">{productData?.data?.description}</p>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className={`mt-6 w-full py-2 px-4 text-lg rounded-lg ${
              availableQuantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-700 hover:bg-cyan-800'
            }`}
            disabled={availableQuantity === 0 || isAdding}
          >
            {availableQuantity === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
