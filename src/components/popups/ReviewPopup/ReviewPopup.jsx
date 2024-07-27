import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview } from "../../../firebase/Functions/ReviewsFunctions";
import { getUserDetails } from "../../../firebase/Functions/ApiFunctions";

const ReviewPopup = ({ onClose, bookingId, facilityId }) => {
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
      onClose();
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rating</h2>
          <button onClick={onClose} className="text-2xl text-gray-700">
            ×
          </button>
        </div>
        <div className="mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer text-2xl ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <div className="text-lg font-medium mt-2">{rating}.0</div>
        </div>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
