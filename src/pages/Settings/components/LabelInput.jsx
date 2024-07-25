import React, { useState, useEffect, useCallback } from "react";

const LabelInput = ({
  label,
  initialValue,
  buttonText,
  editingId,
  setEditingId,
  saveButtonText = "Save",
  readOnly = false,
  type = "text",
  inputId,
  value,
  handleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (label === "Email") {
      setIsEditing(false);
      setEditingId(null);
    } else if (
      !editingId &&
      label !== "New Password" &&
      label !== "Confirm Password"
    ) {
      setIsEditing(true);
      setEditingId(inputId);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setValue(initialValue);
  };

  const isDimmed = editingId && editingId !== inputId;

  return (
    <div
      className={`flex flex-col justify-center space-y-1 pr-5 ${
        isDimmed ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <label className="font-medium">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          readOnly={
            label === "Name" || label === "Email"
              ? !isEditing || readOnly
              : isEditing || readOnly
          }
          className="w-full border py-3 border-gray-300 p-2 pr-10 rounded-full"
        />
        {isEditing &&
        buttonText !== "Update" &&
        label !== "Old Password" &&
        label !== "Email" ? (
          <button
            onClick={handleCancelClick}
            className="absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2"
          >
            Cancel
          </button>
        ) : (
          <button
            disabled={editingId && editingId !== inputId}
            onClick={handleEditClick}
            className={`absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2   ${
              label === "Email" ? "hidden" : ""
            }`}
          >
            {buttonText}
          </button>
        )}
      </div>
      {isEditing && buttonText !== "Update" && saveButtonText && (
        <div className="mt-6 py-3">
          <button
            onClick={handleSaveClick}
            className="bg-custom-gradient text-sm w-24 text-white py-2 text-center px-4 rounded-lg"
          >
            {saveButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default LabelInput;
