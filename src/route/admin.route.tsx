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
        element:<DashboardOverview />
    },
    {
        name:"Manage Cars",
        path:'manage-cars',
        element:<ManagedCars />
    },
    {
        name:"Manage Booking",
        path:'manage-booking',
        element:<ManageBookings />
    },
    {
        name:"Manege Return",
        children:[
            {
                name:"View Booked Cars",
                path:"booked-cars",
                element:<ViewBookedCars />
            },
            {
                name:"Return Options",
                path:"return",
                element:<ReturnOptions />
            },
        ]
    },
    {
        name:"User Management",
        path:"user-management",
        element:<UserManagement />
    }
]