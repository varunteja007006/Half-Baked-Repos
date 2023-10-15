let radius = [2, 4, 5, 7];

let area = function (radius) {
  return Math.PI * radius * radius;
};

let circumference = function (radius) {
  return 2 * Math.PI * radius;
};

let diameter = function (radius) {
  return 2 * radius;
};

let calculate = function (array, logic) {
  let output = [];
  for (const element of array) {
    output.push(logic(element));
  }

  // can also be written as
  //   for (let index = 0; index < array.length; index++) {
  //     output.push(logic(array[index]));
  //   }

  return output;
};

// Using map function
// console.log(radius.map(area));
// console.log(radius.map(diameter));
// console.log(radius.map(circumference));

// using calculate function
// console.log(calculate(radius,area));
// console.log(calculate(radius,circumference));
// console.log(calculate(radius,diameter));

//creating own map function
Array.prototype.calculate = function (logic) {
  let output = [];
  for (let index = 0; index < this.length; index++) {
    output.push(logic(this[index]));
  }

  return output;
};

console.log(radius.calculate(area));
console.log(radius.calculate(circumference));
console.log(radius.calculate(diameter));
