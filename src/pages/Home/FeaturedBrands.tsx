import logo1 from "../../assets/keyboard2 (1).jpg";
import logo2 from "../../assets/keyboard2 (2).jpg";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const featuredBrands = [
    { name: 'Logitech', logo: logo1 },
    { name: 'Corsair', logo: logo1 },
    { name: 'Razer', logo: logo1 },
    { name: 'SteelSeries', logo: logo2 },
    { name: 'Ducky', logo: logo2 },
];

const FeaturedBrands = () => {
    return (
        <div className="container mx-auto py-8 my-2">
            <h2 className="text-2xl font-bold text-center mb-6">Top Featured Brands</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {featuredBrands.map((brand) => (
                    <motion.div 
                        key={brand.name} 
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }} // Initial state
                        animate={{ opacity: 1, y: 0 }}   // Animation state
                        transition={{ duration: 0.5 }}    // Transition effect
                    >
                        <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="h-16 w-16 mb-2 object-contain"
                        />
                        <h3 className="text-lg font-semibold">{brand.name}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBrands;
