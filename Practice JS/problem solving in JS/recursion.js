//Problem one
//closure
let sum = function (a) {
  return function (b) {
    if (b !== undefined) {
      return sum(a + b);
    }
    return a;
  };
};

const shortSum = (a) => (b) => typeof b === "undefined" ? a : sum(a + b);

console.log("function", sum(1)(2)(3)(0)(4)());
console.log("Arrow function", shortSum(1)(2)(3)(0)(4)());

//Problem two
let user = {
  name: "Tommy",
  address: {
    personal: {
      city: "chennai",
      state: "TN",
    },
    office: {
      city: "Bangalore",
      state: "Karnataka",
    },
  },
  id: 569,
  hobbies: ["sing", "dance"],
};

let new_user = {};
function findObj(data, parent_name) {
  for (let item in data) {
    if (typeof data[item] === "object") {
      if (Array.isArray(data[item])) {
        new_user[parent_name + "_" + item] = data[item];
      } else {
        findObj(data[item], parent_name + "_" + item);
      }
    } else {
      new_user[parent_name + "_" + item] = data[item];
    }
  }
}

findObj(user, "user");
console.log(new_user);

/* 
This problem gives idea like how to handle breadcrumbs;
fetch only deep level objects;
null, undefined values for properties;
prototypal inheritance scenarios;
 */
