import React, { useState, useEffect } from "react";
import { RxArrowLeft } from "react-icons/rx";

import Input from "./components/Input";
import StartingAndEndingInput from "./components/StartingAndEndingInput";

import DaySign from "./components/DaySign";

import Slider from "./components/Slider";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./components/Button";

const AddFacility = () => {
  const locationn = useLocation();
  const facilityData = locationn.state?.facility;
  const isEdit = locationn.state?.isEdit;

  console.log("HELL", isEdit);

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
    if (modifier === "AM" && hours === "12") hours = 0;
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  };

  const [courtName, setCourtName] = useState(facilityData?.courtName || "");
  const [gymName, setGymName] = useState(facilityData?.gymName || "");
  const [location, setLocation] = useState(facilityData?.location || "");
  const [description, setDescription] = useState(
    facilityData?.description || ""
  );
  const [houseRules, setHouseRules] = useState(facilityData?.houseRules || "");

  const [startingTime, setStartingTime] = useState(
    facilityData?.startingTime ? convertTo24Hour(facilityData.startingTime) : ""
  );
  const [closingTime, setClosingTime] = useState(
    facilityData?.closingTime ? convertTo24Hour(facilityData.closingTime) : ""
  );

  const [pricePerHour, setPricePerHour] = useState(
    facilityData?.amountPerHour || ""
  );
  const [images, setImages] = useState(facilityData?.imageUrls || []);
  const [selectedDays, setSelectedDays] = useState(
    facilityData?.selectedDays || []
  );

  const navigate = useNavigate();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const facilityData = {
      courtName,
      gymName,
      location,
      description,
      houseRules,
      startingTime,
      closingTime,
      pricePerHour,
      images,
      selectedDays,
    };

    navigate("/facilitydetails", { state: { facilityData, isEdit } });
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };
  return (
    <div className="p-4 sm:p-8 px-4 sm:px-12 ">
      {/* Profile and icon */}

      <div
        className="flex space-x-2 items-center cursor-pointer "
        onClick={() => {
          navigate(-1);
        }}
      >
        <RxArrowLeft className="h-6 w-6 " />
        <p className="text-custom-black  text-2xl font-inter font-semibold">
          {isEdit ? "Update a Facility" : "Add a Facility"}
        </p>
      </div>

      <div className=" flex flex-col lg:flex lg:flex-row py-4">
        <div className="flex-1 ">
          <p className="font-inter font-semibold text-lg">Facility details</p>

          <div className="py-4 space-y-6">
            <Input
              placeholder="Basketball Court Name"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-custom-black "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
            />

            <Input
              placeholder="Gym Name"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-custom-black "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
            />

            <Input
              placeholder="Location"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-custom-black "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Input
              placeholder="Description"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-custom-black "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              placeholder="House Rules"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-custom-black "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={houseRules}
              onChange={(e) => setHouseRules(e.target.value)}
            />
          </div>

          <div className="py-4">
            <p className="font-inter text-xl font-semibold ">
              Opening and Closing Time
            </p>

            <div className="flex py-2 space-x-8">
              <StartingAndEndingInput
                placeholder="Starting time "
                borderColor="border-border-color"
                placeholderColor="placeholder-placeholder-color"
                textColor="text-custom-black "
                fontSize="text-lg"
                fontFamily="font-inter"
                bold="font-semibold"
                value={startingTime}
                onChange={(e) => setStartingTime(e.target.value)}
              />

              <StartingAndEndingInput
                placeholder="Closing time "
                borderColor="border-border-color"
                placeholderColor="placeholder-placeholder-color"
                textColor="text-custom-black "
                fontSize="text-lg"
                fontFamily="font-inter"
                bold="font-semibold"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex  space-x-6 p-4">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <DaySign
                key={index}
                text={day.charAt(0)}
                bgColor="bg-white"
                borderColor="border-placeholder-color"
                textColor="text-black"
                selected={selectedDays.includes(day)}
                onClick={() => toggleDaySelection(day)}
              />
            ))}
          </div>

          <div className="py-4">
            <p className="font-inter text-xl font-semibold ">
              Setup Price per hour{" "}
            </p>

            <div className="py-2">
              <Input
                placeholder="Amount / hr"
                borderColor="border-border-color"
                placeholderColor="placeholder-placeholder-color "
                textColor="text-custom-black "
                fontSize="text-base "
                fontFamily="font-inter"
                bold="font-semibold"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex-1  ">
          <div className="">
            <p className="font-inter font-semibold text-lg ">Gallery</p>
            <div className=" py-4  rounded-lg">
              <Slider
                images={images}
                handleUpload={handleUpload}
                handleDelete={handleDelete}
              />
            </div>

            <div className="flex space-x-4 justify-center items-end h-96 ">
              <Button
                bgColor="bg-white"
                text="Cancel"
                textColor="text-black"
                onClick={() => {
                  navigate(-1);
                }}
              />

              <Button
                onClick={handleSave}
                bgColor="bg-custom-gradient"
                text="Save"
                textColor="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
