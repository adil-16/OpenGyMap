import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../CalenderCSS/Calender.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Calender = ({ setSelectedDate }) => {
  const [date, setDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateChange = (e) => {
    setDate(e.value);
    const formattedDate = e.value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setSelectedDate(formattedDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="py-8">
      <div className="flex space-x-2 px-4 justify-between">
        <div className="flex space-x-2 items-center">
          <p className="font-inter font-semibold text-xl text-custom-blue w-24">
            {currentMonth}
          </p>

          <div className="flex space-x-1">
            <IoChevronBack
              className="h-6 w-6 cursor-pointer"
              onClick={() => handleMonthChange(-1)}
            />
            <IoChevronForward
              className="h-6 w-6 cursor-pointer"
              onClick={() => handleMonthChange(1)}
            />
          </div>
        </div>

        <div className="font-inter font-semibold text-xl text-custom-blue pr-4">
          {currentYear}
        </div>
      </div>

      <div className="flex justify-center">
        <Calendar
          value={date}
          onChange={handleDateChange}
          inline
          className="custom-calendar"
          dateFormat="dd/mm/yy"
        />
      </div>
    </div>
  );
};

export default Calender;
