import Avatar from "@/components/ui/Avatar";
import { FaStore, FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsGear, BsHeart, BsPencil, BsStar } from "react-icons/bs";
import { getCurrentUser } from "@/utils/getData";
import { Link, useNavigate } from "react-router-dom";
import useCookie from "@/hooks/useCookie";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: currentUser } = getCurrentUser();
  const { cookie, removeCookie } = useCookie();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.userId) {
      navigate("/");
    }
  }, [cookie]);

  return (
    <main className="md:px-36 px-2 py-5">
      <section className="flex items-center gap-2">
        <Avatar size={60} className="max-md:w-12" />

        <div>
          <h2 className="text-lg font-extrabold">{currentUser?.username}</h2>
          <p className="text-sm font-semibold text-gray-400">
            128772 Following
          </p>
        </div>
      </section>

      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4">
              <FaStore size={20} />
              Create store
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4">
              <BsGear size={20} />
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4">
              <BsPencil size={20} />
              Edit profile
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4">
              <BsStar size={20} />
              Review
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4">
              <BsHeart size={20} />
              Favorite
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4">
              <FaHistory size={20} />
              History
            </Link>
          </li>
          <li>
            <button
              onClick={() => removeCookie("userId")}
              className="flex items-center gap-2 hover:bg-white/10 rounded-md w-max py-2 px-2 md:px-4 text-red-500">
              <FiLogOut size={20} />
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default ProfilePage;
