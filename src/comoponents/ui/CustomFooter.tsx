const CustomFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p>Email: support@mechanicalkeyboard.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Facebook</a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">Instagram</a>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/products" className="hover:text-gray-400">Terms of Service</a>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 @MechanicalKeyboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
