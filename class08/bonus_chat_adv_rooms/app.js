// Credit: Gabriel Gianordoli
/*---------- BASIC SETUP ----------*/
var express		= require('express'),
	bodyParser	= require('body-parser');	// helper for parsing HTTP requests
var app = express();						// our Express app
var PORT = 4000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json

// Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));


// -----> Socket.io setup
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Express server is running at ' + PORT);
});

var rooms = {};

/*-------------- APP --------------*/
io.on('connection', function(socket) {
    /*––––––––––– SOCKET.IO starts here –––––––––––––––*/

    console.log('A new user has connected: ' + socket.id);

    // Listeners
    socket.on('lobby', function() {

        // Let's make sure we leave any possible rooms
        leaveAllRooms(socket);

        // Emit to all clients
        socket.emit('room-list', {
            rooms: rooms
        });
    });

    // Creating a new room
    socket.on('create-room', function(roomName) {

        var id = createId(7); // Create a random ID

        // new room Object
        rooms[id] = {         // Add to list of rooms
            name: roomName,   // The name sent by the user
            members: 0        // Number of members in each room
        };

        console.log('New room id: ' + id + ', name: ' + rooms[id].name);

        // Send to the user who created
        socket.emit('room-list', {
            rooms: rooms
        });
    });

    // Joining a room
    socket.on('room', function(roomId){
        console.log('User ' + socket.id + ' is joining room ' + roomId);
        socket.join(roomId);
        rooms[roomId].members ++;
        socket.emit('joined-room', { room: rooms[roomId] });
    });

    // Sending messages
    socket.on('msg-to-server', function(msg) {
        // socket.rooms: list of rooms a user is connected to
        // [0]: each socket automatically joins a room with its own id
        var roomId = socket.rooms[1];
        console.log('User is in room ' + roomId);

        // .to(room) allows us to send msg to a specific room!
        io.to(roomId).emit('msg-to-clients', {
            msg: msg
        });
    });

    // Disconnecting
    socket.on('disconnect', function() {
        io.sockets.emit('bye', 'See you, ' + socket.id + '!');
        leaveAllRooms(socket);
    });
});

function leaveAllRooms(socket){
    console.log('Called leaveAllRooms.');
    console.log(socket.rooms);
    for(var i = 1; i < socket.rooms.length; i++){
        var roomId = socket.rooms[i];
        socket.leave(roomId);
        rooms[roomId].members --;
        console.log('Leaving ' + roomId + '. Members: ' + rooms[roomId].members);
    }
}

// https://gist.github.com/gordonbrander/2230317
function createId(n) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 7 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, n);
}
