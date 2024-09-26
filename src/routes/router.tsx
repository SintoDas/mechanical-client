import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";


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