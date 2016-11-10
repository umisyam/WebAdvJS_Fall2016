var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  socket = io.connect();
  socket.on('mouse', function(data) {
    console.log('Got: ' + data.x + ', ' + data.y);

    fill(255,255,0);
    noStroke();
    ellipse(data.x, data.y, 40,40);
  });
}

function draw() {

}

function mouseDragged() {
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 40,40);

  console.log("sendmouse pos: " + mouseX + ", " + mouseY);
  socket.emit('mouse', {x: mouseX, y: mouseY} );
}