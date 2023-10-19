// Debouncing in JS
let counter = 0;
const getData = () => {
  // call an API and fetches data
  console.log("fetching the data...", counter++);
};

// We need to optimize the above code so that it will not make a API call for every letter typed.
const debounceFunc = function (func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    // It is required to stop and again call this method. To do so we clear the timeout.
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

// Capture the debounce func into optimizedFunc, use optimizedFunc on HTML
const optimizedFunc = debounceFunc(getData, 1000);
