import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/home/Home";
import CarDetails from "@/pages/carDetails/CarDetails";
import NotFoundPage  from "@/pages/errorPage/NotFoundPage";
import CarListingPage from "@/pages/carListing/CarListing";
import AboutUs from "@/pages/about/AboutUs";
import Contact from "@/pages/contact/Contact";

export const router = createBrowserRouter([{
    path:"/",
    element:<App />,
    errorElement:<NotFoundPage  />,
    children:[
        {
        index:true,
        element:<Home />
         },
        {
        path:'car-list',
        element:<CarListingPage />
        },
        {
        path:'car-details/:id',
        element:<CarDetails />
        },
        {
        path:'about',
        element:<AboutUs />
        },
        {
        path:'contact',
        element:<Contact />
        },

]
}])