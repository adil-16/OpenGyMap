import React from "react";
import Crossicon from "../buttons/Crossicon";
import { useNavigate } from "react-router-dom";

const ReservedAlert = ({ onClick, onClose, selectedDate, selectedTime }) => {
  const navigate = useNavigate();

  const handleFindAnotherClick = () => {
    navigate("/explore");
  };
  return (
    <div className="p-2 bg-white shadow-lg rounded-lg w-full max-w-md md:w-[75%] lg:w-[50%] xl:w-[25%] h-auto  z-20 mx-auto my-auto">
      <div className="flex justify-between items-center p-5">
        <p className="font-inter font-semibold text-xl">Reserve</p>
        <Crossicon onClick={onClose} />
      </div>

      <div className="flex justify-center">
        <img className="h-40 w-40" src="\Alert\ReservedALert.png" alt="this" />
      </div>

      <div>
        <p className="font-bold text-2xl font-inter py-4 text-center">
          Already Booked!
        </p>
      </div>

      <div>
        <p className="text-custom-gray font-medium font-inter text-base text-center">
          <span className="text-custom-gray font-bold font-inter">Sorry!</span>{" "}
          but the court on{" "}
          <span className="text-custom-gray font-bold font-inter">
            {selectedDate}, {selectedTime}
          </span>{" "}
          is already booked. You can either ask the host to join or find
          another.
        </p>
      </div>

      <div className="py-4 flex justify-center">
        <button
          onClick={handleFindAnotherClick}
          className="text-custom-black underline font-bold"
        >
          Find Another
        </button>
      </div>

      <div className="py-4 rounded-lg bg-custom-gradient flex justify-center mb-6 w-full text-white text-center">
        <button onClick={onClick}>Request host to join</button>
      </div>
    </div>
  );
};

export default ReservedAlert;
