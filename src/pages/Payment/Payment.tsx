import { Button } from "flowbite-react";

export default function Payment() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Order Successfully Placed</h2>
        <p className="text-gray-700 mb-6">Thank you for your order. You will receive a confirmation email shortly.</p>
        <Button href="/" gradientDuoTone="greenToBlue" className="mt-4">Continue Shopping</Button>
      </div>
    </div>
  );
}
