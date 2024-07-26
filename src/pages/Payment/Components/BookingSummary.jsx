import React from "react";

const BookingSummary = ({ court, time, hours, date }) => {
  const calculateEndTime = (startTime, hours) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);
    const endDate = new Date(startDate.getTime() + hours * 60 * 60 * 1000);

    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");
    return `${endHours}:${endMinutes}`;
  };

  const endTime = calculateEndTime(time, hours);

  return (
    <div>
      <h2 className="text-xl text-custom-black font-semibold mb-4">
        Your Booking
      </h2>
      <div className="mb-6">
        <p className="flex justify-between text-custom-black font-semibold mb-2">
          <span className="font-semibold text-payment-gray mb-2">
            Court Type
          </span>{" "}
          {court}
        </p>
        <p className="flex justify-between text-custom-black font-semibold mb-2">
          <span className="font-semibold text-payment-gray mb-2">Time</span>{" "}
          {time} - {endTime} {`(${hours} hours) `}
        </p>
        <p className="flex justify-between text-custom-black font-semibold">
          <span className="font-semibold text-payment-gray mb-2">Date</span>{" "}
          {date}
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
