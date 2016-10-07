// Node works using modules.
// Some, like http, ship with it. But you still need to require them.
var http = require('http');

// request, response
http.createServer(function (req, res) {
	console.log(req);
	console.log(res);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello Cruel World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');