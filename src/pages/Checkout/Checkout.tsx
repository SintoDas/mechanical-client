/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextInput, Radio, Label } from 'flowbite-react';
import { useState } from 'react';
import { useSubmitCheckoutMutation } from '../../redux/features/checkout/checkoutApi';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { public_key } from '../../config/config';
import StripeCheckoutForm from '../../comoponents/ui/forms/StripeCheckoutForm';

const stripePromise = loadStripe(public_key);

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe'>('cod');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [createCheckout] = useSubmitCheckoutMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, email, phone, address, paymentMethod };

    try {
      if (paymentMethod === 'cod') {
        await handleCodOrder(data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleCodOrder = async (data: any) => {
    try {
      await createCheckout(data).unwrap();
      toast.success('Order placed via Cash on Delivery');
      window.location.href = '/payment';
    } catch (error) {
      console.error(error);
      toast.error('Failed to place COD order. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-white">
      {/* Parent form for customer details and COD */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Checkout</h2>

        <div className="mb-6">
          <Label htmlFor="name" value="Name" />
          <TextInput 
            id="name" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-2 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="email" value="Email" />
          <TextInput 
            id="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="mt-2 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="phone" value="Phone" />
          <TextInput 
            id="phone" 
            placeholder="Enter your phone number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
            className="mt-2 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="address" value="Address" />
          <TextInput 
            id="address" 
            placeholder="Enter your address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
            className="mt-2 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <Label value="Payment Method" className="text-lg" />
          <div className="flex items-center mb-4 mt-2">
            <Radio 
              id="cod" 
              value="cod" 
              checked={paymentMethod === 'cod'} 
              onChange={() => setPaymentMethod('cod')} 
              className="mr-2"
            />
            <Label htmlFor="cod" className="text-gray-700">Cash on Delivery</Label>
          </div>
          <div className="flex items-center">
            <Radio 
              id="stripe" 
              value="stripe" 
              checked={paymentMethod === 'stripe'} 
              onChange={() => setPaymentMethod('stripe')} 
              className="mr-2"
            />
            <Label htmlFor="stripe" className="text-gray-700">Stripe</Label>
          </div>
        </div>

        {paymentMethod === 'cod' && (
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200">
            Place Order
          </Button>
        )}
      </form>

      {/* Conditionally render Stripe form if Stripe is selected */}
      {paymentMethod === 'stripe' && (
        <div className="mt-6 w-full max-w-lg p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <Elements stripe={stripePromise}>
            <StripeCheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
}
