import HeroSection from "@/pages/home/components/Hero";
import Navbar from "@/shared-components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto  min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
