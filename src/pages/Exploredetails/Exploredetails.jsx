import { React, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import { useNotification } from "../../Context/NotificationContext/NotificationContext";

const Exploredetails = () => {
  const [hours, setHours] = useState(1);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [selectedCourt, setSelectedCourt] = useState("Half Court");
  const [showReserveAlert, setShowReserveALert] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const facility = location.state?.facility;

  const { addNotification, removeNotification } = useNotification();

  function calculateCloseTime(selectedTime, hoursToAdd) {
    const selectedDate = new Date(`1970-01-01T${selectedTime}:00`);

    selectedDate.setHours(selectedDate.getHours() + hoursToAdd);

    const closeTime = selectedDate.toTimeString().slice(0, 5);

    return closeTime;
  }

  const closeTime = calculateCloseTime(selectedTime, hours);

  useEffect(() => {
    if (showReserveAlert) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showReserveAlert]);

  if (!facility) {
    return <p>Facility not found!</p>;
  }

  const handleMinus = () => {
    setHours((prevHours) => Math.max(prevHours - 1, 1));
  };

  const handlePlus = () => {
    setHours((prevHours) => prevHours + 1);
  };

  const handleCheckAvailability = () => {
    if (facility.status === "Open Now") {
      navigate("/payment", {
        state: { facility, selectedCourt, selectedTime, hours, selectedDate },
      });
    } else if (facility.status === "Already Booked") {
      setShowReserveALert(true);
    }
  };

  const handleDecline = (notificationId) => {
    removeNotification(notificationId);

    console.log(notificationId);
  };

  const handleRequestToHost = () => {
    setShowReserveALert(false);
    const notificationId = new Date().getTime();

    addNotification({
      id: notificationId,
      type: "Join Session",
      profileImage: "/Request/profileimage.png",
      userName: "Jessica Kawai",
      courtName: facility.courtName,
      date: selectedDate,
      time: `${selectedTime} - ${closeTime}`,
      action: "wants to join the session",
      timeAgo: "2hr ago",
      actions: [
        {
          type: "Decline",
          style:
            "border-request-button-decline text-request-button-decline bg-request-button-decline",
          onClick: handleDecline(notificationId),
        },
        {
          type: "Accept",
          style:
            "border-request-button-accepted text-request-button-accepted bg-request-button-accepted",
        },
      ],
    });
  };

  return (
    <div
      className={`   lg:flex-row lg:flex min-h-screen    flex-col p-8
      }`}
    >
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
            {facility.courtName}
          </p>

          <div className="flex gap-2 items-center text-custom-gray">
            <FaClock className="h-4 w-4" />
            <p className="text-sm text-request-button-accepted font-normal">
              {facility.hours} {facility.time}
            </p>
          </div>
        </div>

        <div className="font-inter text-lg font-medium ">
          {facility.gymName || ""}
        </div>

        <div className="flex gap-2 py-2 items-center">
          <FaLocationDot className="text-request-icon border-b-2 flex border-request-icon h-4 w-4" />

          <p className="text-custom-gray font-medium font-inter text-sm">
            {facility.address || ""}
          </p>
        </div>

        <div className="py-4 ">
          <Slider imageUrls={facility.imageUrls} />
        </div>

        <div className="py-4">
          <p className="font-inter text-2xl font-semibold ">Description</p>
          <p className="font-inter text-base text-custom-gray py-2 ">
            {facility.description || "No Description to show"}
          </p>
        </div>

        <div className="py-2">
          <p className="font-inter text-2xl font-semibold ">House Rules</p>

          <ul className="list-disc list-inside mt-2 space-y-2">
            <li className="text-custom-gray font-inter">
              {facility.rules || "No rules to show"}
            </li>
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
            <p className="font-inter font-semibold text-xl ">{facility.rate}</p>
          </div>
          <div className="ml-3 mr-3 border-b border-custom-gray"></div>

          <div className="text-custom-gray p-4 font-inter font-medium">
            <p>Select your date and Time</p>
          </div>

          <div className="p-3 flex justify-between items-center ">
            <p className="font-inter text-lg font-semibold ">Starting Time</p>

            <div className="flex-col items-end ">
              <input
                type="time"
                placeholder="Time"
                className="text-center"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
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
            <Calenderr setSelectedDate={setSelectedDate} />
          </div>

          <div className="flex justify-center pb-4">
            <div className="py-4 rounded-lg bg-custom-blue w-40 text-white  text-center  ">
              <button className="" onClick={handleCheckAvailability}>
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReserveAlert && (
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-custom-black bg-opacity-50">
          <ReservedAlert
            onClick={handleRequestToHost}
            onClose={() => {
              setShowReserveALert(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Exploredetails;
