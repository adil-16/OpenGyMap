import React, { useState } from "react";
import Crossicon from "../../buttons/Crossicon";
import StarRating from "./components/StarRating";
import { addReview } from "../../../firebase/Functions/ReviewsFunctions";

const ReviewPopup = ({ handleClose, bookingId, facilityId }) => {
  const [rating, setRating] = useState(4);
  const [message, setMessage] = useState("");
  const uid = localStorage.getItem("uid");

  const handleSubmit = async () => {
    try {
      const reviewData = {
        userId: uid,
        bookingId,
        facilityId,
        rating,
        reviewText: message,
      };
      await addReview(reviewData);
      handleClose();
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <div className="    h-auto  rounded-lg   ">
      <div className="flex justify-between p-4">
        <p className="font-inter font-semibold text-custom-black text-xl">
          Review
        </p>
        <Crossicon onClick={handleClose} />
      </div>
      <div className=" w-full   border-b border-nav-gray"></div>

      <div className="py-4 ">
        <StarRating
          rating={rating}
          handleRating={handleRating}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <div className="flex   space-x-4 justify-center">
        <div className=" border border-nav-gray p-4 mb-2 px-12 rounded-full ">
          <button onClick={handleClose}>Cancel</button>
        </div>
        <div className="border border-nav-gray bg-custom-gradient text-white p-4 mb-2 px-12 rounded-full">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
