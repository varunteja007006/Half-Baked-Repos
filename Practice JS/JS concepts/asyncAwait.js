// DO NOT RUN THE WHOLE PAGE
// What is Async?
//
// Async is a keyword in JavaScript that lets you write asynchronous code in a more synchronous, readable way. The keyword 'async' before a function makes the function return a promise, always. And the keyword await is used inside async functions, which makes the program wait until the Promise resolves.
//
//
//
//
//
const API_URL = "https://api.github.com/users/varunteja007006";

// generate a random number
beep = parseInt(Math.random() * 10);
console.log(beep);

// promise -> resolve or rejects
const p = new Promise((resolve, reject) => {
  resolve("This is a promise");
});
//
//
//
//
//
// 1. Simple Async & Await
// Async always returns a promise (async without await)
console.log("1. Simple Async & Await");
async function getData() {
  if (beep >= 5) {
    // returns a promise
    return p;
  }
  return "hello mom"; //returns this string after wrapping it in promise
}

const data = getData(); // promise resolved, you get a promise object
console.log(data); // promise object is logged

data.then((res) => console.log(res)); // unpack the promise for data
//
//
//
//
//
// 2. With and without Async await
console.log("2. With and without Async await");
// without async & await
function noAsyncGetData() {
  p.then((res) => console.log(res)); // get the promise object & then unpack it
}
noAsyncGetData();

// with async & await
async function awaitGetData() {
  const val = await p; // await can only be used only inside a async function. It waits for the promise to be resolved.
  //  console.log(val); // This is a promise
  return val;
}
const dataOne = awaitGetData(); // promise object
dataOne.then((res) => console.log(res)); // promise resolved unpack it
//
//
//
//
//
// 3. Await - code execution halting 
// promise -> resolve or rejects
const pr = new Promise((resolve, reject) => {
  // resolve the promise after 10 secs.
  setTimeout(() => {
    resolve("Promise is resolved.");
  }, 10000);
});

async function getDataAsync() {
  //code execution is halted. Resumes only after the promise is resolved.
  console.log("hello world");
  const val = await pr;
  console.log("Hello mom");
  console.log(val);
}
getDataAsync();
//
//
//
//
//
// 4. Multiple Await in a single Async function.
// promise -> resolve or rejects
const prom = new Promise((resolve, reject) => {
  // resolve the promise after 10 secs.
  setTimeout(() => {
    resolve("Promise is resolved.");
  }, 10000);
});

async function getDataAsync() {
  //JS engine waits for the promise to be resolved.
  console.log("hello world");
  const val1 = await prom;
  console.log("Hello mom");
  console.log(val1);

  // what happens if we have another await???
  const val2 = await prom;
  console.log("Hello mom");
  console.log(val2);
  // both will be resolved in parallel
}
getDataAsync();
//
//
//
//
//
// 5. Practical example for async & await
async function getDataFetch() {
  const response = await fetch(API_URL); // fetch returns promise that resolves to a response object, the response object does not directly contain the JSON response body. It is HTTP response representation. Use .json() method which also is a promise that resolves to extract JSON body text.
  const data = await response.json();
  console.log(data);
}
getDataFetch();
//
//
//
//
// 
// 6. Two different Promises to be resolved in the same Async function.
// promise -> resolve & reject
const p1 = new Promise((resolve, reject) => {
  // resolve the promise after 10 secs.
  //   setTimeout(() => {
  //     resolve("Promise is resolved @10.");
  //   }, 10000);
  //lets try to set it for 5seconds
  setTimeout(() => {
    resolve("Promise is resolved @10.");
  }, 5000);
});

const p2 = new Promise((resolve, reject) => {
  // resolve the promise after 5 secs.
  //   setTimeout(() => {
  //     resolve("Promise is resolved @5.");
  //   }, 5000);
  //lets try to set it for 10seconds
  setTimeout(() => {
    resolve("Promise is resolved @5.");
  }, 10000);
});
// what will happen if first promise is resolved at 10sec & second promise at 5sec?
// It will wait for the first promise to be resolved and then rest of the things will be console logged.
// lets change the first promise to resolve at 5seconds and second promise to resolve at 10seconds.
async function getDataAsync() {
  console.log("hello world");
  const v1 = await p1;
  console.log(v1);
  console.log("hello mom");
  const v2 = await p2;
  console.log(v2);
}
// First promise will be logged and then it will wait for 5 more seconds to log the second promise
getDataAsync();
//
//
//
//
//
// 7. Error handling - Use try & catch block for the error handling
async function getDataFetch() {
  try {
    const response = await fetch(API_URL); // fetch returns promise that resolves to a response object, the response object does not directly contain the JSON response body. It is HTTP response representation. Use .json() method which also is a promise that resolves to extract JSON body text.
    const data = await response.json();
    // console.log(data); // github user data
    return data;
  } catch (error) {
    console.log(err); // promise failed gives out an error
  }
}

const dataGit = getDataFetch();
dataGit.then((res) => console.log(res));
//
//
//
//
//
// 8. Promise chaining vs Async Await
// Async Await is a syntactical sugar over promise chaining. Therefore better to use Async Await.