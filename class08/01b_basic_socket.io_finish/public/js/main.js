/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var socket;

	// Initializing socket and adding listener functions
	var socketSetup = function(callback){

		// Connect
	    socket = io.connect();

		// Listeners
		socket.on('welcome', function(data){
			alert(data);
		});

		socket.on('hey-everybody', function(data){
			$('body').append('<h3>'+data+'</h3>');
		});

		socket.on('bye', function(data){
			$('body').append('<h3>'+data+'</h3>');
		});

		socket.on('msg-to-clients', function(data){
			$('body').append('<p>' + data.id + ' says: ' + data.msg + '</p>');
		});

		// Call attachEvents
		callback();
	};

	var attachEvents = function(){
		$('#msg-box').keypress(function(e) {
			if (e.keyCode == 13) {
				socket.emit('msg-to-server', $('#msg-box').val());
			}
		});
	};

	var init = function(){
		console.log('Initializing app.');
		socketSetup(attachEvents);	// Sending attachEvents as a callback
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);