import React, { useState, useContext } from "react";
import AuthForm from "../../../components/forms/AuthForm";
import RequestOtpButton from "../../../components/buttons/RequestOtp";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import {
  Login,
  sendOtpToPhone,
} from "../../../firebase/Functions/ApiFunctions";
import CryptoJS from "crypto-js";

const Auth = () => {
  const { email, setEmail, setUid } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState("phoneNumber");
  const [selectedCountry, setSelectedCountry] = useState("in");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleRequestOtp = async () => {
    try {
      if (activeButton === "phoneNumber") {
        const verificationId = await sendOtpToPhone(phone);
        localStorage.setItem("verificationId", verificationId);
        navigate("/otp");
      } else {
        const userCredential = await Login(email, password);
        console.log("User signed in:", userCredential);
        setUid(userCredential.user.uid);

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          "your-encryption-key"
        ).toString();

        // Store uid and encrypted password in local storage
        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("encryptedPassword", encryptedPassword);

        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
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
        <RequestOtpButton text="Login" onClick={handleRequestOtp} />
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
