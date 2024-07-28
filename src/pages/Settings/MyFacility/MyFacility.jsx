import React, { useState, useEffect } from "react";
import FacilityCard from "../components/FacilityCard";
import FormatDays from "../../../utils/FormatDays/FormatDays";
import { useNavigate } from "react-router-dom";
import { useFacilitiesData } from "../../../Context/FacilitiesDataContext/FacilitiesDataContext";
import Pagination from "../../../components/Pagination/Pagination";
import { fetchFacilitiesFromFirestore } from "../../../firebase/Functions/FacilityFunctions";
import Loader from "../../../components/Loader/Loader";

const ITEMS_PER_PAGE = 4;

const MyFacility = () => {
  const navigate = useNavigate();
  const { data: facilities, setData } = useFacilitiesData();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFacilitiesFromFirestore(setData, setLoading);
  }, [setData, setLoading]);

  const totalPages = Math.ceil(facilities.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log("Facilities data in component:", facilities);
  }, [facilities]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = facilities.slice(startIndex, endIndex);

  const handleEdit = (facility) => {
    navigate("/addfacility", { state: { facility, isEdit: true } });
    console.log("facility ", facility);
  };

  const handleDeleteFacility = (id) => {
    setData((prevFacilities) =>
      prevFacilities.filter((facility) => facility.id !== id)
    );
  };

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
              <div className="w-full h-screen flex items-center justify-center ml-16">
                <Loader />
              </div>
            ) : currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-56">
                No facility found
              </div>
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
                      ? `${FormatDays(facility.daysList)} `
                      : "No availability"
                  }`}
                  time={`
                  ${formatTime(facility.startTime)} - ${formatTime(
                    facility.closeTime
                  )}
                `}
                  onEdit={() => handleEdit(facility)}
                  onDelete={handleDeleteFacility}
                />
              ))
            )}
          </div>

          {currentItems.length > 0 ? (
            !loading ? (
              <div className="   left-0 right-6 sm:right-2 md:right-4 p-4">
                <Pagination
                  items={facilities}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : null
          ) : (
            ""
          )}
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
