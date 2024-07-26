import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import PayButton from "../../components/buttons/Verify";
import GymDetails from "./Components/GymDetails";
import UserDetails from "./Components/UserDetails";
import BookingSummary from "./Components/BookingSummary";
import PriceSummary from "./Components/PriceSummary";
import PaymentOptions from "./Components/PaymentOptions";
import SuccessPopup from "../../components/popups/PaymentPopups/SuccessPopup";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { facility, selectedCourt, selectedTime, hours, selectedDate } =
    location.state;

  const serviceFee = 12.14;
  const rate = facility.rate;
  const subtotal = hours * rate;
  const totalAmount = subtotal + serviceFee;

  const handlePayClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!facility) {
    return <p>Facility details not available!</p>;
  }

  return (
    <div className="p-6 md:p-12">
      <div
        className="flex items-center mb-6 cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowBack className="h-6 w-8 pr-2" />
        <span className="text-custom-black font-bold text-xl">Back</span>
      </div>

      <h2 className="text-2xl text-custom-black font-bold pt-4 pb-8">
        Confirm and Pay
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <GymDetails facility={facility} />
          <UserDetails facility={facility} />
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
          <BookingSummary
            court={selectedCourt}
            time={selectedTime}
            hours={hours}
            date={selectedDate}
          />
          <PriceSummary hours={hours} facility={facility} />
          <div className="border-b border-navbar-gray mb-6"></div>
          <PaymentOptions />
        </div>
      </div>

      <div className="mt-20 text-right">
        <PayButton
          text={`Pay $${totalAmount.toFixed(2)}`}
          onClick={handlePayClick}
        />
      </div>
      {showPopup && <SuccessPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Payment;
