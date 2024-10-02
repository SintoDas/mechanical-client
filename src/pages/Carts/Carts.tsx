import { useState, useEffect } from 'react';
import {
  useGetCartItemsQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from '../../redux/features/carts/cartsApi';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

interface Product {
  _id: string;
  title: string;
  price: number;
  availableQuantity: number;
}

interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

const Carts = () => {
  const { data, error, isLoading } = useGetCartItemsQuery();
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
  const [removeCarts] = useRemoveFromCartMutation();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [allInStock, setAllInStock] = useState<boolean>(true);

  useEffect(() => {
    if (data?.data?.cartItems) {
      setCartItems(data.data.cartItems);
      setTotalPrice(data.data.totalPrice);
      checkStockAvailability(data.data.cartItems);
    }
  }, [data]);

  const checkStockAvailability = (items: CartItem[]) => {
    const inStock = items.every(
      (item) => item?.quantity <= item?.productId?.availableQuantity
    );
    setAllInStock(inStock);
  };

  const handleUpdateQuantity = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.productId.availableQuantity) {
      alert('Not enough stock available');
      return;
    }

    try {
      // Optimistic UI update
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      setCartItems(updatedCartItems);

      // Recalculate the total price based on the optimistic update
      const updatedTotalPrice = updatedCartItems.reduce(
        (acc, curr) => acc + curr.quantity * curr.productId.price,
        0
      );
      setTotalPrice(updatedTotalPrice);

      // Send update to the server
      await updateCartQuantity({
        id: item._id,
        quantity: newQuantity,
      }).unwrap();

      // Check stock availability after server update
      checkStockAvailability(updatedCartItems);
    } catch (err) {
      console.error('Failed to update quantity:', err);
      // Revert the UI changes in case of failure
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        )
      );
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const removedItem = cartItems.find((item) => item._id === id);
      if (removedItem) {
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);

        // Recalculate total price after removal
        setTotalPrice((prevTotal) =>
          prevTotal - removedItem.productId.price * removedItem.quantity
        );

        // Remove from server
        await removeCarts(id).unwrap();
        checkStockAvailability(updatedCartItems);
      }
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  // Warning for page refresh if cart is not empty
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue = ''; // Some browsers require this to show the warning
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItems]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading cart items.</p>;

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded shadow-md"
              >
                <div>
                  <h2 className="font-semibold">{item?.productId?.title}</h2>
                  <p className="text-sm text-gray-600">Quantity: {item?.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ${(item?.productId?.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Stock: {item?.productId?.availableQuantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    onClick={() => handleUpdateQuantity(item, item?.quantity - 1)}
                    disabled={item?.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    onClick={() => handleUpdateQuantity(item, item?.quantity + 1)}
                    disabled={item.quantity >= item?.productId?.availableQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <Link to="/checkout">
              <Button disabled={!allInStock}>Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Carts;
