import { Footer } from 'flowbite-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const CustomFooter = () => {
  return (
    <Footer container={true} className="bg-gray-900 text-white mt-20">
      <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Contact Information */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p>Email: support@keyboardwebsite.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Keyboard Lane, Tech City</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>

        {/* Relevant Links */}
        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full text-center pt-6 border-t border-gray-700 mt-6">
        <p className="text-sm text-gray-500">© 2024 Keyboard Website. All rights reserved.</p>
      </div>
    </Footer>
  );
};

export default CustomFooter;
