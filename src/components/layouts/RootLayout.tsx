import Navbar from "../home/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col justify-between h-dvh">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
