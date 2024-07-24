import React from "react";
import FlagSelect from "react-flags-select";
import InputField from "../InputField/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AuthForm = ({
  activeButton,
  handleButtonClick,
  selectedCountry,
  handleCountryChange,
  emailId,
  handleEmailChange,
  password,
  handlePasswordChange,
  phone,
  handlePhoneChange,
}) => {
  return (
    <div>
      <div className="flex p-1 lg:w-96 w-80    border rounded-xl mb-8 bg-gray-200">
        <button
          onClick={() => handleButtonClick("phoneNumber")}
          className={`flex-1 px-4 py-2 rounded-xl focus:outline-none ${
            activeButton === "phoneNumber"
              ? "bg-white font-bold border-b-2"
              : "border-b-2 border-transparent"
          }`}
        >
          Phone Number
        </button>
        <button
          onClick={() => handleButtonClick("email")}
          className={`flex-1 px-4 py-2 rounded-xl focus:outline-none ${
            activeButton === "email"
              ? "bg-white font-bold border-b-2"
              : "border-b-2 border-transparent"
          }`}
        >
          Email
        </button>
      </div>
      {activeButton === "phoneNumber" && (
        <div className="flex items-center border-b-2 border-gray-300 py-2 mb-12 lg:w-96 md:w-80 sm:64">
          <PhoneInput
            country={selectedCountry}
            value={phone}
            onChange={handlePhoneChange}
            className="text-gray-700 px-2 focus:outline-none"
          />
        </div>
      )}
      {activeButton === "email" && (
        <>
          <InputField
            type="text"
            placeholder="Email ID"
            value={emailId}
            onChange={handleEmailChange}
            iconSrc="/Auth/email.png"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            iconSrc="/Auth/password.png"
          />
        </>
      )}
    </div>
  );
};

export default AuthForm;
