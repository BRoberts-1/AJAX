// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'elppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// function reverse(str) {
//   return str.split("").reduce((reversed, character) => {
//     return character + reversed;
//   }, "");
// }

// Solution 3 - Same as solution 2, but uses the .reduce() method as a means to accomplish the same as the 'for of' loop.
// Step 1) Convert string to an array using .split()
// Step 2) Chain .reduce() which uses a 'reducer' callback function to reduce multiple elements of an array into a single value. 1st arg is a callback function, 2nd arg is optional and is the initial value(otherwise the starting index is used as initial value and iteration will start with the next element i.e. [1]). The function will take the return value cumaltively and add to previous value.
// Step 3) Return the resulting value of all the methods by writing 'return' keyword at beginning.

// function reverse(str) {
//   return str.split("").reduce((reversed, character) => {
//     return character + reversed;
//   }, "");
// }

// To make above solution cleaner:
// Remove return statement inside callback function and remove curly braces(because it is only one line arrow function.)
// We can also use abbreviated parameter names: rev instead of reversed and char instead of character.

function reverse(str) {
  debugger;
  return str.split('').reduce((rev, char) => char + rev, '');
}

reverse('fraplejax');

// Solution 2 - Using the for-loop(the new version 'for of'):

// Do not use for ( let i = 0; i < str.length; i++) {} - Will only use for questions that ask for return of intervals of the string or array. Also, may have to use a while loop for these types of questions.

// Step 1) Create an empty string and assing to a variable
// Step 2) Set up 'for of' loop: Using 'let' keyword because it must constantly update the variable definition, it will loop through the inputed string and for every character(char) of the string(str) it will add it to our reversed empty string annd update our variable called 'reversed'.(Explanation: As the loop iterates through the characters it it concatenates the each next-in-line character to the previous character and fills the empty string variable called 'reversed' in order of next-in-line char to previous char, thus reversing the order.)
// Step 3) Return our reversed string result.

// function reverse(str) {
//   let reversed = "";

//   for (let char of str) {
//     reversed = char + reversed;
//   }

//   return reversed;
// }

// Solution 1 Using str.reverse() method:
// Step 1) Convert string into an array using str.split('')
// Step 2) Reverse the result using arr.reverse()
// Step 3) Convert array result back into a string using arr.join('') and return result. See below.

// function reverse(str) {
//   const arr = str.split("");
//   arr.reverse();
//   return arr.join("");
// }

// To make above solution cleaner:
// function reverse(str) {
//   return str.split("").reverse().join("");
// }
// const result = reverse("apple");
// console.log(result);

module.exports = reverse;
