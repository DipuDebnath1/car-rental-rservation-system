import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}:{children:ReactNode}) => {

    const user = useAppSelector(state => state.user.user);
    if (user && user.role === "admin") {
        return <>{children}</>
    }

    return <Navigate to="/sign-in" />;
};

export default AdminRoute;