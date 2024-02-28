import Navbar from "@/components/seller/Navbar";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="space-y-3">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SellerLayout;
