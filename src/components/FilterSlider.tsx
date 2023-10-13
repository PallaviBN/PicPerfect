import React from "react";
import { mapValue } from "../utils/common";
import { Filter } from "../utils/type";

export interface FilterSliderProps  {
  selectedOption: Filter;
  selectedFilterIndex: number;
  setFilterOptions: (arg0: any) => void;
}

const FilterSlider = ({
  selectedOption,
  selectedFilterIndex,
  setFilterOptions,
}: FilterSliderProps) => {
  return (
    <>
      <label
        className="align-middle text-center w-full bg-gray-800 mb-0.5"
        htmlFor="slider"
      >
        {selectedOption.property === "brightness" ||
        selectedOption.property === "saturation" ||
        selectedOption.property === "contrast"
          ? mapValue(selectedOption.value)
          : selectedOption.value}
        {selectedOption.unit === "deg" ? "°" : ""}
      </label>
      <input
        className="accent-yellow-400 w-[94%] mx-4"
        id="slider"
        type="range"
        value={selectedOption.value}
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        onChange={(event: any) => {
          setFilterOptions((prevFilterOpts: any) => {
            return prevFilterOpts?.map((opt: Filter , i: number) =>
              i === selectedFilterIndex
                ? { ...opt, value: event.target.value }
                : opt
            );
          });
        }}
      />
    </>
  );
};

export default FilterSlider;
