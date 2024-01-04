import Navbar from "./components/ui/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
