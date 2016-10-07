/*------------------------------------------------*/
// Functions
/*------------------------------------------------*/

// define functions in either of these two ways:

// A) anonymous functions, part of what JS is famous for.
var makeItHappen = function() {
  console.log('I\'m anonymous!');
};

// B) named function
function makeItHappenAgain() {
  console.log('I have a name!');
};

// Calling a function
makeItHappen();
makeItHappenAgain();


// A function either changes a state or return something. Sometimes both:
// Changes state
var openConnection = function() {
  createServer();
  startServer();
  listenToPort(80);
};

// Returns something
var add = function(a,b) {
  return a + b;
};