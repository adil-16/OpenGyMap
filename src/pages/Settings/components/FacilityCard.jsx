import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Slider from "./Slider";
import DeleteAccountModal from "../../../components/popups/SettingsPopups/DeleteAccount";
import { deleteFacilityFromFirestore } from "../../../firebase/Functions/FacilityFunctions";
import { HiClock } from "react-icons/hi2";
import { toast } from "react-toastify";

const FacilityCard = ({
  id,
  imageUrls = [],
  rate,
  address,
  hours,
  courtName,
  onDelete,
  time,
  onEdit,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteFacilityFromFirestore(id);
      onDelete(id);

      setIsDeleteModalOpen(false);
      toast.success("Facility deleted Successfully");
    } catch (error) {
      console.error("Error deleting facility:", error);
      toast.error("Error deleting facility:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" max-w-full ">
      <div className="relative rounded-lg  h-[100%] overflow-hidden shadow-lg bg-white">
        <Slider imageUrls={imageUrls} />

        <div className="absolute top-2 left-2 ">
          <button
            onClick={onEdit}
            className="px-4 py-1 bg-white rounded-full shadow"
          >
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
            <span className="break-words w-[50%] truncate">{courtName}</span>
            <span className="break-words w-[30%]">{rate}</span>
          </h3>
          <div className="flex items-start pt-3">
            <img
              src="/Home/location.png"
              alt="Location Icon"
              className="w-3 h-4 mr-2 my-1"
            />
            <div className="text-custom-black text-sm font-semibold  w-[90%] truncate break-words  ">
              {address}
            </div>
          </div>
          <div className="flex items-start mt-3">
            <HiClock className="w-5 h-5 mr-2 text-Privacypolicy-text" />
            <span className="text-payment-gray text-sm break-words w-[90%]">
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
        text={loading ? <div className="loader"></div> : "Delete"}
      />
    </div>
  );
};

export default FacilityCard;
