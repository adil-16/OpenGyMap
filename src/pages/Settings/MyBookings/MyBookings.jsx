import React from "react";
import bookings from "../../../utils/BookingsData/BookingsData";

const MyBookings = () => {
  return (
    <div className="flex flex-col items-start p-6">
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
                  {booking.title}
                </div>
                <div className="text-sm text-gray-500">{booking.timestamp}</div>
              </div>
              <div className="text-sm text-custom-black font-semibold mb-1">
                {booking.time}
              </div>
              <div className="text-sm flex items-center text-payment-gray">
                <img
                  src="/Home/location.png"
                  alt="Location Icon"
                  className="w-3 h-4 mr-2"
                />
                {booking.location}
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
