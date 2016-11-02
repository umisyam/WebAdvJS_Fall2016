var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var socket;
	var socketSetup = function(callback) {
		// Connect
		socket = io.connect();

		//Listeners
		socket.on('welcome', function(data){
			alert(data);
		});

		socket.on('hey everyone', function(data){
			$('body').append('<h3>' + data + '</h3>');
		});
		socket.on('message to clients', function(data){
			$('body').append('<p>' + data.id + ' says: ' + data.msg +  '</p>');
		});
		socket.on('bye', function(data) {
			$('body').append('<h3>' + data + '</h3>');
		});

		callback();
	}

	// event listener for our text box
	var attachEvents = function(){
		$('#msg-box').keypress(function(e) {
			if (e.keyCode == 13) {
				// when user hit enter, do something
				socket.emit('message to server', $('#msg-box').val());
			}
		});
	};

	var init = function(){
		console.log('Initializing app.');
		// do something
		socketSetup(attachEvents);
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);