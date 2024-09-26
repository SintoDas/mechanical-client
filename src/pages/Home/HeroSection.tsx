import { Button } from 'flowbite-react';
import keyboardImg2 from "../../assets/keyboard2 (2).jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Discover the Best Products for Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Shop the latest trends and enjoy exclusive offers on our premium products.
          </p>
          <Button color="light" size="lg" className="transition duration-300 hover:bg-gray-800">
            Shop Now
          </Button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1">
          <img
            src={keyboardImg2}
            alt="Showcase product"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
