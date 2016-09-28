/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var attachEvents = function(){
		$('button').off('click').on('click', function(){
			loadWeather($(this).html());
		});
	};

	var loadCities = function(city){
		$.getJSON('/cities', function(response){
			for(var i = 0; i < response.length; i++){
				$('body').prepend('<button name=' + response[i] + '>' + response[i] + '</button>');
			}
			attachEvents();
		});
	};

	var loadWeather = function(city){
		$.post('/weather', {
			city: city
		}, function(response) {
        	console.log(response);
        	$('#data').empty();
        	$('#data').append('<p>The weather in ' + response['city'] + ' is:</p>');
        	for(var prop in response['weather']){
				$('#data').append('<p>' + prop + ': ' + response['weather'][prop] + '</p>');
        	}
	    });
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