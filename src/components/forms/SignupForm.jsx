import React from "react";
import InputField from "../InputField/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignupForm = ({
  activeButton,
  handleButtonClick,
  selectedCountry,
  handleCountryChange,
  emailId,
  handleUsernameChange,
  username,
  handleEmailChange,
  password,
  handlePasswordChange,
  confirmPassword,
  handleConfirmPasswordChange,
  phone,
  handlePhoneChange,
  isDisabled,
}) => {
  return (
    <div>
      <div className="flex-row  p-1  w-80  justify-center items-center  lg:w-96 border rounded-xl mb-6 bg-gray-200">
        <button
          onClick={() => handleButtonClick("phoneNumber")}
          className={`flex-1 px-6 py-2  rounded-xl focus:outline-none ${
            activeButton === "phoneNumber"
              ? "bg-white font-bold border-b-2"
              : "border-b-2 border-transparent"
          }`}
        >
          Phone Number
        </button>
        <button
          onClick={() => handleButtonClick("email")}
          className={`flex-1 px-8 lg:px-16 ml-8 py-2 rounded-xl focus:outline-none ${
            activeButton === "email"
              ? "bg-white font-bold border-b-2"
              : "border-b-2 border-transparent"
          }`}
        >
          Email
        </button>
      </div>
      {activeButton === "phoneNumber" && (
        <>
          <InputField
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={handleUsernameChange}
            iconSrc="/Auth/username.png"
            isDisabled={isDisabled}
          />

          <div className="flex items-center border-b-2 border-gray-300  mb-4 lg:w-96 md:w-80 sm:64">
            <PhoneInput
              country={selectedCountry}
              value={phone}
              onChange={handlePhoneChange}
              className="text-gray-700  focus:outline-none"
            />
          </div>

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            iconSrc="/Auth/password.png"
            isDisabled={isDisabled}
          />

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            iconSrc="/Auth/password.png"
            isDisabled={isDisabled}
          />
        </>
      )}
      {activeButton === "email" && (
        <>
          <InputField
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={handleUsernameChange}
            iconSrc="/Auth/username.png"
            isDisabled={isDisabled}
          />
          <InputField
            type="text"
            placeholder="Email ID"
            value={emailId}
            onChange={handleEmailChange}
            iconSrc="/Auth/email.png"
            isDisabled={isDisabled}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            iconSrc="/Auth/password.png"
            isDisabled={isDisabled}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            iconSrc="/Auth/password.png"
            isDisabled={isDisabled}
          />
        </>
      )}
    </div>
  );
};

export default SignupForm;
