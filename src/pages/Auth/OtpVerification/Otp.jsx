import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import VerifyButton from "../../../components/buttons/Verify";
import { useNavigate, Link } from "react-router-dom";
import { verifyPhoneOtp } from "../../../firebase/Functions/ApiFunctions";

const Otp = () => {
  const navigate = useNavigate();
  const { email } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const otpString = otp.join("");

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleRequestOtp = async () => {
    try {
      const verificationId = localStorage.getItem("verificationId");
      if (verificationId) {
        await verifyPhoneOtp(verificationId, otpString);
        navigate("/login");
      } else {
        toast.error("Verification ID is missing.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP: " + error.message);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="hidden md:flex flex-col">
        <img src="/logo.png" alt="OpenGymMap Logo" className="w-40 ml-8 " />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src="/Auth/otp.png"
          alt="Otp Image"
          className="w-40 mt-24 lg:mt-0"
        />
        <p className="font-semibold text-custom-black text-3xl mt-6">
          Verification
        </p>
        <p className="text-custom-gray text-md mt-2">
          An 4-digit code has been sent to
        </p>
        <p className="text-custom-black text-md ">{email}</p>
        <div className="flex space-x-2 mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 border-2 rounded-xl bg-gray-200 text-center text-lg font-semibold"
            />
          ))}
        </div>
        <p className="text-custom-black underline font-semibold text-md mt-6 mb-6 ">
          Resend Otp
        </p>
        <VerifyButton text="Verify" onClick={handleRequestOtp} />
        <Link
          to="/"
          className="text-custom-black font-semibold mt-3 my-4  md:mt-0 lg:mt-0"
        >
          <span className="mr-2 ">&lt;</span> Return to sign up
        </Link>
      </div>
    </div>
  );
};

export default Otp;
