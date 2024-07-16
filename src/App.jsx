import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import PublicRoutes from "./utils/Routes/PublicRoutes";
import PrivateRoutes from "./utils/Routes/PrivateRoutes";
import Auth from "./pages/Auth/Login/Auth";
import Signup from "./pages/Auth/Signup/Signup";
import Otp from "./pages/Auth/OtpVerification/Otp";
import Home from "./pages/Home/Home";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import Explore from "./pages/Explore/Explore";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PublicRoutes Component={Auth} />,
      },
      {
        path: "/signup",
        element: <PublicRoutes Component={Signup} />,
      },
      {
        path: "/otp",
        element: <PublicRoutes Component={Otp} />,
      },
      {
        element: <HomeLayout />,
        children: [
          {
            path: "/homepage",
            element: <PublicRoutes Component={Home} />,
          },
          {
            path: "/explore",
            element: <PublicRoutes Component={Explore} />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </AuthProvider>
    </>
  );
};

export default App;
