/* 
  Apply is very similar to the call function. The only difference is that in apply you can pass an 
  array as an argument list. 
  
  Bind is a function that helps you create another function that you can execute later with the new
  context of this that is provided
*/

let name = {
  firstname: "Tommy",
  lastname: "Ben",
};

let fullname = function (city, pincode) {
  console.log(
    this.firstname + " " + this.lastname + " from " + city + ", " + pincode
  );
};

// call method --> function borrowing
fullname.call(name, "Chennai", "12345"); // Pass the object and other arguments

// apply method --> similar to .call() method
fullname.apply(name, ["Mumbai", "24523"]); // Pass the object and other arguments in an array

// bind method -->
let fullnameMethod = fullname.bind(name, "Delhi", "09890");
fullnameMethod();
