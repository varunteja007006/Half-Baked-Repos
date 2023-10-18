function sortAscending(array) {
  let arrayToSort = array;
  return arrayToSort.sort((a, b) => a - b);
  // or
  //   for (let i = 0; i < array.length; i++) {
  //     for (let j = i + 1; j < array.length; j++) {
  //       if (array[i] > array[j]) {
  //         // Swap the elements at indices i and j
  //         const temp = array[i];
  //         array[i] = array[j];
  //         array[j] = temp;
  //       }
  //     }
  //   }
  //   return array;
}

function sortDescending(array) {
  return array.sort((a, b) => b - a);
}

const array = [5, 3, 2, 1, 4];
const sortedArrayAscending = sortAscending(array);
const sortedArrayDescending = sortDescending([...array]);
// why destructing?
// sort() method sorts the array in place. This means that the original array is modified.
// Therefore, when you call the sortDescending() function after the sortAscending() function, the array is already sorted in ascending order. As a result, the sortDescending() function will not have any effect, and the array will remain sorted in ascending order.

console.log(sortedArrayAscending);
console.log(sortedArrayDescending);
