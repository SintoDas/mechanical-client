import { Button, TextInput, Radio, Label } from 'flowbite-react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useSubmitCheckoutMutation } from '../../redux/features/checkout/checkoutApi';
import { toast } from 'sonner'; // Import Sonner's toast

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'cod' | 'stripe';
};

export default function Checkout() {
  const { handleSubmit, control } = useForm<FormData>();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe'>('cod');
  const [createCheckout] = useSubmitCheckoutMutation();

  const onSubmit = async (data: FormData) => {
    console.log('Order Data:', data);
    
    try {
      if (data.paymentMethod === 'cod') {
        await handleCodOrder(data);
      } else if (data.paymentMethod === 'stripe') {
        handleStripeOrder();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleCodOrder = async (data: FormData) => {
    // Call the API to create the checkout order
    await createCheckout(data);
    
    // Show success toast
    toast.success('Order placed via Cash on Delivery');
    
    // Redirect to the success page after placing the order
    window.location.href = '/payment';
  };

  const handleStripeOrder = () => {
    toast('Redirecting to Stripe for payment...');
    // Logic for Stripe payment redirect
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        {/* Name Input */}
        <div className="mb-6">
          <Label htmlFor="name" value="Name" />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <>
                <TextInput id="name" {...field} className="w-full" required />
                {fieldState.invalid && <p className="text-red-500 text-sm mt-1">{fieldState.error?.message}</p>}
              </>
            )}
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <Label htmlFor="email" value="Email" />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ 
              required: 'Email is required', 
              pattern: { 
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 
                message: 'Email is invalid' 
              } 
            }}
            render={({ field, fieldState }) => (
              <>
                <TextInput id="email" type="email" {...field} className="w-full" required />
                {fieldState.invalid && <p className="text-red-500 text-sm mt-1">{fieldState.error?.message}</p>}
              </>
            )}
          />
        </div>

        {/* Phone Input */}
        <div className="mb-6">
          <Label htmlFor="phone" value="Phone" />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: 'Phone number is required' }}
            render={({ field, fieldState }) => (
              <>
                <TextInput id="phone" type="tel" {...field} className="w-full" required />
                {fieldState.invalid && <p className="text-red-500 text-sm mt-1">{fieldState.error?.message}</p>}
              </>
            )}
          />
        </div>

        {/* Address Input */}
        <div className="mb-6">
          <Label htmlFor="address" value="Delivery Address" />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: 'Delivery address is required' }}
            render={({ field, fieldState }) => (
              <>
                <TextInput id="address" {...field} className="w-full" required />
                {fieldState.invalid && <p className="text-red-500 text-sm mt-1">{fieldState.error?.message}</p>}
              </>
            )}
          />
        </div>

        {/* Payment Method Input */}
        <div className="mb-6">
          <Label value="Payment Method" />
          <Controller
            name="paymentMethod"
            control={control}
            defaultValue="cod"
            render={({ field }) => (
              <>
                <div className="flex items-center mb-2">
                  <Radio
                    id="cod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => {
                      setPaymentMethod('cod');
                      field.onChange('cod');
                    }}
                  />
                  <Label htmlFor="cod" className="ml-2">Cash on Delivery</Label>
                </div>
                <div className="flex items-center">
                  <Radio
                    id="stripe"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => {
                      setPaymentMethod('stripe');
                      field.onChange('stripe');
                    }}
                  />
                  <Label htmlFor="stripe" className="ml-2">Stripe</Label>
                </div>
              </>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </div>
  );
}
