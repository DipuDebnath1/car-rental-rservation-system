import { useAppSelector } from "@/redux/hooks";
import Loading from "@/shared-components/Loading";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);

  if (loading) {
    return <Loading />;
  }

  if (user && user.role === "user") {
    return <>{children}</>;
  }

  return <Navigate to="/sign-in" />;
};

export default UserRoute;
