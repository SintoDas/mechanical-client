import { Card } from 'flowbite-react';
import { motion } from 'framer-motion';

const CustomizableOptions = () => {
  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },  // Hidden state
    visible: { opacity: 1, y: 0 },  // Visible state
  };

  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Customizable Options
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Switch Types',
            description: 'Choose from a variety of mechanical switch types including Cherry MX, Gateron, and Kailh for a personalized typing experience.',
          },
          {
            title: 'Keycap Styles',
            description: 'Select different keycap materials and profiles, such as ABS or PBT, and options like SA, DSA, or Cherry profiles to match your style.',
          },
          {
            title: 'Backlighting',
            description: 'Customize your keyboard with RGB backlighting options, including effects and colors to match your gaming setup or workspace.',
          },
          {
            title: 'Layout Options',
            description: 'Choose from different layouts such as TKL (Tenkeyless), 75%, or full-size keyboards to suit your typing needs and preferences.',
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

export default CustomizableOptions;
