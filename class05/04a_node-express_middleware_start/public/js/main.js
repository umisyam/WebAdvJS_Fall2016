/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var attachEvents = function(){

	};

	var loadCities = function(city){

	};

	var loadWeather = function(city){

	};

	var init = function(){
		console.log('Initializing app.');
		loadCities();
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);