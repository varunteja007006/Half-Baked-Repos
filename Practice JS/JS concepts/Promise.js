// promise Demonstration
// We are waiting for the createOrder func to send back a promise.
const promise = createOrder(cart);

// Once the promise is full-filled we execute the later functions.
promise.then(function (orderID) {
  proceedToPayment(orderID);
});

//--------------------------------------------------------------------
// Promise Chaining
createOrder(cart)
  .then((orderID) => {
    return proceedToPayment(orderID);
  })
  .then((orderSummary) => {
    return showWalletBalance(orderSummary);
  });

//Remember to return the data while chaining

//--------------------------------------------------------------------
// Create own promise method
function createPromise() {
  const promise = new Promise((resolve, reject) => {
    // Make Async call that will eventually resolve or reject
    //Eg, HTTP request

    //Async operation is complete, resolve the promise
    resolve(result);

    // If async operation failed, reject the promise with error
    reject(error);
  });

  //return the promise
  return promise;
}

//--------------------------------------------------------------------
