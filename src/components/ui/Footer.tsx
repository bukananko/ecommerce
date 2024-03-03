import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center gap-5 w-full px-28 py-5">
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} shopai.inc
      </p>
      <Link
        className="text-gray-500 dark:text-gray-400 text-sm hover:underline"
        to="https://github.com/kaylaiueo">
        Github
      </Link>
    </footer>
  );
};

export default Footer;
