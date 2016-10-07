/*------------------------------------------------*/
// single var declaration
/*------------------------------------------------*/

// instead of:
var distance = 20;
var speed = 4.5;
var vehicleType = 'bus';

// you can do:
var distance = 20,
    speed = 4.5,
    vehicleType = 'bus';

// Never drop the "var" when declaring variables!
currentValue = 5

// is totally not the same as
var currentValue = 5;

// IMPORTANT:
// When declaring variables, always remember to put in the semicolon. JS is forgiving and tried to figure out what you mean using Automatic semicolon insertion (ASI), But this can go wrong. Use 'em!


/*------------------------------------------------*/
// Data Types
/*------------------------------------------------*/

// String
var name = 'Luke Skywalker';
// side note: Strings have a '.length' property:
var numChars = name.length // 14


// Number
var height = 6.5;
// JS doesn't have floats and ints. if you want to clip decimals:
var intHeight = Math.round(height);


// Boolean
var isRad = true;


// null, is a primitive data type. JS be like: no idea.
var name = null;


// undefined
var songCount;
// console.log(track); returns undefined. if a var is not defined, or
// but not initialized, it has an undefined value.


/*------------------------------------------------*/
// Debug!
/*------------------------------------------------*/
typeof name;



/*------------------------------------------------*/
// Hoisting
/*------------------------------------------------*/
// In JavaScript, a variable can be declared after it has been used.
// In other words; a variable can be used before it has been declared.
// Hoisting is JavaScript's default behavior of moving all declarations
// to the top of the current scope
// (to the top of the current script or the current function).

// Example 1: Assign then declare later
x = 5; // Assign 5 to x
elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element
var x; // Declare x

// Example 2: Normally, Declare first
var x; // Declare x
x = 5; // Assign 5 to x
elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

// But for best practices, Always Declare Your Variables At the Top!
