import { Card } from 'flowbite-react';
import { motion } from 'framer-motion';

const WhyChooseMechanicalKeyboards = () => {
  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },  // Hidden state
    visible: { opacity: 1, y: 0 },  // Visible state
  };

  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Why Choose Mechanical Keyboards?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Tactile Feedback',
            description: 'Experience satisfying tactile feedback with each keystroke, improving typing accuracy and speed.',
          },
          {
            title: 'Durability',
            description: 'Built to last with individual switches rated for tens of millions of key presses.',
          },
          {
            title: 'N-Key Rollover',
            description: 'Enjoy accurate multi-key presses, perfect for gaming and typing.',
          },
          {
            title: 'Variety of Switch Types',
            description: 'Choose from different switch types for a personalized typing experience.',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay for staggered animation
          >
            <Card className="border border-gray-300">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseMechanicalKeyboards;
