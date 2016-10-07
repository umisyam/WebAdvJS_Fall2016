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

	var loadWeather = function(user_input){
		$.post('/weather', {
			city: user_input
		}, function(response) {
        	console.log(response);
        	$('#data').empty();
        	$('#data').append('<p>The weather in ' + response.city + ' is:</p>');
        	$('#data').append('<p>' + response.weather.temp_f + '</p>');
        	$('#data').append('<p>' + response.weather.temp_c + '</p>');
        	$('#data').append('<p>' + response.weather.wind_dir + '</p>');
        	$('#data').append('<p>' + response.weather.wind + '</p>');
        	$('#data').append('<p>' + response.weather.humidity + '</p>');
    //     	for(var prop in response['weather']){
				// $('#data').append('<p>' + prop + ': ' + response['weather'][prop] + '</p>');
    //     	}
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