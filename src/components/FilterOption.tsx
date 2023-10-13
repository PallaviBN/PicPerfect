import React from "react";

const FilterOption = ({ name, active, handleClick }) => {
  return (
    <button
      className={`px-3 text-amber-100 text-base py-0 my-0.5 rounded-lg capitalize ${
        active ? "bg-yellow-400 text-black font-bold " : ""
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default FilterOption;
