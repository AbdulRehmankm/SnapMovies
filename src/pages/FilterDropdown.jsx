import React from 'react';

const FilterDropdown = ({ onFilterChange }) => {
    return (
        <div className=" relative inline-block w-full max-w-xs">
            <select
                className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="all">All items</option>
                <option value="shirt">Shirt</option>
                <option value="t-shirt">T-shirt</option>
                <option value="polo-shirt">Polo-shirt</option>
                <option value="pants">Pants</option>
                <option value="trousers">Trousers</option>
                <option value="jeans">Jeans</option>
                <option value="jackets">Jackets</option>
                <option value="hoodies">Hoodies</option>
                <option value="sweatshirts">Sweatshirts</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M7 10l5 5 5-5H7z"/>
        </svg>
      </div>
        </div>
    );
};

export default FilterDropdown;
