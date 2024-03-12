import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextProvider from "./utils/context";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" />
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
