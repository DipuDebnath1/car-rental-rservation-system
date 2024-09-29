/* eslint-disable react-hooks/exhaustive-deps */
import HeroSection from "@/pages/home/components/Hero";
import { useGetCarsQuery } from "@/redux/api/baseApi";
import { setCars } from "@/redux/feautures/carSlice";
import { useAppDispatch } from "@/redux/hooks";
import Footer from "@/shared-components/footer/Footer";
import Loading from "@/shared-components/Loading";
import Navbar from "@/shared-components/navbar/Navbar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data, isLoading } = useGetCarsQuery(undefined);

  useEffect(() => {
    if (data) {
      dispatch(setCars(data.data));
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      {location.pathname === "/" && <HeroSection />}
      <div className="max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
