var express = require('express');
var app = express();
var PORT = 3000;

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port ' + PORT);
});

// Also read: http://socket.io/get-started/chat/
// And the documentation http://socket.io/docs/
// ------------- APP -----------------
io.on('connection', function (socket) {

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {

  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {

  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {

  });

});
