let sum = function (a) {
  return function (b) {
    if (b !== undefined) {
      return sum(a + b);
    }
    return a;
  };
};

const shortSum = (a) => (b) => typeof b === "undefined" ? a : sum(a + b);

console.log("function", sum(1)(2)(3)(0)(4)());
console.log("Arrow function", shortSum(1)(2)(3)(0)(4)());
