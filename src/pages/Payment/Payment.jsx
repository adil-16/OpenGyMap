import React, { useState, useEffect } from "react";
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
import { addBooking } from "../../firebase/Functions/BookingFunctions";
import { getUserDetails } from "../../firebase/Functions/ApiFunctions";
import { v4 as uuidv4 } from "uuid";

const formatDate = (date) => {
  if (!(date instanceof Date)) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!(date instanceof Date)) return "";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  });
};

const Payment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { facility, selectedCourt, selectedTime, hours, selectedDate } =
    location.state;

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const uid = localStorage.getItem("uid");

  const serviceFee = 12.14;
  const rate = facility.rate;
  const subtotal = hours * rate;
  const totalAmount = subtotal + serviceFee;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(uid);
        setUserDetails({
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [facility.id]);

  const handlePayClick = async () => {
    const bookingId = uuidv4();
    const createdAt = new Date().toISOString();
    const datePart = selectedDate.toISOString().split("T")[0];
    const startDate = new Date(`${datePart}T${selectedTime}:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + hours);

    const bookingData = {
      bookingAmount: totalAmount,
      bookingCourtName: facility.courtName,
      bookingDate: formatDateTime(new Date(selectedDate)),
      bookingDays: facility.daysList || [],
      bookingEndTime: endDate.toISOString(),
      bookingGymName: facility.gymName,
      bookingHours: hours,
      bookingId,
      createdAt,
      bookingLocation: facility.address,
      bookingStartTime: startDate.toISOString(),
      courtType: selectedCourt,
      createdBy: uid,
      creatorName: userDetails.fullName || "",
      creatorPhone: userDetails.phoneNumber || "",
      facilityId: facility.id,
      imagesList: facility.imageUrls,
      isActive: true,
      latitude: facility.latitude,
      longitude: facility.longitude,
    };
    await addBooking(bookingData);
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
            date={formatDate(new Date(selectedDate))}
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
