import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import Avatar from "../ui/Avatar";
import useCookie from "@/hooks/useCookie";

const Navbar = () => {
  const { userId } = useCookie();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current && inputRef.current.value;

    if (value) {
      navigate(`/search?q=${value}`);
    }
  };

  const handleBg = () => {
    if (window.scrollY > 10) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  window.addEventListener("scroll", handleBg);

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-3 flex items-center justify-between md:gap-5 gap-2 md:px-40 px-2 z-50 ${
        isScroll ? "dark:bg-dark bg-white" : "bg-transparent"
      }`}>
      <Link to="/" className="max-lg:hidden">
        <img src="/logo.webp" alt="aishop" width={70} height={70} />
      </Link>

      <form onSubmit={handleSearch} className="flex-1 relative">
        <input
          ref={inputRef}
          required
          type="search"
          placeholder="Search..."
          className="lg:w-96 w-full py-1 pl-9 pr-3 outline-none bg-transparent rounded-md border border-gray-300 focus:outline-sky-500 focus:border-white/30"
        />
        <FiSearch size={22} alt="Search" className="absolute top-1.5 left-2" />
      </form>

      <div className="flex gap-4 items-center max-md:hidden">
        <Link to="/cart" className="hover:bg-white/10 p-2 rounded-full">
          <FiShoppingCart size={22} alt="Cart" />
        </Link>

        <div className="h-8 border border-gray-300 dark:border-white/30" />

        {userId ? (
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("isSelling", "true");
                navigate(`/dashboard/manage-products`);
              }}
              className="text-sky-500 hover:text-sky-600 font-semibold">
              Switch to selling
            </button>

            <Link to="/profile" title="Profile">
              <Avatar size={30} />
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 border rounded-md border-cyan-500 text-cyan-500 hover:text-cyan-500/85">
              Sign in
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded-md bg-cyan-500 text-white dark:text-black hover:bg-cyan-500/85">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
