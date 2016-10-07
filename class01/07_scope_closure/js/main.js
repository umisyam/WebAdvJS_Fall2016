/*------------------------------------------------*/
// Function as Object
/*------------------------------------------------*/

// Declare an object like a function.
// This is called a constructor
function BieberSong(title) {
    this.title = title;
    this.artist = 'Justin Bieber';

  /* A closure is an inner function that has access to the outer (enclosing) function’s
   variables—scope chain. The closure has three scope chains: it has access to its own scope
   (variables defined between its curly brackets), it has access to the outer function’s variables,
   and it has access to the global variables. */
  // Learn more: http://javascriptissexy.com/understand-javascript-closures-with-ease/
  // We will learn more about this next week
    this.play = function(){
      console.log('Playing ' + this.title);
    }
}

var sorry = new BieberSong('Sorry');
console.log(sorry);
var what = new BieberSong('What do you mean?');
console.log(what);
sorry.play();

// If you need to add a property to the Constructor AFTER creating it:
BieberSong.prototype.stop = function(){
  console.log('Stopping track ' + this.title);
}
sorry.stop();

// Is this really a BieberSong?
console.log(sorry instanceof BieberSong);





/*------------------------------------------------*/
// Scope
/*------------------------------------------------*/
// Read more: http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/
// A global variable is a variable that sits in the outermost scope
// A local variable is one that is defined inside a function
// and hence, it's only visible to it's local scope..... and the closure.
// (but we will get to that a bit later.)

// 1. Function-Level Scope
var name = "Sven";
function showName () {
  var name = "Umi";   // local variable; only accessible in this showName function
  console.log (name); // Umi
}
console.log (name);   // Sven: the global variable


// 2. No BLOCK-LEVEL Scope
var test = true;
// the blocks in this if statement do not create a local context for the name variable
if (test) {
  var name = "Kyle"; // this name is the global name variable and it is being changed to "Kyle" here
}
console.log (name); // Wooooot?! Try that in Processing!

// Functions create a scope, though
function testingAgain(){
  var lastName = 'Syam';
}
console.log(lastName);  // try running this, what do you get?


// Do Not Pollute the global Scope (namespace)!
// in JavaScript, namespace is where (inside which object or in what scope) a variable or a property sits
// In professional JS development, we keep the number of global variables to minimum (1). We will learn more about this in Week 2
// It's good to organize your app's code like:
var myApp = {}; // make a new object.
myApp.calculate = {};
myApp.calculate.add = function(num1, num2) {
  return num1 + num2;
};


