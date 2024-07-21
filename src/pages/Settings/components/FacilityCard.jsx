import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const FacilityCard = ({ id, imageUrls = [], rate, address, hours }) => {
  const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : "/Home/games.png";

  return (
    <div className="w-full">
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
        <img
          src={firstImageUrl}
          alt="Gym"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <button className="px-4 py-1 bg-white rounded-full shadow">
            Edit
          </button>
        </div>
        <div className="absolute top-2 right-2">
          <button className="p-2 bg-white rounded-full shadow">
            <RiDeleteBinLine className="text-red-500" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-md font-semibold text-custom-black flex justify-between">
            <span>Basketball Gym Name</span>
            <span>{rate}</span>
          </h3>
          <div className="flex items-center pt-3">
            <img
              src="/Home/location.png"
              alt="Location Icon"
              className="w-3 h-4 mr-2"
            />
            <p className="text-custom-black text-sm font-semibold">{address}</p>
          </div>
          <div className="flex items-center mt-3">
            <img
              src="/Home/time.png"
              alt="Time Icon"
              className="w-4 h-4 mr-2"
            />
            <span className="text-payment-gray text-sm">{hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
