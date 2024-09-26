import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="mb-4 text-gray-700"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to our website! We are dedicated to providing you with the best experience possible.
          Our mission is to <strong>deliver high-quality products</strong> and exceptional service.
          We believe in transparency, integrity, and customer satisfaction.
        </motion.p>
        <motion.p
          className="mb-4 text-gray-700"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our team consists of passionate individuals who are committed to making a positive impact in the industry.
          With years of experience and a deep understanding of our customers' needs, we strive to exceed expectations.
        </motion.p>
        <motion.p
          className="text-gray-700"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Thank you for visiting our website. We look forward to serving you!
        </motion.p>
      </div>
    </div>
  );
};

export default AboutUs;
