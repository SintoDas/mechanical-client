import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { motion } from 'framer-motion'; // Import motion from Framer Motion

import logo1 from "../../assets/keyboard2 (1).jpg";
import logo2 from "../../assets/keyboard2 (2).jpg";

const reviewsData = [
    {
        id: 1,
        name: "John Doe",
        review: "Great product! Highly recommend.",
        image: logo1 // Using the imported logo1 image
    },
    {
        id: 2,
        name: "Jane Smith",
        review: "Amazing service and quality!",
        image: logo2 // Using the imported logo2 image
    },
    {
        id: 3,
        name: "Alice Johnson",
        review: "Absolutely love it! Will buy again.",
        image: logo1 // Reusing logo1 for demonstration; replace with a different image if available
    }
];

const CustomerReviews: React.FC = () => {
    const [reviews, setReviews] = useState<typeof reviewsData>([]); // Define the type of state

    useEffect(() => {
        // Simulate fetching data
        setReviews(reviewsData);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Customer Reviews</h2>
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
                stopOnHover
                dynamicHeight
                className="max-w-2xl mx-auto relative"
            >
                {reviews.map((review) => (
                    <motion.div 
                        key={review.id} 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }} // Initial state
                        animate={{ opacity: 1, y: 0 }}   // Animation state
                        exit={{ opacity: 0, y: -20 }}     // Exit animation state
                        transition={{ duration: 0.5 }}    // Transition effect
                    >
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-64 object-cover" // Apply object-cover to maintain aspect ratio
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
                            <h3 className="text-lg font-semibold text-white text-center">{review.name}</h3>
                            <p className="text-white text-center">{review.review}</p>
                        </div>
                    </motion.div>
                ))}
            </Carousel>
        </div>
    );
};

export default CustomerReviews;
