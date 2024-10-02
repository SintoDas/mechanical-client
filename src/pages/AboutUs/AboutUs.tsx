import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import keyboardImg2 from '../../assets/keyboard2 (2).jpg';
import profileImage from '../../assets/179543 copy (1).jpg'; // Replace with actual image paths for other team members
import { Avatar } from 'flowbite-react';

const AboutUs = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500); // Delay for animations
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section */}
      <motion.div 
        className="container mx-auto p-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.h1 className="text-4xl md:text-6xl font-bold text-white text-center">
          About Us
        </motion.h1>
        <motion.p 
          className="mt-5 text-white text-center text-lg md:text-xl max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          We’re passionate about creating the finest keyboards that enhance your typing experience.
        </motion.p>
      </motion.div>

      {/* About Section */}
      <motion.div 
        className={`container mx-auto px-5 py-10 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 p-5"
            whileHover={{ scale: 1.05 }}
          >
            <div className="py-4">
              <h2 className="text-2xl font-semibold mb-5">Our Story</h2>
              <p className="text-gray-600">
                From our humble beginnings, we've grown into a brand that delivers precision-crafted keyboards to enthusiasts around the world.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 p-5"
            whileHover={{ scale: 1.05 }}
          >
            <div className="py-4">
              <h2 className="text-2xl font-semibold mb-5">Our Mission</h2>
              <p className="text-gray-600">
                We aim to revolutionize the keyboard industry with innovative designs, premium materials, and unmatched user experience.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Keyboard Section */}
      <motion.div 
        className="container mx-auto px-5 py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Experience the Art of Typing
        </h2>
        <motion.img 
          src={keyboardImg2} 
          alt="Keyboard illustration" 
          className="mx-auto w-full max-w-lg"
          animate={{ y: [0, -20, 0] }} // Add bounce animation
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
        
      {/* Team Section */}
      <motion.div 
        className="bg-white py-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center">
            <motion.div 
              className="text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar img={profileImage} alt="avatar of CEO" rounded />
              <h3 className="mt-5 text-xl font-semibold">Sinto Das</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </motion.div>

            <motion.div 
              className="text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar img={profileImage} alt="avatar of CTO" rounded />
              <h3 className="mt-5 text-xl font-semibold">Anika Roy</h3>
              <p className="text-gray-500">Chief Technology Officer</p>
            </motion.div>

            <motion.div 
              className="text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar img={profileImage} alt="avatar of COO" rounded />
              <h3 className="mt-5 text-xl font-semibold">Rahul Sen</h3>
              <p className="text-gray-500">Chief Operating Officer</p>
            </motion.div>

            <motion.div 
              className="text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar img={profileImage} alt="avatar of Lead Designer" rounded />
              <h3 className="mt-5 text-xl font-semibold">Maya Kapoor</h3>
              <p className="text-gray-500">Lead Designer</p>
            </motion.div>

            <motion.div 
              className="text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar img={profileImage} alt="avatar of Marketing Head" rounded />
              <h3 className="mt-5 text-xl font-semibold">Ravi Gupta</h3>
              <p className="text-gray-500">Marketing Head</p>
            </motion.div>

            <motion.div 
              className="text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar img={profileImage} alt="avatar of Product Manager" rounded />
              <h3 className="mt-5 text-xl font-semibold">Neha Singh</h3>
              <p className="text-gray-500">Product Manager</p>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
