// 1. Require the Express module
var express = require('express');
// 2. Create the application instance
var app = express();
// Now app is an object that can call Express functions to create "routes"

// 3. The get() function creates a route that accepts HTTP GET requests
// and a callback function that runs each time our app receives a GET request on the root path '/'
app.get('/', function (request, response) {
	// sends back server response
	response.send('Hello Cruel World');
	// send() is a built-in function from the Express API, if we're using the built-in Node functions, it's the same thing as writing these 2 lines:
	// response.write('Hello Cruel World');
	// response.end();
})

// 4. Last, we bind our app to TCP port 4000 or whatever port you desire
var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});