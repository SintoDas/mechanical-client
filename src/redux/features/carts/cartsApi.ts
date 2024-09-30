import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all cart items for the user
    getCartItems: builder.query({
      query: () => ({
        url: '/carts',
        method: 'GET',
      }),
    }),

    // Add a product to the cart
    addToCart: builder.mutation({
      query: (product) => ({
        url: '/carts/create-cart',
        method: 'POST',
        body: { productId: product.id, quantity: 1 }, // Send product ID and initial quantity
      }),
    }),

    // Update the quantity of a product in the cart
    updateCartQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/carts/${id}`,
        method: 'PUT',
        body: { quantity },
      }),
    }),

    // Remove a product from the cart
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
    }),

    // Proceed to checkout (or validate stock)
    proceedToCheckout: builder.mutation({
      query: () => ({
        url: '/cart/checkout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useUpdateCartQuantityMutation,
  useRemoveFromCartMutation,
  useProceedToCheckoutMutation,
} = cartApi;