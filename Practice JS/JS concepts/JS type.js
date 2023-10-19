// JS has 5 different data types that can contain value
// String
// Number
// Boolean
// Object
// function

// 6 type of objects
// Object
// Date
// Array
// String
// Number
// Boolean

// 2 types of that cannot contain a value
// null
// undefined

// typeof operator can be used to find the data type of a JavaScript variable.

// Difference between null and undefined ? both are same value but different types.
// null is "nothing"
// a variable without a value, has the value undefined

console.log("This is the type for undefined: ",typeof undefined); // undefined
console.log("This is the type for null: ",typeof null);                // object

console.log("Is null === undefined : ",null === undefined);         // false
console.log("Is null == undefined : ",null == undefined);          // true

console.log("This is the type of string : ",typeof "John")                 // Returns "string"
console.log("This is the type of float : ",typeof 3.14 );                  // Returns "number"
console.log("This is the type of NaN : ",typeof NaN    );                // Returns "number"
console.log("This is the type of boolean : ",typeof false   );               // Returns "boolean"
console.log("This is the type of Array of numbers : ",typeof [1,2,3,4] );             // Returns "object"
console.log("This is the type of Object with properties : ",typeof {name:'John', age:34} ); // Returns "object"
console.log("This is the type of Date : ",typeof new Date()       );      // Returns "object"
console.log("This is the type of function : ",typeof function () {}   );      // Returns "function"
console.log("This is the type of var with no type declaration & value : ",typeof myCar            );      // Returns "undefined" *
console.log("This is the type of null : ",typeof null );      // Returns "object"
