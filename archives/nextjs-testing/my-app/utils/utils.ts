export const add = (a: number, b: number): number => {
  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    Number.isNaN(a) ||
    Number.isNaN(b) ||
    a === null ||
    b === null
  ) {
    throw new Error("Both arguments must be numbers");
  }
  return a + b;
};
