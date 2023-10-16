function intOrFloat(num) {
  if (Number.isInteger(num)) {
    return ` ${num} is integer`;
  } else {
    return `${num} is float`;
  }
}

const result_one = intOrFloat(10);
console.log(result_one);
const result_two = intOrFloat(12.1);
console.log(result_two);

//Regex method
// program to check if a number is a float or integer value

function checkNumber(x) {

    let regexPattern = /^-?[0-9]+$/;
    
    // check if the passed number is integer or float
    let result = regexPattern.test(x);
    
    if(result) {
        console.log(`${x} is an integer.`);
    }
    else {
        console.log(`${x} is a float value.`)
    }

}

checkNumber(44);
checkNumber(-44);
checkNumber(3.4);
checkNumber(-3.4);