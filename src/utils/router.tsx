import RootLayout from "@/components/layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/home";
import ProtectRoute from "@/helper/ProtectRoute";
import ProfilePage from "@/pages/profile";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ManageProductsPage from "@/pages/dashboard/manageProducts";
import CreateProductPage from "@/pages/dashboard/createProduct";
import DetailProductPage from "@/pages/detailProduct";
import EditProductPage from "@/pages/dashboard/editProduct";
import SearchPage from "@/pages/search";

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
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/product/:id",
        element: <DetailProductPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "manage-products",
        element: <ManageProductsPage />,
      },
      {
        path: "manage-products/:id",
        element: <EditProductPage />,
      },
      {
        path: "create-product",
        element: <CreateProductPage />,
      },
    ],
  },
]);

export default router;
