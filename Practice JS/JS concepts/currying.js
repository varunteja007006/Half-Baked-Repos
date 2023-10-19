// What is function currying?
// Currying in JavaScript transforms a function with multiple arguments into a nested series of functions, each taking a single argument. Currying helps you avoid passing the same variable multiple times, and it helps you create a higher order function

// Method One bind()
const multiply = function (param1, param2, param3) {
  console.log("Method One Bind: ", param1 * param2 * param3);
};

const multiplyByThree = multiply.bind(this, 3);
multiplyByThree(4, 5);

const multiplyByTwoAndFour = multiply.bind(this, 2, 4);
multiplyByTwoAndFour(5);

console.log("\n");

// Method Two closures()
const multiplyByClosure = function (param1) {
  return function multiplyInnerFunc(param2) {
    console.log("Method Two Closures: ", param1 * param2);
  };
};

const multiplyByFour = multiplyByClosure(4);
multiplyByFour(5);
