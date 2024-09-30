import { Button } from "flowbite-react";

export default function Payment() {
  return (
    <div className=" min-h-[128px] bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-10 text-center transform transition duration-300 hover:scale-105">
        <div className="mb-6 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m-6 4V6a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2h-6a2 2 0 01-2-2v-6z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Order Successfully Placed!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase! We have sent a confirmation email. You
          can track your order from your profile.
        </p>
        <Button
          href="/"
          gradientDuoTone="greenToBlue"
          size="lg"
          className="mt-6"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
