function checkPalindrome(str) {
  const rev_str = str.split("").reverse().join("");

  if (str === rev_str) {
    console.log("Yes palindrome");
  } else {
    console.log("Not palindrome");
  }
}

const str = "1bob1";

// cleaning the string,
const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

checkPalindrome(cleanStr);
