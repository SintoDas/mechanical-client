import { useState, useEffect } from "react";
import { useGetCartItemsQuery, useRemoveFromCartMutation, useUpdateCartQuantityMutation } from "../../redux/features/carts/cartsApi";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

interface Product {
  _id: string;
  name: string;
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

  // Update local state when data is fetched
  useEffect(() => {
    if (data?.data?.cartItems) {
      setCartItems(data.data.cartItems);
      setTotalPrice(data.data.totalPrice);
      checkStockAvailability(data.data.cartItems);
    }
  }, [data]);

  // Check if all items are in stock to enable/disable checkout button
  const checkStockAvailability = (items: CartItem[]) => {
    const inStock = items.every(item => item.quantity <= item.productId.availableQuantity);
    setAllInStock(inStock);
  };

  // Handle increasing the quantity of a cart item
  const handleIncreaseQuantity = async (item: CartItem) => {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.productId.availableQuantity) {
      try {
        // Optimistic UI update
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? {
                  ...cartItem,
                  quantity: newQuantity,
                  productId: {
                    ...cartItem.productId,
                    availableQuantity: cartItem.productId.availableQuantity - 1,
                  },
                }
              : cartItem
          )
        );
        setTotalPrice((prevTotal) => prevTotal + item.productId.price);

        // Update cart quantity on the server
        await updateCartQuantity({ id: item._id, quantity: newQuantity }).unwrap();
        checkStockAvailability(cartItems);
      } catch (err) {
        console.error("Failed to increase quantity: ", err);
        // Revert on failure
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? {
                  ...cartItem,
                  quantity: item.quantity,
                  productId: {
                    ...cartItem.productId,
                    availableQuantity: cartItem.productId.availableQuantity + 1,
                  },
                }
              : cartItem
          )
        );
        setTotalPrice((prevTotal) => prevTotal - item.productId.price);
      }
    }
  };

  // Handle decreasing the quantity of a cart item
  const handleDecreaseQuantity = async (item: CartItem) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 1) {
      try {
        // Optimistic UI update
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? {
                  ...cartItem,
                  quantity: newQuantity,
                  productId: {
                    ...cartItem.productId,
                    availableQuantity: cartItem.productId.availableQuantity + 1,
                  },
                }
              : cartItem
          )
        );
        setTotalPrice((prevTotal) => prevTotal - item.productId.price);

        // Update cart quantity on the server
        await updateCartQuantity({ id: item._id, quantity: newQuantity }).unwrap();
        checkStockAvailability(cartItems);
      } catch (err) {
        console.error("Failed to decrease quantity: ", err);
        // Revert on failure
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? {
                  ...cartItem,
                  quantity: item.quantity,
                  productId: {
                    ...cartItem.productId,
                    availableQuantity: cartItem.productId.availableQuantity - 1,
                  },
                }
              : cartItem
          )
        );
        setTotalPrice((prevTotal) => prevTotal + item.productId.price);
      }
    }
  };

  // Handle removing item from cart
  const handleRemoveItem = async (id: string) => {
    try {
      // Optimistic UI update
      const removedItem = cartItems.find((item) => item._id === id);
      if (removedItem) {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
        setTotalPrice((prevTotal) => prevTotal - removedItem.productId.price * removedItem.quantity);
      }

      // Remove from cart on the server
      await removeCarts(id).unwrap();
      checkStockAvailability(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to remove item: ", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading cart items.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-gray-100 rounded shadow-md">
                <div>
                  <h2 className="font-semibold">{item.productId.name}</h2>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ${(item.productId.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Stock: {item?.productId?.availableQuantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    aria-label="Decrease quantity"
                    onClick={() => handleDecreaseQuantity(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    aria-label="Increase quantity"
                    onClick={() => handleIncreaseQuantity(item)}
                    disabled={item.quantity >= item.productId.availableQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  aria-label="Remove item"
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
