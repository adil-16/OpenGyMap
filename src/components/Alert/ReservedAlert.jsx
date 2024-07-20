import React from "react";
import Crossicon from "../buttons/Crossicon";

const ReservedAlert = ({ onClick }) => {
  return (
    <div className="p-2 bg-white shadow-lg rounded-lg w-[25%] h-[75%]">
      <div className="flex justify-between items-center p-5 g">
        <p className="font-inter font-semibold text-xl">Reserve</p>

        <Crossicon onClick={onClick} />
      </div>

      <div className=" flex justify-center">
        <img className="h-40 w-40 " src="\Alert\ReservedALert.png" alt="this" />
      </div>

      <div>
        <p className="font-bold text-2xl font-inter py-4 text-center">
          Already Booked!
        </p>
      </div>

      <div className="">
        <p className="text-custom-gray font-medium font inter text-base text-center">
          <span className="text-custom-gray font-bold font inter  ">
            Sorry!
          </span>{" "}
          but the court on{" "}
          <span className="text-custom-gray font-bold font inter">
            14 Sept, 12:00
          </span>{" "}
          is already booked. You can either ask host to join or find another.
        </p>
      </div>

      <div className="py-4 flex justify-center">
        <button className="text-custom-black underline font-bold ">
          Find Another
        </button>
      </div>

      <div className="py-4 rounded-lg bg-custom-gradient flex justify-center ml-16 pb-4 w-64 text-white  text-center  ">
        <button
          className=""
          onClick={() => {
            console.log("button is clicked");
          }}
        >
          Request host to join
        </button>
      </div>
    </div>
  );
};

export default ReservedAlert;
