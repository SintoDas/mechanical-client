import { motion } from 'framer-motion';
import { Button, TextInput, Textarea } from 'flowbite-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-white to-gray-100 flex items-center justify-center py-16">
      <div className="w-full max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">We'd love to hear from you!</p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
              <TextInput id="name" placeholder="Enter your name" required className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
              <TextInput id="email" type="email" placeholder="Enter your email" required className="w-full" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Message</label>
              <Textarea id="message" placeholder="Write your message here..." required className="w-full" />
            </div>
            <Button gradientDuoTone="cyanToBlue" size="lg" type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
