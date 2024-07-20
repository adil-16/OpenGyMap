import React from "react";

const UserDetails = () => (
  <div>
    <h3 className="font-semibold text-payment-gray text-lg pt-16 mb-2">
      User Details
    </h3>
    <div className="border-b border-navbar-gray mb-4"></div>
    <div>
      <div className="flex items-center mb-2">
        <span className="font-semibold text-payment-gray pr-28">Name</span>
        <p className="text-custom-black font-semibold">John Doe</p>
      </div>
      <div className="flex items-center pt-2">
        <span className="font-semibold text-payment-gray pr-6">
          Contact Number
        </span>
        <div className="relative">
          <input
            type="text"
            defaultValue="+92346-46528154"
            className="border-b border-custom-gray text-custom-black font-semibold focus:outline-none focus:border-custom-black pr-2"
          />
        </div>
      </div>
    </div>
  </div>
);

export default UserDetails;
