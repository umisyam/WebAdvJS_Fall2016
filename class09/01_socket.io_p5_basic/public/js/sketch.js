// Based on Daniel Shiffman's web sockets & p5.js tutorial
// https://www.youtube.com/watch?v=bjULmG8fqc8&list=PLRqwX-V7Uu6b36TzJidYfIYwTFEq3K5qH

// In the old days, to make a node.js multiplayer drawing app it will take hundreds lines of code
// http://tutorialzine.com/2012/08/nodejs-drawing-game/
// Now we're using P5, which makes your life way easier!

var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect();
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x,data.y,30,30);
    }
  );
}

function draw() {
  // Nothing
}

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,30,30);

  console.log("sendmouse: " + mouseX + " " + mouseY);

  // Store the mouse coordinates
  var data = {
    x: mouseX,
    y: mouseY
  };

  // And send that object to the socket
  socket.emit('mouse',data);
}
