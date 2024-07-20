// import React, { useState, useEffect } from "react";

// const LabelInput = ({
//   label,
//   initialValue,
//   buttonText,
//   isAnyEditing,
//   setEditing,
//   saveButtonText = "Save",
//   isUpdatingPassword = false,
//   readOnly = false,

//   type = "text",
// }) => {
//   const [value, setValue] = useState(initialValue);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleBlur = () => {
//     if (!isUpdatingPassword) {
//       setIsEditing(false);
//     }
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//     setEditing(false);
//     setValue(initialValue);
//   };

//   useEffect(() => {
//     if (!isEditing) {
//       setEditing(false);
//       setIsEditing(false);
//     }
//   }, [setEditing, isEditing]);

//   const handleEditClick = () => {
//     if (buttonText === "Update") {
//       setIsEditing(false);
//     }
//     setEditing(true);
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     if (buttonText !== "Update") {
//       setIsEditing(false);
//       setEditing(false);
//     } else {
//       console.log("Update button clicked");
//       setIsEditing(false);
//       setEditing(false);
//     }
//   };

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   return (
//     <div className="flex flex-col justify-center space-y-1 pr-5 ">
//       <label className="font-medium">{label}</label>
//       <div className="relative">
//         <input
//           type={type}
//           value={value}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="w-full border py-3   border-gray-300 p-2 pr-10 rounded-full"
//           readOnly={
//             label === "Name" || label === "Email"
//               ? !isEditing || readOnly
//               : isEditing || readOnly
//           }
//         />

//         {isEditing && buttonText !== "Update" && label !== "Old Password" ? (
//           <button
//             onClick={handleCancelClick}
//             className="absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2"
//           >
//             Cancel
//           </button>
//         ) : (
//           <button
//             disabled={isAnyEditing && !isEditing}
//             onClick={handleEditClick}
//             className="absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2"
//           >
//             {buttonText}
//           </button>
//         )}
//       </div>

//       {isEditing && buttonText !== "Update" && saveButtonText && (
//         <div className=" mt-6 py-3">
//           <button
//             onClick={handleSaveClick}
//             className=" bg-custom-gradient text-sm  w-24 text-white py-2 text-center px-4 rounded-lg"
//           >
//             {saveButtonText}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabelInput;

import React, { useState, useEffect } from "react";

const LabelInput = ({
  label,
  initialValue,
  buttonText,
  editingId,
  setEditingId,
  saveButtonText = "Save",
  isUpdatingPassword = false,
  readOnly = false,
  type = "text",
  inputId,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (!editingId) {
      setIsEditing(true);
      setEditingId(inputId);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setValue(initialValue);
  };

  const handleBlur = () => {
    if (!isUpdatingPassword) {
      setIsEditing(false);
      setEditingId(null);
    }
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
          onBlur={handleBlur}
          readOnly={
            label === "Name" || label === "Email"
              ? !isEditing || readOnly
              : isEditing || readOnly
          }
          className="w-full border py-3 border-gray-300 p-2 pr-10 rounded-full"
        />
        {isEditing && buttonText !== "Update" && label !== "Old Password" ? (
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
            className="absolute inset-y-0 underline text-nav-gray font-semibold text-base right-2 flex items-center px-2"
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
