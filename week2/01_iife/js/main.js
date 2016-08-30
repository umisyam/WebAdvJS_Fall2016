/*------------------------------------------------*/
// IIFE: Immediately-Invoked Function Expression
/*------------------------------------------------*/
// Learn more: http://benalman.com/news/2010/11/immediately-invoked-function-expression/

// The function is declared and executed at the same time
var test1 = function(){
  console.log('testing #1');
}();

// // This won't work, though
// function test2(){
//   console.log('testing #2');
// }();

// This will
(function(){
  console.log('testing #3');
})();

// Say we want to pass arguments to the function
(function(var1, var2, var3, var4) {
  console.log(var1, var2, var3, var4);
})('salmon', 'rice', 'juice', 'cheesecake');