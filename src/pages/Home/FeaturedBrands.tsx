import logo1 from "../../assets/keyboard2 (1).jpg";
import logo2 from "../../assets/keyboard2 (2).jpg";

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
                    <div key={brand.name} className="flex flex-col items-center">
                        <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="h-16 w-16 mb-2 object-contain"
                        />
                        <h3 className="text-lg font-semibold">{brand.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBrands;
