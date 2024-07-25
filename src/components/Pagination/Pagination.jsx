import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Pagination = ({ items, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 pb-3">
      <IoIosArrowDropleftCircle
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 cursor-pointer"
      />
      <span className="px-4 py-2 text-black rounded">
        Page {currentPage} of {totalPages}
      </span>
      <IoIosArrowDroprightCircle
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 cursor-pointer"
      />
    </div>
  );
};

export default Pagination;
