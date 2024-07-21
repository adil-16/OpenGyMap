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
import Exploredetails from "./pages/Exploredetails/Exploredetails";
import SettingLayout from "./layouts/SettingsLayout/SettingLayout";
import PersonalInformation from "./pages/Settings/Personalnformation/PersonalInformation";
import Payment from "./pages/Payment/Payment";
import MyBookings from "./pages/Settings/MyBookings/MyBookings";
import MyFacility from "./pages/Settings/MyFacility/MyFacility";
import SettingsPayment from "./pages/Settings/Payment/Payment";
import Address from "./pages/Settings/Address/Address";
import AddFacility from "./pages/Settings/AddFacility/AddFacility";
import FacilityDetails from "./pages/Settings/FacilityDetails/FacilityDetails";
import { ImageProvider } from "./Context/ImageContext/ImageContext";

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

          {
            path: "/explore/details/:id",
            element: <PublicRoutes Component={Exploredetails} />,
          },
        ],
      },

      // Setting Layout

      {
        element: <SettingLayout />,
        children: [
          {
            path: "/setting",
            element: <PublicRoutes Component={PersonalInformation} />,
          },
          {
            path: "/settings/mybookings",
            element: <PublicRoutes Component={MyBookings} />,
          },
          {
            path: "/settings/myfacility",
            element: <PublicRoutes Component={MyFacility} />,
          },
          {
            path: "/settings/payment",
            element: <PublicRoutes Component={SettingsPayment} />,
          },
          {
            path: "/settings/address",
            element: <PublicRoutes Component={Address} />,
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

          {
            path: "/addfacility",
            element: <PublicRoutes Component={AddFacility} />,
          },
          {
            path: "/facilitydetails",
            element: <PublicRoutes Component={FacilityDetails} />,
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
          <ImageProvider>
            <RouterProvider router={router} />
          </ImageProvider>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
};

export default App;
