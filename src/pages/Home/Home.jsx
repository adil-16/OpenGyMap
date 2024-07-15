import React from "react";
import { CiSearch } from "react-icons/ci";

const Home = () => {
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
          <button className="bg-custom-gradient text-white py-3 px-16 rounded-full">
            Explore
          </button>
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
      <div className="relative mb-64 mt-16 w-1/2">
        <CiSearch className="absolute left-6  top-1/2 transform -translate-y-1/2 text-custom-black font-bold text-4xl" />
        <input
          placeholder="Search by game, venue, location"
          type="text"
          className="w-full p-6 pl-24 border border-gray-300 rounded-full shadow-xl bg-gray-50 text-custom-black dark:bg-white"
        />
      </div>
    </div>
  );
};

export default Home;
