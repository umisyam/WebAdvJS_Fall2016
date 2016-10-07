// Node works using modules.
// Some, like http, ship with it. But you still need to require them.
var http = require('http');

// request, response
var server = http.createServer(function(req, res) {
	// console.log(req);
	// console.log(res);
	if(req.url === '/login') {
		res.end('loggin you in');
	} else if(req.url === '/logout') {
		res.end('loggin you out');
	}
	// console.log(req.url);
});

// The full documentation of the http object is here:
// https://nodejs.org/api/http.html
server.listen(3000, function() {
	console.log('--> server listening to port: ' + 3000);
});