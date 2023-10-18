// Implement a function to reverse a string without using the built-in reverse() method. 
function reverseString(str) {
  let reversedString = "";
  for (let i = str.length - 1; i >= 0; i--) { //iterate backwards
    reversedString += str[i];
  }
  return reversedString;
}

const str = "hello world";
const reversedString = reverseString(str);

console.log(reversedString);
