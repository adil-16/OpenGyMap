import React from "react";
import FacilityCard from "../components/FacilityCard";
import facilities from "../../../utils/FacilitiesData/FacilitiesData";
import { useNavigate } from "react-router-dom";
import FormatDays from "../../../utils/FormatDays/FormatDays";

import { useFacilitiesData } from "../../../Context/FacilitiesDataContext/FacilitiesDataContext";

const MyFacility = () => {
  const navigate = useNavigate();
  const { data: facilities } = useFacilitiesData(); // Get facilities data from context

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
            {facilities.map((facility) => (
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
                    ? `${FormatDays(facility.selectedDays)} ${
                        facility.startingTime
                      } - ${facility.closingTime}`
                    : "No availability"
                }`}
              />
            ))}
          </div>
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
