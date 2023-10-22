let name = {
  firstname: "Tommy",
  lastname: "Blue",
};

// actual bind method
let printName = function () {
  console.log("bind :" + this.firstname + " " + this.lastname);
};

let printName_One = printName.bind(name);
printName_One(); // invoke the new printName

// create own bind function - 'myBind'
let logName = function (homeTown, pincode) {
  console.log(
    "myBind :" +
      this.firstname +
      " " +
      this.lastname +
      " " +
      homeTown +
      " " +
      pincode
  );
};

//adding myBind to all functions by extending the Functions with prototype
Function.prototype.myBind = function (...params) {
  // params is a list of arguments. It is a 'rest parameter' used to accept unknown no of arguments
  let obj = this; // refers to the logName in this context
  let restOfTheParams = [...params];
  restOfTheParams.shift();

  return function (...params2) {
    /* 
      .apply() is function borrowing method that takes array of arguments (similar to .call())
      */
    obj.apply(params[0], [...restOfTheParams, ...params2]);
  };
};

let logName_One = logName.myBind(name, "Chennai");
logName_One("675757"); // pass pincode as argument & invoke the new logName
