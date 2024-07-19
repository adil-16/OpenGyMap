import React, { useState } from "react";

const LabelInput = ({
  label,
  initialValue,
  buttonText,
  isAnyEditing,
  setEditing,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (buttonText === "Update") {
      setIsEditing(false);
    }
    setIsEditing(true);
    setEditing(true);
  };

  const handleCancelClick = () => {
    setValue(initialValue);
    setIsEditing(false);
    setEditing(false);
  };

  const handleSaveClick = () => {
    if (buttonText !== "Update") {
      setIsEditing(false);
      setEditing(false);
    } else {
      console.log("Update button clicked");
      setIsEditing(false);
      setEditing(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center space-y-1 pr-5 ">
      <label className="font-medium">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border py-3  border-gray-300 p-2 pr-10 rounded-full"
          readOnly={!isEditing || (isAnyEditing && !isEditing)}
        />

        {isEditing ? (
          <button
            onClick={handleCancelClick}
            className="absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2"
          >
            Cancel
          </button>
        ) : (
          <button
            disabled={isAnyEditing}
            onClick={handleEditClick}
            className="absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2"
          >
            {buttonText}
          </button>
        )}
      </div>

      {isEditing && buttonText !== "Update" && (
        <div className=" mt-6 py-3">
          <button
            onClick={handleSaveClick}
            className=" bg-custom-gradient  w-24 text-white py-2 text-center px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default LabelInput;
