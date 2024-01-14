import App from "@/App.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/home";
import ProtectRoute from "@/helper/ProtectRoute";
import ProfilePage from "@/pages/profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ProtectRoute>
        <LoginPage />
      </ProtectRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectRoute>
        <RegisterPage />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;

