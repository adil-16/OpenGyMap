import React, { useState, useEffect } from "react";
import FacilityCard from "../components/FacilityCard";
import FormatDays from "../../../utils/FormatDays/FormatDays";
import { useNavigate } from "react-router-dom";
import { useFacilitiesData } from "../../../Context/FacilitiesDataContext/FacilitiesDataContext";

import Pagination from "../../../components/Pagination/Pagination";

const ITEMS_PER_PAGE = 4;

const MyFacility = () => {
  const navigate = useNavigate();
  const { data: facilities } = useFacilitiesData();
  const [currentPage, setCurrentPage] = useState(1);

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
            {currentItems.map((facility) => (
              <FacilityCard
                key={facility.id}
                id={facility.id}
                courtName={facility.courtName}
                imageUrls={facility.imageUrls}
                rate={facility.pricePerHour}
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
                onEdit={() => handleEdit(facility)}
              />
            ))}
          </div>

          <Pagination
            items={facilities}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
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
