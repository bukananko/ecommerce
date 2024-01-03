import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error.tsx";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";

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
      // {
      //   path: "/product/:id",
      //   element: <ProductDetails />,
      // },
      // {
      //   path: "/cart",
      //   element: <CartPage />,
      // },
      // {
      //   path: "/search/:query",
      //   element: <SearchPage />,
      // },
      // {
      //   path: "/about",
      //   element: <AboutPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
