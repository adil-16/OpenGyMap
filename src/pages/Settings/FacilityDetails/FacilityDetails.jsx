import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import { FaClock } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import Slider from "./components/Slider";
import Button from "../AddFacility/components/Button";
import { useFacilitiesData } from "../../../Context/FacilitiesDataContext/FacilitiesDataContext";
import FormatDays from "../../../utils/FormatDays/FormatDays";

const FacilityDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, addFacility, updateFacility } = useFacilitiesData();

  const facilityData = location.state?.facilityData;
  const isEdit = location.state?.isEdit;

  if (!facilityData) {
    return <p>No facility data found.</p>;
  }
  const handleSave = () => {
    const facilityToSave = {
      ...facilityData,
      imageUrls: facilityData.images || [],
    };

    console.log("Facility Data:", facilityToSave);
    addFacility(facilityToSave);
    navigate("/setting/myfacility");
  };

  const handleUpdate = () => {
    const updatedFacility = {
      ...facilityData,
      imageUrls: facilityData.images || [],
    };

    console.log("Updating facility:", updatedFacility);
    updateFacility(updatedFacility);

    console.log("data is ", data);

    navigate("/setting/myfacility");
  };

  return (
    <div className="p-4 sm:p-8 px-4 sm:px-6">
      <div className="flex space-x-2 items-center">
        <RxArrowLeft
          onClick={() => {
            navigate(-1);
          }}
          className="h-6 w-6"
        />
        <p className="text-custom-black text-xl sm:text-2xl font-inter font-semibold">
          Review and Add
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 py-4">
          <div className="flex justify-between">
            <p className="font-poppins text-xl sm:text-2xl font-semibold">
              {facilityData.courtName}
            </p>

            <div className="flex items-center space-x-2">
              <FaClock className="h-5 w-5 text-gray-500" />
              <p className="font-inter font-medium text-sm sm:text-base text-request-button-accepted">
                {FormatDays(facilityData.selectedDays)}{" "}
                <span>
                  {facilityData.startingTime} <span>-</span>{" "}
                </span>
                <span>{facilityData.closingTime}</span>
              </p>
            </div>
          </div>

          <div className="text-base sm:text-lg font-semibold text-custom-black font-inter py-2">
            {facilityData.gymName}
          </div>

          <div className="flex space-x-2 items-center">
            <MdLocationPin className="h-4 w-4 border-b-2 border-request-icon text-request-icon" />
            <p className="text-nav-gray text-sm font-inter">
              {facilityData.location}
            </p>
          </div>

          <div className="py-2 flex justify-between items-center">
            <p className="text-nav-gray text-base flex-1 font-medium font-inter">
              Price
            </p>
            <p className="text-custom-black text-lg sm:text-xl flex-1 font-semibold font-inter ml-16">
              {facilityData.pricePerHour}
            </p>
          </div>

          <div className="flex flex-col py-4 sm:py-6">
            <p className="font-inter font-semibold text-lg sm:text-xl">
              Description
            </p>
            <p className="font-inter font-normal text-nav-gray py-3">
              {facilityData.description}
            </p>
          </div>

          <div>
            <p className="font-inter font-semibold text-lg sm:text-xl">
              House Rules
            </p>
            <ul className="list-disc list-inside text-nav-gray px-3 py-3">
              <li className="text-nav-gray">{facilityData.houseRules}</li>
            </ul>
          </div>
        </div>
        <div className="flex-1 lg:pl-8">
          <div>
            <Slider images={facilityData.images} />
          </div>

          <div className="flex space-x-4 justify-center items-end h-48 lg:h-96 mt-4 lg:mt-0">
            <Button
              bgColor="bg-white"
              text="Cancel"
              onClick={() => {
                navigate(-1);
              }}
              textColor="text-black"
            />

            {!isEdit && (
              <Button
                onClick={handleSave}
                bgColor="bg-custom-gradient"
                text="Add"
                textColor="text-white"
              />
            )}

            {isEdit && (
              <Button
                onClick={handleUpdate}
                bgColor="bg-custom-gradient"
                text="Update"
                textColor="text-white"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
