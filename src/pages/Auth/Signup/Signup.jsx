import React, { useState } from "react";
import SignupForm from "../../../components/forms/SignupForm";
import RequestOtpButton from "../../../components/buttons/RequestOtp";
import { Link, useNavigate } from "react-router-dom";
import {
  sendOtpToPhone,
  registerUserWithEmailAndPassword,
} from "../../../firebase/Functions/ApiFunctions";

const Signup = () => {
  const [activeButton, setActiveButton] = useState("phoneNumber");
  const [selectedCountry, setSelectedCountry] = useState("in");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    console.log("country code", countryCode);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const handleRequestOtp = async () => {
    try {
      if (activeButton === "phoneNumber") {
        const verificationId = await sendOtpToPhone(phone);
        localStorage.setItem("verificationId", verificationId);
      } else {
        if (password !== confirmPassword) {
          console.error("Passwords do not match");
          return;
        }
        await registerUserWithEmailAndPassword(emailId, password, username);
        console.log(emailId);
        localStorage.setItem("emailForSignIn", emailId);
      }
      navigate("/");
    } catch (error) {
      console.error("Error requesting OTP:", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="hidden lg:flex lg:items-center h-auto col-span-1 relative ">
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
      <div className="flex flex-col items-center col-span-2 gap-3">
        <img
          src="/logo.png"
          alt="OpenGymMap Logo"
          className="w-40 mb-10  lg:my-12 my-24"
        />
        <h1 className="text-4xl font-semibold mb-4 text-custom-black">
          Create an account
        </h1>
        <p className=" text-custom-gray">Hello, Welcome Back!</p>
        <SignupForm
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          emailId={emailId}
          handleUsernameChange={handleUsernameChange}
          username={username}
          handleEmailChange={handleEmailChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          confirmPassword={confirmPassword}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          phone={phone}
          handlePhoneChange={handlePhoneChange}
        />
        <RequestOtpButton text="Create Account" onClick={handleRequestOtp} />

        <Link to="/" className="text-custom-black font-semibold ">
          <span className="mr-2 pb-4">&lt;</span> Return to sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
