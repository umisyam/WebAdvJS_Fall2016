/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var init = function(){
		console.log('Initializing app.');
		
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);