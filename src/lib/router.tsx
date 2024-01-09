import App from "@/App.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
