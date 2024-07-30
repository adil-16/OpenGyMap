import React, { useState, useContext, useEffect } from "react";
import AuthForm from "../../../components/forms/AuthForm";
import RequestOtpButton from "../../../components/buttons/RequestOtp";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FirebaseError } from "firebase/app";
import {
  Login,
  sendOtpToPhone,
  updateUserFcmToken,
  getUserDetails,
} from "../../../firebase/Functions/ApiFunctions";
import CryptoJS from "crypto-js";
import { getToken } from "firebase/messaging";
import { messaging } from "../../../firebase/firebase.config";
import { toast } from "react-toastify";

const Auth = () => {
  const { email, setEmail, setUid, login } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState("phoneNumber");
  const [selectedCountry, setSelectedCountry] = useState("in");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    console.log("country code", countryCode);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (activeButton === "phoneNumber") {
        const verificationId = await sendOtpToPhone(phone);
        localStorage.setItem("verificationId", verificationId);
        navigate("/otp");
        toast.success("OTP sent successfully");
      } else {
        const userCredential = await Login(email, password);
        console.log("User signed in:", userCredential);
        setUid(userCredential.user.uid);
        login(userCredential.user.uid);

        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          "your-encryption-key"
        ).toString();

        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("encryptedPassword", encryptedPassword);

        const currentToken = await getToken(messaging, {
          vapidKey:
            "BGROC5MGFgK4PPi4M6J_TPYHGBBQf7u8I5nHSSpnz0NWZwdTzM_2DlxDeqE5lyb58tqyOI4BNF-_qT-Comj2gp8",
        });
        if (currentToken) {
          const userDoc = await getUserDetails(userCredential.user.uid);
          const existingFcmToken = userDoc?.fcmToken;

          if (!existingFcmToken) {
            await updateUserFcmToken(userCredential.user.uid, currentToken);
            localStorage.setItem("fcmToken", currentToken);
          }
        }

        navigate("/homepage");
        toast.success("Login Successfully");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Invalid email format");
            setEmail("");
            break;
          default:
            toast.error("Invalid Credentials ");
            setEmail("");
            setPassword("");
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="hidden lg:flex lg:items-center h-auto col-span-1 relative">
        <img
          src="/Auth/image1.png"
          alt="Background"
          className="h-full w-5/6 object-cover"
        />
        <img
          src="/Auth/image2.png"
          alt="Basketball Hoop"
          className="absolute top-0 left-0 h-auto w-auto object-contain transform translate-x-1/5"
        />
      </div>
      <div className="flex flex-col items-center col-span-2 ">
        <img
          src="logo.png"
          alt="OpenGymMap Logo"
          className="w-40 mb-16 mt-12 object-contain"
        />
        <h1 className="text-4xl font-semibold mb-4 text-custom-black">
          Login Account
        </h1>
        <p className="mb-6 text-custom-gray">Hello, Welcome Back!</p>

        <form
          className="flex flex-col items-center w-full"
        >
          <AuthForm
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            selectedCountry={selectedCountry}
            handleCountryChange={handleCountryChange}
            emailId={email}
            handleEmailChange={handleEmailChange}
            password={password}
            handlePasswordChange={handlePasswordChange}
            phone={phone}
            handlePhoneChange={handlePhoneChange}
          />

          <RequestOtpButton
            className="flex justify-center items-center"
            text={isLoading ? <p className="loader  ml-24 "></p> : "Login"}
            onClick={handleRequestOtp}
            disabled={isLoading}
          />
        </form>

        <p className="text-custom-gray mb-16 md:mb-0 lg:mb-0">
          Not Registered yet?{" "}
          <Link to={"/signup"} className="text-custom-blue font-semibold  ">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
