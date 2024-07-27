import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SeacrhBar/SearchBar";
import ExploreButton from "../../components/buttons/Verify";
import CustomDateInput from "../../components/DateAndTime/CustomDateInput";
import CustomTimeInput from "../../components/DateAndTime/CustomTimeInput";
import SearchButton from "../../components/buttons/Verify";
import FacilityCard from "../../components/Card/Card";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import FormatDays from "../../utils/FormatDays/FormatDays";
import {
  fetchPopularFacilities,
  fetchNearbyFacilities,
} from "../../firebase/Functions/FacilityFunctions";
import ReviewPopup from "../../components/popups/ReviewPopup/ReviewPopup";
import { getExpiredUserBookings } from "../../firebase/Functions/BookingFunctions";

const ITEMS_PER_PAGE = 6;
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [popularFacilities, setPopularFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickBasketBall, setClickBasketBall] = useState(false);
  const [clickFootball, setClickFootball] = useState(false);
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [popularPage, setPopularPage] = useState(1);
  const [nearbyPage, setNearbyPage] = useState(1);
  const [expiredBooking, setExpiredBooking] = useState(null);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const checkBookings = async () => {
      if (uid) {
        const expiredBookings = await getExpiredUserBookings(uid);
        if (expiredBookings.length > 0) {
          setExpiredBooking(expiredBookings[0]);
          setShowReviewPopup(true);
        }
      }
    };
    checkBookings();
  }, [uid]);

  const handleClosePopup = () => {
    setShowReviewPopup(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyFacilities(setNearbyFacilities, setLoading, userLocation, 50);
    }
  }, [userLocation]);

  useEffect(() => {
    const getFacilities = async () => {
      setLoading(true);
      try {
        const facilities = await fetchPopularFacilities(
          setPopularFacilities,
          setLoading
        );
      } catch (err) {
        setError("Failed to fetch popular facilities");
      } finally {
        setLoading(false);
      }
    };

    getFacilities();
  }, []);

  const toogleBasketBall = () => {
    setClickBasketBall(true);
    setClickFootball(false);
  };

  const toogleFootball = () => {
    setClickFootball(true);
    setClickBasketBall(false);
  };

  const getRandomStatus = () => {
    const statuses = ["Open Now", "Already Booked"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  const startIndexPopular = (popularPage - 1) * ITEMS_PER_PAGE;
  const endIndexPopular = startIndexPopular + ITEMS_PER_PAGE;
  const currentPopularItems = popularFacilities.slice(
    startIndexPopular,
    endIndexPopular
  );

  const startIndexNearby = (nearbyPage - 1) * ITEMS_PER_PAGE;
  const endIndexNearby = startIndexNearby + ITEMS_PER_PAGE;
  const currentNearbyItems = nearbyFacilities.slice(
    startIndexNearby,
    endIndexNearby
  );

  const handlePopularPageChange = (page) => {
    setPopularPage(page);
  };

  const handleNearbyPageChange = (page) => {
    setNearbyPage(page);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col items-center mt-16 px-4 relative">
      {showReviewPopup && expiredBooking && (
        <ReviewPopup
          onClose={handleClosePopup}
          bookingId={expiredBooking.id}
          facilityId={expiredBooking.facilityId}
        />
      )}
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-screen-2xl">
        <div className="text-center lg:text-left lg:w-1/2 p-4 mt-12">
          <img
            src="/Home/explode.png"
            alt="Explode Image"
            className="w-24 ml-4  "
          />
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-custom-black leading-tight">
            New designs
            <br />
            New inspirations
          </h1>
          <p className="text-custom-gray mb-6 text-lg lg:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur
            <br />
            adipiscing elit. Faucibus in libero risus semper
            <br />
            habitant arcu eget. Et integer facilisi eget diam.
          </p>
          <Link to="/explore">
            <ExploreButton text="Explore" />
          </Link>
        </div>
        <div className="flex items-end justify-center lg:justify-end lg:w-1/2 p-4">
          <img src="/Home/star.png" alt="Star" />
          <img
            src="/Home/home.png"
            alt="Basketball"
            className="rounded-xl mr-24 lg:mr-0"
          />
        </div>
      </div>
      <div className="w-full max-w-screen-2xl bg-custom-gradient text-white py-12 mt-8 mb-6 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-around text-center md:text-left">
          <div className="px-2 mb-6 md:mb-0">
            <img src="/Home/cloud.png" alt="cloud" className="mb-2" />
            <h2 className="font-semibold text-xl md:text-2xl mb-2">Discover</h2>
            <p className="text-gray-200 text-base md:text-lg font-semibold leading-relaxed">
              Lorem ipsum dolor sit
              <br />
              amet, consectetur
              <br />
              adipiscing elit.
            </p>
          </div>
          <div className="px-2 mb-6 md:mb-0">
            <img src="/Home/cloud.png" alt="cloud" className="mb-2" />
            <h2 className="font-semibold text-xl md:text-2xl mb-2">Book</h2>
            <p className="text-gray-200 text-base md:text-lg font-semibold leading-relaxed">
              Lorem ipsum dolor sit
              <br />
              amet, consectetur
              <br />
              adipiscing elit.
            </p>
          </div>
          <div className="px-2">
            <img src="/Home/cloud.png" alt="cloud" className="mb-2" />
            <h2 className="font-semibold text-xl md:text-2xl mb-2">Play</h2>
            <p className="text-gray-200 text-base md:text-lg font-semibold leading-relaxed">
              Lorem ipsum dolor sit
              <br />
              amet, consectetur
              <br />
              adipiscing elit.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full md:w-3/4 lg:w-1/2">
        <SearchBar />
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 w-full">
          <div className="flex flex-row md:flex-row space-y-4 md:space-y-0 space-x-4 items-center">
            <div
              className={`relative  border  -mb-4 md:-mb-0 border-gray-400 lg:-mb-0 p-2 ${
                clickBasketBall && "bg-gray-200"
              }  rounded-md flex items-center justify-center `}
            >
              <img
                onClick={toogleBasketBall}
                src="/Home/basketball.png"
                alt="basketball"
                className="  w-14 h-7 cursor-pointer  md:w-8 md:h-8 lg:w-8 lg:h-8"
              />

              {clickBasketBall && (
                <img
                  d
                  src="/Home/tick.png"
                  className="absolute -top-1  -right-1 w-4 h-4 bg-custom-blue rounded-sm"
                />
              )}
            </div>
            <div
              className={`   ${
                clickFootball && "bg-gray-200"
              } relative border p-2 border-gray-400 rounded-md flex items-center justify-center`}
            >
              <img
                onClick={toogleFootball}
                src="/Home/football.png"
                alt="football"
                className="w-14 h-7 md:h-8 md:w-6 lg:w-8 lg:h-8 cursor-pointer"
              />

              {clickFootball && (
                <img
                  src="/Home/tick.png"
                  className="absolute -top-1  -right-1 w-4 h-4 bg-custom-blue rounded-sm"
                />
              )}
            </div>
            <div className="relative max-w-sm">
              <CustomDateInput
                selectedDate={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
            <CustomTimeInput
              selectedTime={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          <button className="bg-navbar-gray mt-4 md:mt-0 rounded-full w-28 h-10 text-custom-blue border border-custom-blue">
            Near Me
          </button>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <SearchButton text="Search" />
        </div>
      </div>
      <div className="py-10 flex flex-col items-center justify-center">
        <h1 className="text-custom-black text-4xl font-bold text-center ">
          Popular Basketball Gyms
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  sm:px-0 lg:px-28 py-10">
          {currentPopularItems.map((facility) => (
            <FacilityCard
              {...facility}
              key={facility.id}
              id={facility.id}
              rules={facility.rules}
              description={facility.description}
              createdBy={facility.createdBy}
              courtName={facility.basketCourtName}
              imageUrls={facility.facilityImagesList}
              rate={facility.amount}
              address={facility.location}
              hours={`${
                Array.isArray(facility.daysList) && facility.daysList.length > 0
                  ? `${FormatDays(facility.daysList)} `
                  : "No availability"
              }`}
              time={`
                  ${formatTime(facility.startTime)} - ${formatTime(
                facility.closeTime
              )}
                `}
              status={getRandomStatus()}
            />
          ))}
        </div>
      </div>

      <div className="mt-32 mb-64 flex flex-col items-center justify-center">
        <h1 className="text-custom-black text-4xl font-bold text-center mb-16">
          Basketball Gyms Near You
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:px-0 lg:px-28  ">
          {currentNearbyItems.map((facility) => (
            <FacilityCard
              {...facility}
              key={facility.id}
              id={facility.id}
              rules={facility.rules}
              description={facility.description}
              createdBy={facility.createdBy}
              courtName={facility.basketCourtName}
              imageUrls={facility.facilityImagesList}
              rate={facility.amount}
              address={facility.location}
              hours={`${
                Array.isArray(facility.daysList) && facility.daysList.length > 0
                  ? `${FormatDays(facility.daysList)} `
                  : "No availability"
              }`}
              time={`
                  ${formatTime(facility.startTime)} - ${formatTime(
                facility.closeTime
              )}
                `}
              status={getRandomStatus()}
            />
          ))}
        </div>

        <div className="absolute bottom-0  mb-8 left-0 right-6 sm:right-2 md:right-4 p-4">
          <Pagination
            items={nearbyFacilities}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handleNearbyPageChange}
          />
        </div>
        <div className="absolute bottom-0  mb-8 right-4 sm:right-10 bg-custom-gradient rounded-full p-4">
          <FaQuestion className="text-white w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default Home;
