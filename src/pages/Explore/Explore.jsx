import React, { useState, useMemo } from "react";
import SearchBar from "../../components/SeacrhBar/SearchBar";
import CustomDateInput from "../../components/DateAndTime/CustomDateInput";
import CustomTimeInput from "../../components/DateAndTime/CustomTimeInput";
import SearchButton from "../../components/buttons/Verify";
import FormatDays from "../../utils/FormatDays/FormatDays";
import { FaQuestion } from "react-icons/fa";
import SearchAlert from "../../components/Alert/SearchAlert";
import Pagination from "../../components/Pagination/Pagination";

import FacilitiesData from "../../utils/CardsData/CardsData";
import FacilityCard from "../../components/Card/Card";

const ITEMS_PER_PAGE = 6;

const Explore = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showAlert, setShowALert] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: "",
    date: null,
    time: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchParamsChange = (field, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [field]: value }));
  };

  const handleSearch = () => {
    handleSearchParamsChange("location", searchQuery);
    handleSearchParamsChange("date", selectedDate);
    handleSearchParamsChange("time", selectedTime);
  };

  const getRandomStatus = () => {
    const statuses = ["Open Now", "Already Booked"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  // Paginate filtered cards
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = FacilitiesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      {showAlert ? (
        <div className="w-full max-w-screen-lg h-96 py-8 mx-auto">
          <SearchAlert />
        </div>
      ) : (
        <div className="mt-10 px-4 md:px-8 lg:px-16 relative">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="w-full md:flex-grow md:w-3/5 lg:w-2/5">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap space-x-4 ml-3 md:ml-0 lg:ml-0 items-center">
              <div className="relative bg-gray-200 border p-2 border-gray-400 rounded-md flex items-center justify-center">
                <img
                  src="/Home/basketball.png"
                  alt="basketball"
                  className="w-8 h-8"
                />
                <img
                  src="/Home/tick.png"
                  className="absolute -top-1 -right-1 w-4 h-4 bg-custom-blue rounded-sm"
                />
              </div>
              <div className="bg-white border p-2 border-gray-400 rounded-md flex items-center justify-center">
                <img
                  src="/Home/football.png"
                  alt="football"
                  className="w-8 h-8"
                />
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
              <SearchButton text="Search " onClick={handleSearch} />
            </div>
          </div>
          <div className="mt-20 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              {currentItems.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  id={facility.id}
                  courtName={facility.courtName}
                  imageUrls={facility.imageUrls}
                  rate={`${facility.amountPerHour}`}
                  address={facility.location}
                  hours={`${
                    Array.isArray(facility.selectedDays) &&
                    facility.selectedDays.length > 0
                      ? `${FormatDays(facility.selectedDays)} `
                      : "No availability"
                  }`}
                  time={`
                  ${facility.startingTime} - ${facility.closingTime}
                `}
                  status={getRandomStatus()}
                />
              ))}
            </div>

            <Pagination
              items={FacilitiesData}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="py-24">
            <div className="absolute bottom-0 mb-8 right-4 sm:right-10 bg-custom-gradient rounded-full p-4">
              <FaQuestion className="text-white w-8 h-8" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
