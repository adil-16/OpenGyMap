import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardsData from "../../utils/CardsData/CardsData";

import { IoMdArrowBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import Slider from "./components/Slider";
import { MdOutlineStarPurple500 } from "react-icons/md";
import Reviewcard from "./components/Reviewcard";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import Custombutton from "./components/Custombutton";
import Calenderr from "./components/Calender";

import ReservedAlert from "../../components/Alert/ReservedAlert";
const Exploredetails = () => {
  const [hours, setHours] = useState(1);
  const [selectedCourt, setSelectedCourt] = useState("Half Court");
  const [showReserveAlert, setShowReserveALert] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const cardId = parseInt(id, 10);

  const card = CardsData.find((card) => card.id === cardId);

  if (!card) {
    return <p>Card not found!</p>;
  }

  const handleMinus = () => {
    setHours((prevHours) => Math.max(prevHours - 1, 1));
  };

  const handlePlus = () => {
    setHours((prevHours) => prevHours + 1);
  };

  const handleReservedAlert = () => {
    setShowReserveALert(true);
  };

  return (
    <div className="lg:flex-row lg:flex min-h-screen   flex-col p-8">
      <div className="flex-[2] px-8  ">
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowBack className="h-6 w-8" />

          <p className="font-inter font-semibold text-xl">Back</p>
        </div>

        <div className="py-4 flex gap-4">
          <p className="font-poppins text-2xl font-bold">
            Basketball Court Name
          </p>

          <div className="flex gap-2 items-center text-custom-gray">
            <FaClock className="h-4 w-4" />
            <p className="text-sm text-request-button-accepted font-normal">
              Monday - Friday 09:00 - 23:00
            </p>
          </div>
        </div>

        <div className="font-inter text-lg font-medium ">Barbarian Gym Pro</div>

        <div className="flex gap-2 py-2 items-center">
          <FaLocationDot className="text-request-icon border-b-2 flex border-request-icon h-4 w-4" />

          <p className="text-custom-gray font-medium font-inter text-sm">
            Street 123, California, USA
          </p>
        </div>

        <div className="py-4 ">
          <Slider />
        </div>

        <div className="py-4">
          <p className="font-inter text-2xl font-semibold ">Description</p>
          <p className="font-inter text-base text-custom-gray py-2 ">
            m ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a
            sapien non lorem tempor fringilla quis eget justo. Nullam fringilla
            orci vel nibh convallis, a bibendum velit bibendum. Proin in magna
            nibh. Sed metus diam, ornare a ultricies a, auctor facilisis purus.
            Nullam vel facilisis diam. Duis cursus nibh a pretium pharetra.
            Maecenas malesuada non tellus bibendum auctor. Nam maximus felis vel
            tortor varius, quis tempus mauris pharetra.
          </p>
        </div>

        <div className="py-2">
          <p className="font-inter text-2xl font-semibold ">House Rules</p>

          <ul className="list-disc list-inside mt-2 space-y-2">
            {card.houseRules.map((rule, index) => (
              <li key={index} className="text-custom-gray font-inter">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 py-3">
          <div className="flex gap-1 items-center">
            <MdOutlineStarPurple500 className="h-8 w-8 " />

            <p className="font-inter font-semibold text-xl">4.0</p>
            <p className="text-3xl font-semibold mb-5">.</p>
          </div>

          <div className="font-inter font-semibold text-xl">215 reviews</div>
        </div>

        {/* Review Card */}

        <div className=" sm:grid sm:grid-cols-1 flex-grow w-full  md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-2  overflow-auto ">
          <Reviewcard />
          <Reviewcard />
          <Reviewcard />
          <Reviewcard />
          <Reviewcard />
          <Reviewcard />
        </div>

        <div className="flex justify-center py-6 cursor-pointer">
          <div className="border border-custom-gray w-40 text-center rounded-full font-inter py-2">
            <button className="font-bold "> Show More</button>
          </div>
        </div>
      </div>
      <div className="flex-1 py-5 ">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            <MdOutlineStarPurple500 className="h-8 w-8 " />

            <p className="font-inter font-semibold text-xl">4.0</p>
            <p className="text-3xl font-semibold mb-5">.</p>
          </div>

          <div className="font-inter font-semibold text-xl">123 reviews</div>
        </div>

        {/* content */}

        <div className="my-24 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center p-3">
            <p className="text-custom-gray font-inter font-medium text-base">
              price
            </p>
            <p className="font-inter font-semibold text-xl ">{card.rate}</p>
          </div>
          <div className="ml-3 mr-3 border-b border-custom-gray"></div>

          <div className="text-custom-gray p-4 font-inter font-medium">
            <p>Select your date and Time</p>
          </div>

          <div className="p-3 flex justify-between items-center ">
            <p className="font-inter text-lg font-semibold ">Starting Time</p>

            <div className="flex-col items-end ">
              <input type="time" placeholder="Time " className="text-center" />
              <div className="border-b ml-2 mr-2 py-1 border-custom-gray "></div>
            </div>
          </div>

          <div className="p-3 flex justify-between">
            <p className="font-inter text-lg font-semibold ">Hours</p>

            <div className="flex items-center  gap-2">
              <div className=" ">
                <CiCircleMinus
                  onClick={handleMinus}
                  className=" text-custom-gray cursor-pointer h-6 w-6"
                />
              </div>
              <div>{hours}</div>
              <div>
                <CiCirclePlus
                  onClick={handlePlus}
                  className="text-custom-gray cursor-pointer w-6 h-6"
                />
              </div>
            </div>
          </div>

          <div className="p-3 flex justify-between items-center">
            <p className="font-inter text-lg font-semibold ">Court</p>

            <div className="space-x-2 flex ">
              <Custombutton
                onClick={() => setSelectedCourt("Half Court")}
                textColor={
                  selectedCourt === "Half Court" ? "text-white" : "text-black"
                }
                text="Half Court"
                bgColor={
                  selectedCourt === "Half Court"
                    ? "bg-custom-gradient"
                    : "bg-white"
                }
              />

              <Custombutton
                onClick={() => setSelectedCourt("Full Court")}
                textColor={
                  selectedCourt === "Full Court" ? "text-white" : "text-black"
                }
                text="Full Court"
                bgColor={
                  selectedCourt === "Full Court"
                    ? "bg-custom-gradient"
                    : "bg-white"
                }
              />
            </div>
          </div>

          <div className="w-full">
            <Calenderr />
          </div>

          <div className="flex justify-center pb-4">
            <div className="py-4 rounded-lg bg-custom-blue w-40 text-white  text-center  ">
              <button className="" onClick={handleReservedAlert}>
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReserveAlert && (
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-custom-black bg-opacity-50">
          <ReservedAlert
            onClick={() => {
              setShowReserveALert(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Exploredetails;
