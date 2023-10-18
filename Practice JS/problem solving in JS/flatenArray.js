//  Implement a function that flattens a nested array in JavaScript, converting it into a single-level array.

function flatten(array) {
  const result = [];
  for (const element of array) {
    // iterate over each element in an array it can be a nested array
    if (Array.isArray(element)) {
      // if it is indeed a nested array then
      result.push(...flatten(element)); // pass it through the flatten function (recursion) & spread the elements of the flattened array into the result array.
    } else {
      result.push(element); // if it is not a nested array then just add it to result array.
    }
  }
  return result; // finally return the flattened array
}
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattenedArray = flatten(nestedArray);

console.log(flattenedArray); // [1, 2, 3, 4, 5, 6]
