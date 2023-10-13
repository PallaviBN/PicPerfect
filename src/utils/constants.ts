import { Filter } from "./type";

export const FILTER_OPTIONS: Array<Filter> = [
  {
    name: "brightness",
    property: "brightness",
    unit: "%",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    name: "saturation",
    property: "saturate",
    unit: "%",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    name: "contrast",
    property: "contrast",
    unit: "%",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    name: "hue-rotate",
    property: "hue-rotate",
    unit: "deg",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
  },
  {
    name: "grayscale",
    property: "grayscale",
    unit: "%",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
  },
  {
    name: "sepia",
    property: "sepia",
    unit: "%",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
  },
  {
    name: "blur",
    property: "blur",
    unit: "px",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
  },
];

export const ASPECT_RATIOS = ["NaN","1/1","9/16","16/9","3/4","4/3","2/3","3/2", "1/2", "2/1"];
