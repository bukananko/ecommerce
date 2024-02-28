import RootLayout from "@/components/layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/home";
import ProtectRoute from "@/helper/ProtectRoute";
import ProfilePage from "@/pages/profile";
import SellerLayout from "@/components/layouts/SellerLayout";
import ManageProductsPage from "@/pages/seller/manageProducts";
import CreateProductPage from "@/pages/seller/createProduct";

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
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/seller/:username",
    element: <SellerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "manage-products",
        element: <ManageProductsPage />,
      },
      {
        path: "create-product",
        element: <CreateProductPage />,
      },
    ],
  },
]);

export default router;
