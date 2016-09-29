var  http = require('http');

http.createServer(function (req, res) {
	res.end('Hello Nice World');
}).listen(3333, "127.0.0.1");

console.log('Server running in localhost:3333');