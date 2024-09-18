import BookingManagement from "@/pages/dashboard/user/bookingManagement/BookingManagement";
import Payment from "@/pages/dashboard/user/paymantManagement/Payment";
import UserInfo from "@/pages/dashboard/user/userinfo/UserInfo";

export const userPaths = [
    {
        name:"Dashboard Overview",
        index:true,
        element:<UserInfo />
    },
    {
        name:"Booking Management",
        path:'booking-management',
        element:<BookingManagement />
    },
    {
        name:"Payment Management",
        path:'payment-management',
        element:<Payment />
    },
]