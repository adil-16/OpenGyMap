import React from "react";
import Crossicon from "../../buttons/Crossicon";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full sm:w-1/3 lg:w-1/3 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-custom-black">
            Confirm Delete
          </h2>
          <Crossicon onClick={onClose} />
        </div>
        <div className="border-b border-navbar-gray mb-4"></div>
        <div className="flex flex-col items-center">
          <img
            src="/Settings/delete.png"
            alt="Exclamation mark"
            className="w-32 h-32 mb-4"
          />
          <p className="text-center text-custom-black font-bold text-xl mb-4">
            Confirm Delete
          </p>
          <p className="text-center text-payment-gray mb-4">
            Are you sure you want to delete the facility "Facility Name"?
          </p>
          <p className="text-center text-payment-gray mb-10">
            This will be permanently deleted from your profile.
          </p>
          <div className="flex justify-around w-full">
            <button
              className="bg-white border rounded-full px-20 py-3 font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-custom-red-gradient text-white rounded-full px-20 py-3 font-medium"
              onClick={() => {
                onClose();
              }}
            >
              Yes, Delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;

// import React from "react";
// import Crossicon from "../../buttons/Crossicon";

// const DeleteAccountModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg p-6 w-full sm:w-1/3 lg:w-1/3 relative">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-custom-black">
//             Confirm Delete
//           </h2>
//           <Crossicon onClick={onClose} />
//         </div>
//         <div className="border-b border-navbar-gray mb-4"></div>
//         <div className="flex flex-col items-center">
//           <img
//             src="/Settings/delete.png"
//             alt="Exclamation mark"
//             className="w-32 h-32 mb-4"
//           />
//           <p className="text-center text-custom-black font-bold text-xl mb-4">
//             Confirm Delete
//           </p>
//           <p className="text-center text-payment-gray mb-4">
//             Are you sure you want to delete the facility "Facility Name"?
//           </p>
//           <p className="text-center text-payment-gray mb-10">
//             This will be permanently deleted from your profile.
//           </p>
//           <div className="flex justify-around w-full">
//             <button
//               className="bg-white border rounded-full px-20 py-3 font-medium"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-custom-red-gradient text-white rounded-full px-20 py-3 font-medium"
//               onClick={() => {
//                 onClose();
//               }}
//             >
//               Yes, Delete it
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteAccountModal;
