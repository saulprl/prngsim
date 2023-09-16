export const calculateGCD = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }

  return calculateGCD(b, a % b);
};
