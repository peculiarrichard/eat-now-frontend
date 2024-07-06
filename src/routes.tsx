import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Logs from "./pages/Logs";
import DashboardLayout from "./pages/DashboardLayout";
import SetReminders from "./pages/SetReminder";
import RouteError from "./pages/RouteError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <RouteError />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "logs",
        element: <Logs />,
      },
      {
        path: "set-reminder",
        element: <SetReminders />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
