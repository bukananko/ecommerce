import Navbar from "../home/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="space-y-3">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
