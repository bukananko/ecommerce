import Navbar from "./components/ui/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="space-y-3">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
