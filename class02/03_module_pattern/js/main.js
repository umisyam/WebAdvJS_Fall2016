/*------------------------------------------------*/
// Module Pattern
/*------------------------------------------------*/
// Learn more: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

// We'll use this to save ALL our script into a single object.
// This way we don't pollute the global object.
// This is also known as "namespacing our app"
// For example:
var app = (function(){

	console.log('Starting my app');

	// Because the function is immediately executed (IIFE),
	// this data will be initialized just once.

	// 1.
	// Whatever is declared here is PRIVATE.
	// We don't have access to this data outside the object.
	// (Try to console.log-it)
	var menu = {
	'salmon': 6,
	'beef': 8,
	'chicken': 4,
	'salmon': 4,
	'rice': 2,
	'fries': 3,
	'salad': 4,
	'juice': 3,
	'beer': 8,
	'wine': 12,
	'cheesecake': 5,
	'apple pie': 5
	};

	var sum = function(order){
		var total = 0;
		for(var i = 0; i < order.length; i++){
		  // console.log(order[i]);

		  // Remember: menu is accessible to all functions inside the app
		  // Also, everything in JS is an object!
		  if(menu.hasOwnProperty(order[i])){
		  	console.log(order[i]);
		  	total += menu[order[i]];
		  }
		}
		console.log(total);
		return total;
	};

	// 2.
	// Whatever we want to make accessible outside the app (PUBLIC)
	// needs to be returned here.
	return {
		// return the PRIVATE function sum
		// as a PUBLIC property of the app
		sum: sum
	};
})();

console.log(app);
console.log(app.menu);

// 3. Let's order something!
// app.sum(['salmon', 'rice', 'juice', 'cheesecake']);
console.log('The total for your order is $ ' + app.sum(['salmon', 'rice', 'juice', 'cheesecake']));