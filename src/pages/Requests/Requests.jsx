import React from "react";
import Requestcard from "./components/Requestcard";
import Requestrecieve from "./components/Requestrecieve";
import { useNotification } from "../../Context/NotificationContext/NotificationContext";

const Requests = () => {
  const { notifications } = useNotification();
  return (
    <div className=" p-4 mt-4 ">
      <div className="flex justify-center items-center font-poppins font-semibold text-4xl   ">
        <p>Requests</p>
      </div>

      <div className="lg:flex lg:flex-row sm:justify-center sm:flex-col  gap-2 py-3">
        <div className="flex-[2] p-4  shadow-2xl rounded-md">
          <div className="font-poppins  font-semibold text-2xl">
            <p>Job Session Requests</p>
          </div>

          <div className="py-6">
            <div className="font-poppins  font-semibold text-xl">
              <p>Pending (4)</p>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-8">
              <Requestcard check="true" />
              <Requestcard check="true" />
              <Requestcard check="true" />
              <Requestcard check="true" />
            </div>
          </div>

          {/* PAst Requests */}

          <div className="py-6">
            <div className="font-poppins  font-semibold text-xl">
              <p>Past Requests (102)</p>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-8">
              <Requestcard
                check={false}
                text="decline"
                bgColor="bg-request-button-decline"
                borderColor="border-request-button-decline"
                onClick={() => {
                  console.log("Button is clicked");
                }}
              />

              <Requestcard
                check={false}
                text="Accepted"
                bgColor="bg-request-button-accepted"
                borderColor="border-request-button-accepted"
                onClick={() => {
                  console.log("Button is clicked");
                }}
              />

              <Requestcard
                check={false}
                text="No response"
                bgColor="bg-request-button-notresponse"
                borderColor="border-request-button-notresponse"
                onClick={() => {
                  console.log("Button is clicked");
                }}
              />
            </div>
          </div>
        </div>

        {/* Second div  */}
        <div className="flex-1 pr-3 py-6 px-2 rounded-lg bg-white drop-shadow-2xlshadow-lg">
          <div className="font-poppins  font-semibold text-xl">
            Requests Received{"  "}
            {notifications.length > 0 ? `( ${notifications.length} )` : ""}
          </div>

          <div className="space-y-6">
            <Requestrecieve />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
