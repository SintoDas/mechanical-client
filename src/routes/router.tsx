import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Products from "../pages/Products/Products";
import Dashboard from "../comoponents/ui/Dashboard";
import CreateProduct from "../comoponents/ui/forms/CreateProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Carts from "../pages/Carts/Carts";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";


export const router = createBrowserRouter([
{
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children:[
        {
            path: "/",
            element: <Home></Home>,
        },
        { 
            path: "/products",
            element: <Products></Products>

        }, 
        {
            path: "/products/:id",
            element: <ProductDetails></ProductDetails>

        },
        {
            path: "/carts",
            element: <Carts></Carts>
        },
        {   path: "/checkout",
            element: <Checkout></Checkout>

        },
        {
            path:"/payment",
            element: <Payment></Payment>

        },
        {
            path: "/dashboard",
            element: <Dashboard></Dashboard>

        },
        {
            path:"/create-product",
            element: <CreateProduct></CreateProduct>
        },
        {
            path :"/about",
            element: <AboutUs></AboutUs>

        },
       { 
        path :"/contact",
        element: <ContactUs></ContactUs>
       }
    
    ]
}

])