import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../../firebase/Functions/ApiFunctions";

const UserDetails = ({ facility }) => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(facility.createdBy);
        setUserDetails({
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [facility.createdBy]);

  return (
    <div>
      <h3 className="font-semibold text-payment-gray text-lg pt-16 mb-2">
        User Details
      </h3>
      <div className="border-b border-navbar-gray mb-4"></div>
      <div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-payment-gray pr-28">Name</span>
          <p className="text-custom-black font-semibold">
            {userDetails.fullName || "No Name to show"}
          </p>
        </div>
        <div className="flex items-center pt-2">
          <span className="font-semibold text-payment-gray pr-6">
            Contact Number
          </span>
          <div className="relative">
            <input
              type="text"
              value={userDetails?.phoneNumber || "No Contact to display"}
              readOnly
              className="border-b border-custom-gray text-custom-black font-semibold focus:outline-none focus:border-custom-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
