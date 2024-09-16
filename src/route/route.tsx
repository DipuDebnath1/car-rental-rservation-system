import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/home/Home";
import CarList from "@/pages/carList/CarList";
import CarDetails from "@/pages/carDetails/CarDetails";
import ErrorPage from "@/pages/errorPage/ErrorPage";

export const router = createBrowserRouter([{
    path:"/",
    element:<App />,
    errorElement:<ErrorPage />,
    children:[
        {
        index:true,
        element:<Home />
         },
        {
        path:'car-list',
        element:<CarList />
        },
        {
        path:'car-details',
        element:<CarDetails />
        },

]
}])