import { FaShippingFast, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ServiceAdvertisement = () => {
  const services = [
    {
      icon: <FaShippingFast className="text-blue-600 w-12 h-12" />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders over $50.',
    },
    {
      icon: <FaMoneyBillWave className="text-green-600 w-12 h-12" />,
      title: 'Lowest Delivery Charge',
      description: 'We offer the lowest delivery charges nationwide.',
    },
    {
      icon: <FaHeadset className="text-red-600 w-12 h-12" />,
      title: '24/7 Support',
      description: 'Our support team is available 24/7 to assist you.',
    },
  ];

  return (
    <section className="py-24">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 p-2">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center m-4 p-2 bg-white shadow-lg transition-shadow hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }} // Initial state (invisible, slightly moved down)
              animate={{ opacity: 1, y: 0 }} // Animate to visible position
              transition={{ duration: 0.5, delay: index * 0.1 }} // Delay for staggered effect
              whileHover={{ scale: 1.05 }} // Scale up on hover
            >
              <div className="mb-3">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAdvertisement;
