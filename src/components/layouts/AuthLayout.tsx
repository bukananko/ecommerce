import { Link } from "react-router-dom";

const AuthLayout = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "login" | "register";
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh gap-5">
      <img src="/logo.webp" alt="aishop" width={150} height={150} />

      {children}

      <p className="text-center mt-4">
        {type === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          to={type === "login" ? "/register" : "/login"}
          className="text-blue-500 hover:underline font-extrabold">
          {type === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
