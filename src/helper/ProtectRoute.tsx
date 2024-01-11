import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({
  fallback,
  children,
}: {
  fallback: string;
  children: React.ReactNode;
}) => {
  const [cookies] = useCookies(["userId"]);

  return cookies.userId ? <Navigate to={fallback} /> : children;
};

export default ProtectRoute;
