const str = 'boby'
const rev_str = str.split('').reverse().join('')

if (str === rev_str) {
    console.log('Yes palindrome');
} else {
    console.log('Not palindrome');
}