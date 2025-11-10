import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
// import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "../context/PrivateRoute";
import LoadingPage from "../pages/LoadingPage";
import MyServicePage from "../pages/MyServicePage";
import MyBookingPage from "../pages/MyBookingPage";
import AddServicePage from "../pages/AddServicePage";
// import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayouts";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingPage />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
        path: "/service",
        element: <ServicePage />,
      },
      // {
      //   path: "/service/:id",
      //   element: (
      //     <PrivateRoute>
      //       <ServiceDetailsPage />
      //     </PrivateRoute>
      //   ),
      // },

      {
        path: "/my-service",
        element: (
          <PrivateRoute>
            <MyServicePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddServicePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <PrivateRoute>
            <MyBookingPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
