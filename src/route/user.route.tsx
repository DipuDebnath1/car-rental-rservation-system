import UserRoute from "@/pages/authoraization-user/UserRoute";
import BookingManagement from "@/pages/dashboard/user/bookingManagement/BookingManagement";
import Payment from "@/pages/dashboard/user/paymantManagement/Payment";
import UpdateProfile from "@/pages/dashboard/user/userinfo/UpdateProfile";
import UserInfo from "@/pages/dashboard/user/userinfo/UserInfo";

export const userPaths = [
    {
        name:"Dashboard Overview",
        index:true,
        element: <UserRoute><UserInfo /></UserRoute>
    },
    {
        name:"Update Profile",
        path:'update-profile',
        element:<UserRoute><UpdateProfile /></UserRoute>,
        ignore:true
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
    }
    
]