import { Button } from 'flowbite-react';
import keyboardImg2 from '../../assets/keyboard2 (2).jpg';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 mb-10 rounded-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            Discover the Best Products for Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-6 p-5">
            Shop the latest trends and enjoy exclusive offers on our premium products.
          </p>
          <Button
            gradientMonochrome="green"
            size="lg"
            className="transition-all duration-300 ease-in-out hover:bg-green-600 hover:text-white outline-4s"
          >
            Shop Now
          </Button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1">
          <img
            src={keyboardImg2}
            alt="Showcase of a premium keyboard"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
