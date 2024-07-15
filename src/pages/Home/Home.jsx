import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBar from "../../components/SeacrhBar/SearchBar";
import ExploreButton from "../../components/buttons/Verify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import CustomDateInput from "./Components/CustomDateInput";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState();

  return (
    <div className="flex flex-col items-center mt-16 px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-screen-2xl">
        <div className="text-center lg:text-left lg:w-1/2 p-4 mt-12">
          <img
            src="/Home/explode.png"
            alt="Explode Image"
            className="w-24 ml-4"
          />
          <h1 className="text-6xl font-bold mb-4 text-custom-black leading-tight">
            New designs
            <br />
            New inspirations
          </h1>
          <p className="text-custom-gray mb-6 text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur
            <br />
            adipiscing elit. Faucibus in libero risus semper
            <br />
            habitant arcu eget. Et integer facilisi eget diam.
          </p>
          <ExploreButton text="Explore" />
        </div>
        <div className="flex items-end justify-end lg:w-1/2 p-4">
          <img src="/Home/star.png" alt="Star" />
          <img src="/Home/home.png" alt="Basketball" className="rounded-xl" />
        </div>
      </div>
      <div className="w-full max-w-screen-2xl bg-custom-gradient text-white py-12 mt-8 mb-6 rounded-3xl">
        <div className="flex justify-around">
          <div className="px-2">
            <img src="/Home/cloud.png" alt="cloud" className="mb-2" />
            <h2 className="font-semibold text-2xl mb-2">Discover</h2>
            <p className="text-gray-200 text-lg font-semibold leading-relaxed">
              Lorem ipsum dolor sit
              <br />
              amet, consectetur
              <br />
              adipiscing elit.
            </p>
          </div>
          <div className="px-2">
            <img src="/Home/cloud.png" alt="cloud" className="mb-2" />
            <h2 className="font-semibold text-2xl mb-2">Book</h2>
            <p className="text-gray-200 text-lg font-semibold leading-relaxed">
              Lorem ipsum dolor sit
              <br />
              amet, consectetur
              <br />
              adipiscing elit.
            </p>
          </div>
          <div className="px-2">
            <img src="/Home/cloud.png" alt="cloud" className="mb-2" />
            <h2 className="font-semibold text-2xl mb-2">Play</h2>
            <p className="text-gray-200 text-lg font-semibold leading-relaxed">
              Lorem ipsum dolor sit
              <br />
              amet, consectetur
              <br />
              adipiscing elit.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-64 mt-16 w-1/2 items-center">
        <SearchBar />
        <div className="flex space-x-4 ml-8 mt-10 items-center">
          <div className="relative bg-gray-200 border p-2 border-gray-400 rounded-md flex items-center justify-center">
            <img
              src="/Home/basketball.png"
              alt="basketball"
              className="w-12 h-10"
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
              className="w-12 h-10"
            />
          </div>

          <div className="relative max-w-sm pl-6">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              customInput={<CustomDateInput />}
              className="border rounded-md bg-navbar-gray"
            />
          </div>

          <div class="relative">
            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                class="w-5 h-5 text-custom-blue dark:text-custom-blue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="time"
              class="bg-gray-50 border leading-none text-custom-black text-sm rounded-lg block w-full p-2.5 dark:bg-gray-100 dark:placeholder-custom-black "
              min="09:00"
              max="18:00"
              // value="00:00"
              placeholder="Time"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
