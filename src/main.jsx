import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
