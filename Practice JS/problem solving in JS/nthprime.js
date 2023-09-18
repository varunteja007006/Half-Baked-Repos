//nth prime number
function getNthPrimeNumber(n) {
  let result = 404;

  //my code
  //count equal to n
  let count = 0;
  //start finding prime no from 2 as j
  let j = 2;

  //loop until count is met
  while (count < n) {
    let i = 2;
    let flag = false;
    //divide j with no's from 1 to infinity until count is met
    if (j === 2) {
      flag = false;
    } else {
      while (i < j) {
        if (j % i == 0) {
          flag = true;
          break;
        }
        i = i + 1;
      }
    }
    console.log("count", count);
    console.log("j", j);
    if (flag === true) {
      j = j + 1;
    } else {
      count = count + 1;
      j = j + 1;
    }
  }
  result = j - 1;
  return result;
}
console.log(getNthPrimeNumber(5));
