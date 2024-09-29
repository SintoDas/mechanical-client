import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Correct import for ShoppingCartIcon
import keyboard from "../../assets/keyboard.svg";

export default function MYNavbar() {
  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <Navbar
      fluid
      rounded
      className="bg-white dark:bg-gray-800 border border-red-600 h-16" // Set navbar height
    >
      <Navbar.Brand as={Link} to="/" className="h-full flex items-center">
        <img src={keyboard} className="mr-3 h-8 sm:h-10" alt="Keyboard Logo" /> {/* Adjust logo height */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Mechanical Keyboard
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="h-full"> {/* Ensures the collapse takes full height */}
        <Navbar.Link as={Link} to="/" active={isActiveLink("/")}>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/products" active={isActiveLink("/products")}>
          Products
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about" active={isActiveLink("/about")}>
          About Us
        </Navbar.Link>
        <Navbar.Link as={Link} to="/contact" active={isActiveLink("/contact")}>
          Contact Us
        </Navbar.Link>
        <Navbar.Link as={Link} to="/dashboard" active={isActiveLink("/dashboard")}>
          Dashboard
        </Navbar.Link>
        <div className="ml-auto flex items-center h-full">
          <Link to="/cart" className="relative flex items-center h-full">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
