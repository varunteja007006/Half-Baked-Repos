// HTML code
// <input type="text" name="search" id="search" onkeyup="optimizedFunc()"> 


// Debouncing in JS
// call an API and fetches data
const getData = () => {
  console.log("fetching the data...");
};

// We need to optimize the above code so that it will not make a API call for every letter typed.
const debounceFunc = function (func, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    // It is required to stop and again call this method. To do so we clear the timeout.
    timer = setTimeout(func(), delay);
  };
};

// Capture the debounce func into optimizedFunc, use optimizedFunc on HTML
const optimizedFunc = debounceFunc(getData, 1000);
/*
  Debouncing is a programming technique that limits the number of times a function is called within
  a specific time period.This can be useful for preventing a function from being called too
  frequently, which can improve performance and avoid unnecessary CPU cycles.
  
  For example, imagine you have a function that is called every time the user types a key in a search
  box.
  If this function is called too frequently, it can make the browser feel sluggish and unresponsive. 
  Debouncing can help to improve the performance of your application by preventing the function from 
  being called too often.
*/
