import React from "react";
import { evaluateAspectRatio } from "../utils/common";
import { ASPECT_RATIOS } from "../utils/constants";

const CropAspectRatio = (setAspectRatio) => {
  return (
    <div className="flex flex-row">
      {ASPECT_RATIOS.map((ratio) => {
        return (
          <button
            key={ratio}
            className={`px-4 text-amber-100 text-base py-1 my-0.5 rounded-lg capitalize`}
            onClick={() =>
              setAspectRatio(ratio === "NaN" ? NaN : evaluateAspectRatio(ratio))
            }
          >
            {ratio === "NaN" ? "Free" : ratio}
          </button>
        );
      })}
    </div>
  );
};

export default CropAspectRatio;
