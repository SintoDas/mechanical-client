import { Navbar } from "flowbite-react";
import { Link} from "react-router-dom";
// import { useSelector } from "react-redux"; // Assuming you're using Redux to manage the cart state
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Correct import for ShoppingCartIcon
import keyboard from"../../assets/keyboard.svg";

export default function MYNavbar() {
//   const location = useLocation();
//   const cartItems = useSelector((state) => state.cart.items); // Adjust this according to your Redux store structure
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart

//   // Helper function to check if the link is active
  const isActiveLink = (path:string) => location.pathname === path;

  return (
    <Navbar fluid rounded>
    <Navbar.Brand as={Link} to="/">
      <img src={keyboard} className="mr-3 h-6 sm:h-9" alt="Keyboard Logo" />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Mechanical Keyboard
      </span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
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
        Product Management/Dashboard
      </Navbar.Link>
      <div className="ml-auto flex items-center">
        <Link to="/cart" className="relative flex items-center">
          <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-white" />
          {/* {cartItemCount > 0 && (
            <Badge className="absolute top-0 right-0" color="red">
              {cartItemCount}
            </Badge>
          )} */}
        </Link>
      </div>
    </Navbar.Collapse>
  </Navbar>
  );
}
