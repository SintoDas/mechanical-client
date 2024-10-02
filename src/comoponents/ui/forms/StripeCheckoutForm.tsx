/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'flowbite-react';
import { useProcessStripePaymentMutation } from '../../../redux/features/checkout/checkoutApi';
import { useGetCartItemsQuery } from '../../../redux/features/carts/cartsApi';

const StripeCheckoutForm: React.FC = () => {
  const { data } = useGetCartItemsQuery();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createPayment] = useProcessStripePaymentMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setIsLoading(true);
    setErrorMessage(null); // Clear previous error message
  
    try {
      // Trigger the API call to create a payment intent
      const response = await createPayment({
        amount: parseInt(data?.data?.totalPrice), // Ensure this is the correct path to the total price
        currency: 'usd',
      }).unwrap();
  
      console.log('API Response:', response); // Log the response to verify
  
      const clientSecret = response?.client_secret;
  
      if (!clientSecret) {
        throw new Error('Payment client secret not returned');
      }
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });
  
      if (result.error) {
        setErrorMessage(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        window.location.href = '/payment';
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Error processing payment');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Total Price: ${data?.data?.totalPrice}</h2> {/* Assuming totalPrice is in cents */}
      </div>
      <CardElement />
      <div className="flex justify-center items-center mb-5 mt-5">
        <Button type="submit" disabled={isLoading || !stripe}>
          {isLoading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default StripeCheckoutForm;
