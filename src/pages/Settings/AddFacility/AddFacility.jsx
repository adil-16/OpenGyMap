import React, { useState } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import Input from "./components/Input";
import StartingAndEndingInput from "./components/StartingAndEndingInput";
import DaySign from "./components/DaySign";
import Slider from "./components/Slider";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const AddFacility = () => {
  const [basketCourtName, setBasketCourtName] = useState("");
  const [gymName, setGymName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [startTime, setStartTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [amount, setAmount] = useState("");
  const [facilityImagesList, setFacilityImagesList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLat] = useState(null);
  const [longitude, setLng] = useState(null);

  const [daysList, setDaysList] = useState([]);

  const navigate = useNavigate();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFacilityImagesList((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    setFacilityImagesList((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    const facilityData = {
      // facilityId: uuidv4(),
      basketCourtName,
      gymName,
      location,
      description,
      rules,
      startTime: `${getTodayDate()}T${startTime}:00.000`,
      closeTime: `${getTodayDate()}T${closeTime}:00.000`,
      amount,
      facilityImagesList,
      daysList,
      latitude,
      longitude,
      bookingDateAndTime: [],
      bookingList: [],
      createdAt: new Date().toISOString(),
    };

    navigate("/facilitydetails", { state: { facilityData } });
  };

  const toggleDaySelection = (day) => {
    setDaysList((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const fetchSuggestions = async (input) => {
    if (input.length > 2) {
      try {
        const response = await fetch(
          `/maps/api/place/autocomplete/json?input=${input}&key=${
            import.meta.env.VITE_GOOGLE_MAPS_API
          }`
        );
        const data = await response.json();
        setSuggestions(data.predictions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setLocation(input);
    fetchSuggestions(input);
  };

  const handleSuggestionClick = async (suggestion) => {
    setLocation(suggestion.description);
    setSuggestions([]);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${
          suggestion.place_id
        }&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
      );
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <div className="p-4 sm:p-8 px-4 sm:px-12 ">
      <div
        className="flex space-x-2 items-center cursor-pointer "
        onClick={() => {
          navigate(-1);
        }}
      >
        <RxArrowLeft className="h-6 w-6 " />
        <p className="text-custom-black  text-2xl font-inter font-semibold">
          Add a Facility
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
              textColor="text-placeholder-color "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={basketCourtName}
              onChange={(e) => setBasketCourtName(e.target.value)}
            />

            <Input
              placeholder="Gym Name"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-placeholder-color "
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
              textColor="text-placeholder-color "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={location}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md w-full mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}

            <Input
              placeholder="Description"
              borderColor="border-border-color"
              placeholderColor="placeholder-placeholder-color "
              textColor="text-placeholder-color "
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
              textColor="text-placeholder-color "
              fontSize="text-base "
              fontFamily="font-inter"
              bold="font-semibold"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
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
                textColor="text-placeholder-color"
                fontSize="text-lg"
                fontFamily="font-inter"
                bold="font-semibold"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />

              <StartingAndEndingInput
                placeholder="Closing time "
                borderColor="border-border-color"
                placeholderColor="placeholder-placeholder-color"
                textColor="text-placeholder-color"
                fontSize="text-lg"
                fontFamily="font-inter"
                bold="font-semibold"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
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
                selected={daysList.includes(day)}
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
                textColor="text-placeholder-color "
                fontSize="text-base "
                fontFamily="font-inter"
                bold="font-semibold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="flex-1  ">
          <div>
            <p className="font-inter font-semibold text-lg">Gallery</p>

            <div className="py-4 ">
              <Slider
                images={facilityImagesList}
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
