import AdminRoute from "@/pages/authoraization-user/AdminRoute";
import ManageBookings from "@/pages/dashboard/admin/manageBookings/ManageBookings";
import ManagedCars from "@/pages/dashboard/admin/manageCars/ManagedCars";
import ReturnOptions from "@/pages/dashboard/admin/manageReturnCars/returnOptions/ReturnOptions";
import ViewBookedCars from "@/pages/dashboard/admin/manageReturnCars/viewBookedCars/ViewBookedCars";
import DashboardOverview from "@/pages/dashboard/admin/overview/DashboardOverview";
import UserManagement from "@/pages/dashboard/admin/userManagement/UserManagement";

export const adminPaths = [
    {
        name:"Dashboard Overview",
        index:true,
        // path:'overview',
        element:<AdminRoute> <DashboardOverview /></AdminRoute>
    },
    {
        name:"Manage Cars",
        path:'manage-cars',
        element:<AdminRoute><ManagedCars /></AdminRoute> 
    },
    {
        name:"Manage Booking",
        path:'manage-booking',
        element:<AdminRoute><ManageBookings /></AdminRoute>
    },
    {
        name:"Manege Return",
        children:[
            {
                name:"View Booked Cars",
                path:"booked-cars",
                element:<AdminRoute><ViewBookedCars /></AdminRoute> 
            },
            {
                name:"Return Options",
                path:"return",
                element:<AdminRoute><ReturnOptions /></AdminRoute> 
            },
        ]
    },
    {
        name:"User Management",
        path:"user-management",
        element:<AdminRoute> <UserManagement /></AdminRoute>
    }
]