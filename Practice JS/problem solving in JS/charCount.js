// Given a string, write a function to count the occurrences of each character in the string.

function charCount(str) {
  let charcountObj = {}; // store char and their count as object {key:value}
  for (let char of str) {
    // iterate through each char in string
    if (charcountObj[char]) {
      // if char already in the object then increment by 1 the value
      charcountObj[char] += 1;
    } else {
      // else add the char with value 1.
      charcountObj[char] = 1;
    }
  }
  return charcountObj;
}

str = "banana";
console.log(charCount(str));
