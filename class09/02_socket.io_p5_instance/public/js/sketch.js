var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var socket;

	var sketch = function(p) {
		// your global var for your p5 sketch here

		// p5 setup
		p.setup = function() {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.background(0);
			// Start a socket connection to the server
			socket = io.connect();
			// We make a named event called 'mouse' and write an anonymous callback function
			socket.on('mouse',
			// When we receive data
				function(data) {
				  console.log("Got: " + data.x + " " + data.y);
				  // Draw a blue circle
				  p.fill(0,0,255);
				  p.noStroke();
				  p.ellipse(data.x,data.y,30,30);
				}
			);
		};

		p.draw = function() {
		    // Nothing
		};

		p.mouseDragged = function() {
			// Draw some white circles
			p.fill(255);
			p.noStroke();
			p.ellipse(p.mouseX,p.mouseY,30,30);

			console.log("sendmouse: " + p.mouseX + " " + p.mouseY);

			// Store the mouse coordinates
			var data = {
				x: p.mouseX,
				y: p.mouseY
			};

			// And send that object to the socket
			socket.emit('mouse',data);
		};

	};

	var init = function(){
		console.log('Initializing app.');

		// If you are writing long programs that mix multiple JS libraries,
		// you might want to start your P5 sketch in an "instance mode".
		// One of the benefits is that it enables you to run multiple P5 sketch in one program.
		// Learn more: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
		var myp5 = new p5(sketch);

		// Optionally, you can specify a default container for the canvas and any other elements to append to with a second argument. Like this:
		// var myp5 = new p5(sketch, 'canvas-container');
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);