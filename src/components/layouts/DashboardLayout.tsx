import Navbar from "@/components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="space-y-3">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
