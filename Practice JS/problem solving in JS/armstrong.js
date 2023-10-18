// Example of Armstrong 153 , no of digits is 3, therefore sum of 1^3 + 5^3 + 3^3 should be equal ot 153

const number = "1634"; //input as string
const numberOfDigits = number.length;
let sum = 0;

// create a temporary variable
let temp = parseInt(number);

while (temp > 0) {
  let remainder = temp % 10;

  sum += remainder ** numberOfDigits;

  // removing last digit from the number
  temp = parseInt(temp / 10); // convert float into integer
}

if (sum == number) {
  console.log(`${number} is an Armstrong number`);
} else {
  console.log(`${number} is not an Armstrong number.`);
}
