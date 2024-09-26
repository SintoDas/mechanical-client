import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactUs: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <div className="container mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
            <motion.h1 
                className="text-4xl font-bold text-white text-center mb-6"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
            >
                Contact Us
            </motion.h1>

            <div className="flex flex-col md:flex-row md:justify-around gap-6">
                {/* Contact Information */}
                <motion.div 
                    className="mb-6 md:w-1/3 p-4 bg-white rounded-lg shadow-lg flex flex-col justify-between h-64" // Fixed height with flex
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <p>If you have any questions or feedback, feel free to reach out!</p>
                    </div>
                    <div className="mt-4">
                        <p><strong>Email:</strong> support@keyboardwebsite.com</p>
                        <p><strong>Phone:</strong> (123) 456-7890</p>
                        <p><strong>Address:</strong> 123 Keyboard Lane, Music City, ST 12345</p>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="md:w-1/2 p-4 bg-white rounded-lg shadow-lg flex flex-col justify-between h-64" // Fixed height with flex
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                        <label className="block mb-2">
                            <span className="text-gray-700">Name</span>
                            <input 
                                type="text" 
                                {...register('name')} 
                                className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                                required 
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Email</span>
                            <input 
                                type="email" 
                                {...register('email')} 
                                className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                                required 
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Message</span>
                            <textarea 
                                {...register('message')} 
                                className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                                rows={4} 
                                required 
                            />
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-4 w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default ContactUs;
