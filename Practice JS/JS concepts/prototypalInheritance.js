let obj = {
  name: "tommy",
  age: 10,
  city: "chennai",
  getIntro: function () {
    console.log(this.name + " from " + this.city);
  },
};

let obj2 = {
  name: "jerry",
};

// Never do this, it is performance bottleneck
obj2.__proto__ = obj; // this allows the inheriting the obj

console.log("\nLogging........ \n");
console.log(obj2.name);
console.log(obj2.city);

obj.getIntro(); // 'this' points to obj there name is tommy
obj2.getIntro(); // here 'this' points to obj2 therefore the name is jerry

// similarly prototype for functions

Function.prototype.myExample = function () {
  // attaching myExample to all functions by specifying 'Function'
  console.log("I am a example function attached to all functions");
};

function demo() {
  console.log("demo function");
}

demo.myExample(); // myExample property is attached to all functions.
