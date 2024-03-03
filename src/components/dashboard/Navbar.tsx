import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 dark:bg-dark bg-white py-3 flex items-center justify-between md:gap-5 gap-2 md:px-40 px-2 z-50">
      <div className="flex gap-2 items-center max-md:hidden">
        <Link to="/" className="max-lg:hidden">
          <img src="/logo.webp" alt="aishop" width={70} height={70} />
        </Link>

        <NavLink
          to={`/dashboard/earnings`}
          className={({ isActive }) =>
            [
              isActive ? "dark:bg-white/10" : "",
              "px-4 py-1 hover:dark:bg-white/10 rounded-md",
            ].join(" ")
          }>
          Earnings
        </NavLink>

        <NavLink
          to={`/dashboard/manage-products`}
          className={({ isActive }) =>
            [
              isActive ? "dark:bg-white/10" : "",
              "px-4 py-1 hover:dark:bg-white/10 rounded-md",
            ].join(" ")
          }>
          Manage Products
        </NavLink>

        <NavLink
          to={`/dashboard/create-product`}
          className={({ isActive }) =>
            [
              isActive ? "dark:bg-white/10" : "",
              "px-4 py-1 hover:dark:bg-white/10 rounded-md",
            ].join(" ")
          }>
          Create Product
        </NavLink>

        <NavLink
          to={`/dashboard/manage-orders`}
          className={({ isActive }) =>
            [
              isActive ? "dark:bg-white/10" : "",
              "px-4 py-1 hover:dark:bg-white/10 rounded-md",
            ].join(" ")
          }>
          Manage Orders
        </NavLink>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem("isSelling", "false");
            navigate("/");
          }}
          className="text-sky-500 hover:text-sky-600 font-semibold">
          Switch to buying
        </button>

        <Link to="/profile" title="Profile">
          <Avatar size={30} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
