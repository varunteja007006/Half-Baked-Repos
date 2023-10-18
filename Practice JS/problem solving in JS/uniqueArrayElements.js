// Write a function that takes an array of integers as input and returns a new array with only the unique elements.
function getUniqueElements(arr) {
  return Array.from(new Set(arr));
  // or
  //   const uniqueElements = new Set();
  //   for (const element of arr) {
  //     uniqueElements.add(element);
  //   }
  //   return Array.from(uniqueElements);
}

const arr = [];

const array = [1, 2, 3, 1, 4, 5, 3, 6];
const UniqueElements = getUniqueElements(array);

console.log(UniqueElements); // [1, 2, 3, 4, 5, 6]
