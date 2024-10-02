import { baseApi } from "../../api/baseApi";

const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch user checkout details
    getCheckoutDetails: builder.query({
      query: () => ({
        url: '/checkouts',
        method: 'GET',
      }),
    }),

    // Submit the checkout form (name, email, phone, address, etc.)
    submitCheckout: builder.mutation({
      query: (checkoutData) => ({
        url: '/checkouts/create-checkout',
        method: 'POST',
        body: checkoutData, // Send user details and selected payment method
      }),
    }),

    // Handle Stripe payment processing
    processStripePayment: builder.mutation({
      query: (paymentData) => ({
        url: '/checkouts/create-payment-intent',
        method: 'POST',
        body: paymentData, // Send payment details for Stripe
      }),
    }),

    // // Handle Cash on Delivery payment processing
    // processCODPayment: builder.mutation({
    //   query: (orderData) => ({
    //     url: '/checkouts/cod-payment',
    //     method: 'POST',
    //     body: orderData, // Send order details for Cash on Delivery
    //   }),
    // }),

    // Validate stock before proceeding to payment
    validateStock: builder.mutation({
      query: (cartItems) => ({
        url: '/checkouts/validate-stock',
        method: 'POST',
        body: { cartItems }, // Send the cart items to check stock availability
      }),
    }),
  }),
});

export const {
  useGetCheckoutDetailsQuery,
  useSubmitCheckoutMutation,
  useProcessStripePaymentMutation,
  useValidateStockMutation,
} = checkoutApi;
