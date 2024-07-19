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
import PaymentLayout from "./layouts/PaymentLayout/PaymentLayout";
import Explore from "./pages/Explore/Explore";
import NotificationProvider from "./Context/NotificationContext/NotificationContext";
import Requests from "./pages/Requests/Requests";
import Privacypolicy from "./pages/Privacypolicy/Privacypolicy";
import Payment from "./pages/Payment/Payment";

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

          {
            path: "/requests",
            element: <PublicRoutes Component={Requests} />,
          },
          {
            path: "/privacypolicy",
            element: <PublicRoutes Component={Privacypolicy} />,
          },
        ],
      },
      {
        element: <PaymentLayout />,
        children: [
          {
            path: "/payment",
            element: <PublicRoutes Component={Payment} />,
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
