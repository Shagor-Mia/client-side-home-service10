import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import ProfilePage from "../pages/ProfilePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import PrivateRoute from "../provider/PrivateRoute";
import LoadingSpinner from "../pages/LoadingSpinner";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/service",
        element: <ServicePage />,
      },
      {
        path: "/service/:id",
        element: (
          <PrivateRoute>
            <ServiceDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
    ],
  },
]);
