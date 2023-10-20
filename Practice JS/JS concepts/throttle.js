// Throttling is a technique in JavaScript that limits the number of times a function can be called within a specific period of time. This can be useful in situations where you want to prevent a function from being called too frequently.
const expensiveAPICall = function () {
  console.log("Making an expensive API call .....");
};

const throttleFunction = function (expensiveFunc, limit) {
  let throttle = true;
  return function () {
    if (throttle) {
      throttle = setInterval(() => {
        expensiveFunc();
        throttle = true;
      }, limit);
    }
  };
};

const handleExpensiveAPICall = throttleFunction(expensiveAPICall, 10000);

