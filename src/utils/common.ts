export const mapValue = (
  value: number
  //   inMin: number,
  //   inMax: number,
  //   outMin: number,
  //   outMax: number
): number => {
  return ((value - 0) * (100 - -100)) / (200 - 0) + -100;
};

export const evaluateAspectRatio = (ratioString: string): number => {
  const parts = ratioString.split("/");
  if (parts.length === 2) {
    const numerator = parseFloat(parts[0]);
    const denominator = parseFloat(parts[1]);

    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      const ratio = numerator / denominator;
      return ratio;
    } else {
      console.error("Invalid ratio.");
    }
  } else {
    console.error("Invalid ratio format.");
  }
  return NaN;
};
