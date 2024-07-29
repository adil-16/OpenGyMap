import React from "react";
import Slider from "../../pages/Settings/components/Slider";
import { HiClock } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  imageUrls = [],
  rate,
  address,
  hours,
  courtName,
  time,
  status,
  rules,
  createdBy,
  description,
  gymName,
  longitude,
  latitude,
  daysList,
  bookingDateAndTime,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/explore/details/${id}`, {
      state: {
        facility: {
          id,
          courtName,
          imageUrls,
          rate,
          address,
          hours,
          time,
          status,
          rules,
          createdBy,
          description,
          gymName,
          longitude,
          latitude,
          daysList,
          bookingDateAndTime,
        },
      },
    });
  };

  const getStatusStyles = () => {
    if (status === "Open Now") {
      return "bg-white text-custom-black";
    } else if (status === "Closed Now") {
      return "bg-orange-500 text-white";
    }
    return "";
  };

  return (
    <div className=" w-full cursor-pointer" onClick={handleClick}>
      <div className="relative rounded-lg  h-[100%] overflow-hidden shadow-lg bg-white">
        <Slider imageUrls={imageUrls} />

        <div
          className={`absolute top-5 left-3 rounded-full px-6 py-2 ${getStatusStyles()}`}
        >
          {status}
        </div>

        <div className="p-3">
          <h3 className="text-md font-semibold text-custom-black flex justify-between">
            <span className="break-words w-[50%] truncate">{courtName}</span>
            <span className="break-words w-[20%]">{`$${rate}/hr`}</span>
          </h3>
          <div className="flex items-start pt-3">
            <img
              src="/Home/location.png"
              alt="Location Icon"
              className="w-3 h-4 mr-2 my-1"
            />
            <div className="text-custom-black text-sm font-semibold  w-[90%] truncate break-words  ">
              {address}
            </div>
          </div>
          <div className="flex items-start mt-3">
            <HiClock className="w-5 h-5 mr-2 text-Privacypolicy-text" />
            <span className="text-payment-gray text-sm break-words w-[90%]">
              {hours}
            </span>
          </div>
          <span className="text-payment-gray text-sm ml-7">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
