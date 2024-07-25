import React, { useState, useEffect } from "react";
import FacilityCard from "../components/FacilityCard";
import FormatDays from "../../../utils/FormatDays/FormatDays";
import { useNavigate } from "react-router-dom";
import { useFacilitiesData } from "../../../Context/FacilitiesDataContext/FacilitiesDataContext";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const ITEMS_PER_PAGE = 4;

const MyFacility = () => {
  const navigate = useNavigate();
  const { data: facilities, loading, fetchFacilities } = useFacilitiesData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  const totalPages = Math.ceil(facilities.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = facilities.slice(startIndex, endIndex);
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        My Facility ({facilities.length})
      </h1>
      <div className="border-b border-payment-gray py-1 w-full mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-custom-black text-md font-semibold mb-4">
            Facilities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              <div>Loading facilities...</div>
            ) : (
              currentItems.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  id={facility.id}
                  courtName={facility.basketCourtName}
                  imageUrls={facility.facilityImagesList}
                  rate={`$${facility.amount}/hr`}
                  address={facility.location}
                  hours={`${
                    Array.isArray(facility.daysList) &&
                    facility.daysList.length > 0
                      ? `${FormatDays(facility.daysList)} ${formatTime(
                          facility.startTime
                        )} - ${formatTime(facility.closeTime)}`
                      : "No availability"
                  }`}
                />
              ))
            )}
          </div>

          {!loading ? (
            <div className="flex justify-center items-center mt-6 pb-3">
              <IoIosArrowDropleftCircle
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 cursor-pointer"
              />
              <span className="px-4 py-2 text-black rounded">
                Page {currentPage} of {totalPages}
              </span>
              <IoIosArrowDroprightCircle
                className="h-8 w-8 cursor-pointer"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </div>
          ) : null}
        </div>
        <div className="pl-4">
          <p className="text-custom-black text-md font-semibold mb-4">
            Revenue Generated
          </p>
          <div className="flex flex-col items-center">
            <div className="bg-custom-gradient rounded-3xl p-20 text-white shadow-md mb-4 w-full">
              <h2 className="flex items-center justify-center text-lg font-semibold mb-2">
                Revenue
              </h2>
              <p className="flex items-center justify-center text-3xl font-bold">
                $31,250
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/addfacility");
            }}
            className="bg-white text-custom-blue font-semibold py-4 px-16 border rounded-full mt-6"
          >
            Add a facility
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyFacility;
