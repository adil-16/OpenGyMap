import React, { useState, useContext } from "react";
import AuthForm from "../../../components/forms/AuthForm";
import RequestOtpButton from "../../../components/buttons/RequestOtp";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Auth = () => {
  const { email, setEmail } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState("phoneNumber");
  const [selectedCountry, setSelectedCountry] = useState("IN");
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

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleRequestOtp = () => {
    console.log("Requesting OTP");
    navigate("/otp");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2   ">
      <div className="hidden md:flex items-center h-screen col-span-1 relative ">
        <img
          src="/Auth/image1.png"
          alt="Background"
          className="h-full w-5/6 object-cover"
        />
        <img
          src="/Auth/image2.png"
          alt="Basketball Hoop"
          className="absolute top-0 left-0 h-auto w-auto object-contain transform translate-x-1/3"
        />
      </div>
      <div className="flex flex-col items-center   col-span-1 ">
        <img
          src="/logo.png"
          alt="OpenGymMap Logo"
          className="w-40 mb-16 lg:my-12 my-24 "
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
        <RequestOtpButton text="Request OTP" onClick={handleRequestOtp} />
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
