import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Slider from "./Slider";
import DeleteAccountModal from "../../../components/popups/SettingsPopups/DeleteAccount";
import { deleteFacilityFromFirestore } from "../../../firebase/Functions/FacilityFunctions";

const FacilityCard = ({
  id,
  imageUrls = [],
  rate,
  address,
  hours,
  courtName,
  onDelete,
  time,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteFacilityFromFirestore(id);
      onDelete(id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="relative rounded-lg h-96 overflow-hidden shadow-lg bg-white">
        <Slider imageUrls={imageUrls} />

        <div className="absolute top-2 left-2 ">
          <button className="px-4 py-1 bg-white rounded-full shadow">
            Edit
          </button>
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2 bg-white rounded-full shadow"
          >
            <RiDeleteBinLine className="text-red-500" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-md font-semibold text-custom-black flex justify-between">
            <span>{courtName}</span>
            <span>{rate}</span>
          </h3>
          <div className="flex items-center pt-3">
            <img
              src="/Home/location.png"
              alt="Location Icon"
              className="w-3 h-4 mr-2"
            />
            <p className="text-custom-black text-sm font-semibold">{address}</p>
          </div>
          <div className="flex items-center mt-3">
            <img
              src="/Home/time.png"
              alt="Time Icon"
              className="w-4 h-4 mr-2"
            />
            <span className="text-payment-gray text-sm w-[90%] break-words">
              {hours}
            </span>
          </div>
          <span className="text-payment-gray text-sm ml-7">{time}</span>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FacilityCard;
