/*------------------------------------------------*/
// Array
/*------------------------------------------------*/
// A collection of things.
// There are multiple ways to create array in JS:
// 1. Creating an array constructor -- THIS IS NOT PREFERABLE, TRY TO AVOID
var badArray = new Array(5);
// Creates an empty Array that's sized for 5 elements.
alert(badArray.length); // returns 5

// 2. Create literal array -- USE THIS INSTEAD!
var goodArray= [5];
// Creates an Array with 10 as the first element.
console.log(goodArray[0]); 	// returns 5

// JS treats goodArray as a VARIABLE with a data type of array, and it treats badArray as an OBJECT with the functionality of an array.

// The most common way to do an array is simply:
var fruits = ["Apple", "Banana", "Cantaloupe"];
console.log(fruits.length);	// 3
var first = fruits[0];	// Apple
var last = fruits[fruits.length - 1];	// Cantaloupe
fruits.forEach(function (item, index, array) {
  console.log(item, index);
  // Apple 0
  // Banana 1
  // Cantaloupe 2
});

// add something to the end of array
var newLength = fruits.push("Orange");

// remove last element Orange (from the end)
var last = fruits.pop();

// remove first element Apple (from the front)
var first = fruits.shift();

// add new element to the front
var newLength = fruits.unshift("Strawberry")

// Find the index of an item in the Array
var pos = fruits.indexOf("Banana");

// Remove an item by Index Position
var removedItem = fruits.splice(pos, 1);

// Copy an Array
var shallowCopy = fruits.slice();

// ------------------------------------------------
// Example of Array with some elements of mixed type
var anotherArray = [1, 5, "string", {hello: "world"}]



/*------------------------------------------------*/
// Objects
/*------------------------------------------------*/
// Similar to array, there are also multiple ways to create an object in JS:
// 1. Creating an object constructor -- ALSO NOT PREFERABLE
var mySong = new Object();

// 2. Create literal object - Declaring AND adding properties (LET'S USE THIS)
var mySong = {
  name : 'Sorry', // commas, not semicolons!
  artist : 'Justin Bieber',
  stars : 5,
  grammy : false,
  play : function() {
    // do some stuff
  }
};
// It is said that pretty much everything in JS is an object. We'll see how shortly.

console.log(mySong.name + ", " + mySong.artist);
// I usually prefer instead
console.log(mySong['name']);

// You can add properties later too
mySong.year = 2015;
