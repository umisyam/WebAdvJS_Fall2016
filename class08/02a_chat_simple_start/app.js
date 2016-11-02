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
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    socket.username = username;
    // numUsers = numUsers + 1;
    // numUsers += 1;
    ++numUsers;
    socket.emit('login', { numUsers: numUsers });

    io.sockets.emit('user joined', {     // broadcast to ALL clients including the sender
    // socket.broadcast.emit('user joined', {  // broadcast to ALL clients EXCEPT for the sender
      username: socket.username,
      numUsers: numUsers
    })

  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // io.sockets.emit('new message', {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    })
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {

  });

});
