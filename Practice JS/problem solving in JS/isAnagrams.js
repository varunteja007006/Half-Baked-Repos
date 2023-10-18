// Write a function that determines if two strings are anagrams of each other
// What is an anagram/ a word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

// Solution:  Spilt the strings into two sorted arrays of lowercase chars. If they have same set of elements at same index then they can be said as anagrams

function IsAnagrams(str1, str2) {
  if (
    str1.toLowerCase().split("").sort().join("") ===
    str2.toLowerCase().split("").sort().join("")
  ) {
    console.log("yes they are anagrams");
  } else {
    console.log("No they are not anagrams");
  }
}

IsAnagrams("Apple", "banana");
