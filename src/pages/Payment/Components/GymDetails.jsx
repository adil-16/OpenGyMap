import React from "react";

const GymDetails = ({ facility }) => (
  <div>
    <h3 className="font-semibold text-payment-gray text-lg mb-2">
      Gym Details
    </h3>
    <div className="border-b border-navbar-gray mb-4"></div>
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        <img
          src={facility?.imageUrls[0]}
          alt="Gym"
          className="h-28 w-28 object-cover rounded-lg"
        />
        <div className="pl-8">
          <h4 className="font-semibold text-custom-black text-lg">
            {facility?.basketCourtName || "No Name to show"}
          </h4>
          <p className="font-semibold pt-1">{facility?.gymName}</p>
          <div className="flex items-center pt-2">
            <img
              src="/Home/location.png"
              alt="Location Icon"
              className="w-3 h-4 mr-2"
            />
            <p className="text-gray-700 text-sm font-semibold">
              {facility?.address}
            </p>
          </div>
          <div className="flex items-center pt-2">
            <img
              src="/Home/time.png"
              alt="Time Icon"
              className="w-4 h-4 mr-2"
            />
            <span className="text-custom-gray text-sm">
              {facility.hours} {facility.time}
            </span>
          </div>
        </div>
      </div>
      <button className="text-custom-black underline font-semibold text-lg">
        Edit
      </button>
    </div>
  </div>
);

export default GymDetails;
