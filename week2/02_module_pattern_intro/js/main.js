/*------------------------------------------------*/
// Module Pattern
/*------------------------------------------------*/
// Learn more: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
// - Modules are basically JavaScript “classes”
// - Module pattern allows for public & private (plus the lesser-know "protected" and "privileged") access levels.
// - Modules should be Immediately-Invoked-Function-Expressions (IIFE) to allow for private scopes

var app = (function() {
  // declare private variables and/or functions
  var privateVariable = 10;

  var privateMethod1 = function() {
    console.log('This is inside a private method!');
    privateVariable++;
  }

  var privateMethod2 = function() {
    console.log('This is a function that I want to expose!');
  }

  var privateMethod3 = function() {
    privateMethod1();
  }

  return {
  	  // declare public variables and/or functions
      first: privateMethod2,
      second: privateMethod3
  };
})();

app.first();        // Output: This is a function I want to expose!
app.second();       // Output: Inside a private method!
console.log(app.privateMethod2); // undefined


