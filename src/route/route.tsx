import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/home/Home";
import CarList from "@/pages/carList/CarList";
import CarDetails from "@/pages/carDetails/CarDetails";

export const router = createBrowserRouter([{
    path:"/",
    element:<App />,
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