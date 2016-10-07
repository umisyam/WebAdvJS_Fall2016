// Code below is based on Gabriel Gianordoli's Web Advanced JS

// Load the express module
var express = require('express');
// Call the express() function, which returns an Express Object
// This is going to be our app
var app = express();

var cities = {
	london: 63,
	new_york: 81,
	chicago: 73,
	san_francisco: 63,
	beijing: 68,
	sao_paulo: 81
};

// Basic router
app.get('/cities', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	// Send some data back
	response.json(cities);
});


// Let's use POSTMAN to send some data
// * Add the path localhost:4000/weather
// * Select POST
// * CLick on URL params and add city, san_francisco
app.post('/weather', function(request, response, body){
	console.log('The client just sent a ' + request.method + ' request for ' + request.url);

	// query is a property of the request object
	console.log(request.query);

	// Is the city in our list?
	if(cities.hasOwnProperty(request.query['city'])){
		console.log('Found requested city.');
		// Send back the data
		response.json({
			city: request.query['city'],
			temperature: cities[request.query['city']]
		});
	}else{
		console.log('City not found.');
	}
});


var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});