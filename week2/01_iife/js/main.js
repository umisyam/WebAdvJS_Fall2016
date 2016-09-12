/*------------------------------------------------*/
// IIFE: Immediately-Invoked Function Expression
/*------------------------------------------------*/
// Learn more: http://benalman.com/news/2010/11/immediately-invoked-function-expression/

// IIFE (pronounced Iffy), Immediately Invoked Function Expression, is a common pattern for  creating local scopes.
// Example 1
(function(){ // the function expression is surrounded by parenthesis
	// variables defined here
	// can't be accessed outside
})(); // the function is immediately invoked


// Example 2
// The function is declared and executed at the same time
var test1 = function(){
  console.log('testing #1');
}();


// // This won't work, though
// function test2(){
//   console.log('testing #2');
// }();


// This will:
// Example 3
(function(){
  console.log('testing #3');
})();


// Say we want to pass arguments to the function
// Example 4
(function(var1, var2, var3, var4) {
  console.log(var1, var2, var3, var4);
})('salmon', 'rice', 'juice', 'cheesecake');





