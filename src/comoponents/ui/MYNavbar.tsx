import { Navbar, Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import keyboard from "../../assets/keyboard.svg";
import { useGetCartItemsQuery } from "../../redux/features/carts/cartsApi";

export default function MYNavbar() {
  const isActiveLink = (path: string) => location.pathname === path;
  const { data, error, isLoading } = useGetCartItemsQuery();

  // Calculate total cart items if the data is available and follows the correct structure
  const cartItemCount = data?.data?.cartItems?.length || 0;

  return (
    <Navbar
      fluid
      rounded
      className="bg-white dark:bg-gray-800 border"
    >
      <Navbar.Brand as={Link} to="/" className="h-full flex items-center">
        <img src={keyboard} className="mr-3 h-8 sm:h-10" alt="Keyboard Logo" /> {/* Adjust logo height */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Mechanical Keyboard
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="h-full">
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
          <Link to="/carts" className="relative flex items-center h-full">
            <ShoppingCartIcon className="h-6 w-6 flex items-center justify-center text-gray-700 dark:text-white" />
            {/* Show the badge only if there are items in the cart */}
            {cartItemCount > 0 && (
              <Badge
                color="red"
                size="sm"
                className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-1 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
