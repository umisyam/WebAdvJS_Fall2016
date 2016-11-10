var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

app.use('/', express.static(__dirname + '/public'));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function() {
    console.log('Server listening at port ' + PORT);
});
