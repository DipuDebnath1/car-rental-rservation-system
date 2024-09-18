import UserRoute from "@/pages/authoraization-user/UserRoute";
import BookingManagement from "@/pages/dashboard/user/bookingManagement/BookingManagement";
import Payment from "@/pages/dashboard/user/paymantManagement/Payment";
import UserInfo from "@/pages/dashboard/user/userinfo/UserInfo";

export const userPaths = [
    {
        name:"Dashboard Overview",
        index:true,
        element: <UserRoute><UserInfo /></UserRoute>
    },
    {
        name:"Booking Management",
        path:'booking-management',
        element:  <UserRoute><BookingManagement /></UserRoute>
    },
    {
        name:"Payment Management",
        path:'payment-management',
        element:<UserRoute><Payment /></UserRoute>
    },
]