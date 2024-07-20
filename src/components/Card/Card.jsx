import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, imageUrl, rate, address, hours, status }) => {
  const navigate = useNavigate();

  const getStatusStyles = () => {
    if (status === "Open Now") {
      return "bg-white text-custom-black";
    } else if (status === "Already Booked") {
      return "bg-orange-500 text-white";
    }
    return "";
  };

  return (
    <div
      className="cursor-pointer flex-shrink-0"
      onClick={() => navigate(`/explore/details/${id}`, { state: { status } })}
    >
      <div className="rounded-lg overflow-hidden relative m-2">
        <img src={imageUrl} alt="Gym Image" className="w-full" />
        <div
          className={`absolute top-5 left-4 rounded-full px-3 py-2 ${getStatusStyles()}`}
        >
          {status}
        </div>
        <div className="pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center">
              Basketball Gym Name
              <span className="ml-20">{rate}</span>
            </h3>
          </div>
          <div className="flex items-center pt-2">
            <img
              src="/Home/location.png"
              alt="Location Icon"
              className="w-3 h-4 mr-2"
            />
            <p className="text-gray-700">{address}</p>
          </div>
          <div className="flex items-center mt-3">
            <img
              src="/Home/time.png"
              alt="Time Icon"
              className="w-4 h-4 mr-2"
            />
            <span className="text-custom-gray">{hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
