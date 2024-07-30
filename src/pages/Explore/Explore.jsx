import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../../components/SeacrhBar/SearchBar";
import CustomDateInput from "../../components/DateAndTime/CustomDateInput";
import CustomTimeInput from "../../components/DateAndTime/CustomTimeInput";
import SearchButton from "../../components/buttons/Verify";
import FormatDays from "../../utils/FormatDays/FormatDays";
import { FaQuestion } from "react-icons/fa";
import SearchAlert from "../../components/Alert/SearchAlert";
import Pagination from "../../components/Pagination/Pagination";
import { fetchFacilitiesForUser } from "../../firebase/Functions/FacilityFunctions";
import FacilityCard from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import moment from "moment";

const ITEMS_PER_PAGE = 6;

function getStatus(facility) {
  const now = moment();
  const currentDay = now.format("dddd");

  if (facility.daysList.includes(currentDay)) {
    const startTime = moment(facility.startTime);
    const closeTime = moment(facility.closeTime);

    const startTimeToday = now.clone().set({
      hour: startTime.get("hour"),
      minute: startTime.get("minute"),
      second: startTime.get("second"),
    });

    const closeTimeToday = now.clone().set({
      hour: closeTime.get("hour"),
      minute: closeTime.get("minute"),
      second: closeTime.get("second"),
    });

    if (now.isBetween(startTimeToday, closeTimeToday)) {
      return "Open Now";
    }
  }

  return "Closed Now";
}

const Explore = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showAlert, setShowALert] = useState(false);
  const [clickBasketBall, setClickBasketBall] = useState(false);
  const [clickFootball, setClickFootball] = useState(false);
  const [filteredFacilities, setFilteredFacilities] = useState([]);

  const [searchParams, setSearchParams] = useState({
    courtName: "",
    gymName: "",
    location: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        await fetchFacilitiesForUser(setFacilities, setLoading);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const handleSearchParamsChange = (field, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [field]: value }));
  };

  const handleSearchBarChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    handleSearchParamsChange("location", newValue);
  };

  useEffect(() => {
    const filterFacilities = () => {
      const { location, courtName, gymName } = searchParams;

      const lowercasedLocation = location.toLowerCase();
      const lowercasedCourtName = courtName.toLowerCase();
      const lowercasedGymName = gymName.toLowerCase();

      const filtered = facilities.filter((facility) => {
        return (
          (lowercasedLocation === "" ||
            facility.location.toLowerCase().includes(lowercasedLocation)) &&
          (lowercasedCourtName === "" ||
            facility.basketCourtName
              .toLowerCase()
              .includes(lowercasedCourtName)) &&
          (lowercasedGymName === "" ||
            facility.gymName.toLowerCase().includes(lowercasedGymName))
        );
      });

      setFilteredFacilities(filtered);
      if (filtered.length === 0) {
        setShowALert(true);
      } else {
        setShowALert(false);
      }
    };

    filterFacilities();
  }, [searchParams, facilities]);

  const getRandomStatus = () => {
    const statuses = ["Open Now", "Already Booked"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredFacilities.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatTime = (timeString) => {
    const date = moment(timeString, moment.ISO_8601);
    return date.format("hh:mm A");
  };

  const toogleBasketBall = () => {
    setClickBasketBall(true);
    setClickFootball(false);
  };

  const toogleFootball = () => {
    setClickFootball(true);
    setClickBasketBall(false);
  };
  return (
    <>
      <div className="mt-10 px-4 md:px-8 lg:px-16 relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="w-full md:flex-grow md:w-3/5 lg:w-2/5">
            <SearchBar value={searchQuery} onChange={handleSearchBarChange} />
          </div>
          <div className="flex flex-wrap space-x-4 ml-3 md:ml-0 lg:ml-0 items-center">
            <div
              className={`relative border p-2 border-gray-400 rounded-md flex items-center justify-center ${
                clickBasketBall && "bg-gray-200"
              }`}
            >
              <img
                src="/Home/basketball.png"
                onClick={toogleBasketBall}
                alt="basketball"
                className="w-8 h-8 cursor-pointer"
              />
              {clickBasketBall && (
                <img
                  src="/Home/tick.png"
                  className="absolute -top-1 -right-1 w-4 h-4 bg-custom-blue rounded-sm"
                />
              )}
            </div>
            <div
              className={`border relative p-2 border-gray-400 rounded-md flex items-center justify-center ${
                clickFootball && "bg-gray-200"
              }`}
            >
              <img
                onClick={toogleFootball}
                src="/Home/football.png"
                alt="football"
                className="w-8 h-8 cursor-pointer"
              />
              {clickFootball && (
                <img
                  src="/Home/tick.png"
                  className="absolute -top-1 -right-1 w-4 h-4 bg-custom-blue rounded-sm"
                />
              )}
            </div>
            <div className="relative">
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
          <div className="flex space-x-4 items-center">
            <button className="bg-navbar-gray rounded-full w-28 h-10 text-custom-blue border border-custom-blue">
              Near Me
            </button>
            <SearchButton text="Search " />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          {loading ? (
            <div className="w-full h-screen flex items-center justify-center">
              <Loader />
            </div>
          ) : showAlert ? (
            <div className="w-full max-w-screen-lg h-96 py-8 mx-auto">
              <SearchAlert />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:px-0 lg:px-28">
              {currentItems.map((facility) => (
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
                    Array.isArray(facility.daysList) &&
                    facility.daysList.length > 0
                      ? `${FormatDays(facility.daysList)} `
                      : "No availability"
                  }`}
                  time={`
                    ${formatTime(facility.startTime)} - ${formatTime(
                    facility.closeTime
                  )}
                  `}
                  status={getStatus(facility)}
                  gymName={facility.gymName}
                  longitude={facility.longitude}
                  latitude={facility.latitude}
                  daysList={facility.daysList}
                  bookingDateAndTime={facility.bookingDateAndTime}
                  bookingList={facility.bookingList}
                />
              ))}
            </div>
          )}
        </div>

        <div className="py-24">
          {filteredFacilities.length > 0 && (
            <div className="absolute bottom-0 left-0 right-6 sm:right-2 md:right-4 p-4">
              <Pagination
                items={filteredFacilities}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          <div className="absolute bottom-0 mb-8 right-4 sm:right-10 bg-custom-gradient rounded-full p-4">
            <FaQuestion className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
