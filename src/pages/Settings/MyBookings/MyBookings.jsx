import React, { useState, useEffect } from "react";
import { getUserBookings } from "../../../firebase/Functions/BookingFunctions";

const getTimeDifference = (date) => {
  const now = new Date();
  const bookingDate = new Date(date);
  const diffInSeconds = Math.floor((now - bookingDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

const formatTime = (dateTime) => {
  return dateTime.slice(11, 16);
};
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings(uid);
        setBookings(userBookings);
        console.log(bookings);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
  }, [uid]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-2xl font-semibold mb-2 pl-4">
        My Bookings ({bookings.length})
      </h1>
      <div className="border-b border-payment-gray py-1 w-full mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {bookings.map((booking, index) => (
          <div key={index} className="p-4 rounded-lg bg-white">
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-lg text-custom-black">
                  {booking.bookingGymName}
                </div>
                <div className="text-sm text-gray-500">
                  {" "}
                  {getTimeDifference(booking.createdAt)}
                </div>
              </div>
              <div className="text-sm text-custom-black font-semibold mb-1">
                {formatTime(booking.bookingStartTime)} to{" "}
                {formatTime(booking.bookingEndTime)} ({booking.bookingHours}{" "}
                hours)
              </div>
              <div className="text-sm flex items-center text-payment-gray">
                <img
                  src="/Home/location.png"
                  alt="Location Icon"
                  className="w-3 h-4 mr-2"
                />
                {booking.bookingLocation}
              </div>
            </div>
            <div className="border-b border-payment-gray py-1 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
