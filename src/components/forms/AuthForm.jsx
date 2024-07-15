import React from "react";
import FlagSelect from "react-flags-select";
import InputField from "../InputField/InputField";

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
      <div className="flex p-1 w-96 border rounded-xl mb-8 bg-gray-200">
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
        <div className="flex items-center border-b-2 border-gray-300 py-2 mb-12 w-96">
          <FlagSelect
            selected={selectedCountry}
            onSelect={(countryCode) => handleCountryChange(countryCode)}
            showSelectedLabel={false}
            className=""
          />
          <input
            type="text"
            placeholder="Phone Number"
            onChange={handlePhoneChange}
            value={phone}
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
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
