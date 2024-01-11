import App from "@/App.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/home";
import ProtectRoute from "@/helper/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ProtectRoute fallback="/">
        <LoginPage />
      </ProtectRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectRoute fallback="/">
        <RegisterPage />
      </ProtectRoute>
    ),
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
