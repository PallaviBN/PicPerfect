export interface Filter {
  name: string;
  property: string;
  unit: string;
  value: number;
  range: FilterRange;
}

export interface FilterRange {
  min: number;
  max: number;
}
