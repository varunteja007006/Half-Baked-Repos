// remove white spaces
const string = "      Hello World       ";

const result = string.split(" ").join("");

console.log(result);

//using regular expression
function trimString(x) {
  const result = x.replace(/\s/g, "");
  return result;
}

const result_re = trimString("    Hello World    ");
console.log(result_re);
