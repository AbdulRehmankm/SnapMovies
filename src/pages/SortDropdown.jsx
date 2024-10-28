import React, { useState } from "react";

const SortDropdown = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState("Default sorting");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <div className="  relative inline-block w-full max-w-xs">
      <select
        className=" cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedOption}
        onChange={handleChange}
      >
        <option>Default sorting</option>
        <option>Sort by popularity</option>
        <option>Sort by average rating</option>
        <option>Sort by latest</option>
        <option>Sort by price: low to high</option>
        <option>Sort by price: high to low</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M7 10l5 5 5-5H7z"/>
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
