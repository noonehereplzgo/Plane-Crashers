var socket = io();
var clientShip;
var ships = {};

function setup(){
  var canvas = createCanvas(windowWidth * 0.75, windowHeight * 0.87);
  canvas.parent('sketch-holder');
  clientShip = new ship(random(width), random(height),0);

  var data = {
    x: clientShip.pos.x,
    y: clientShip.pos.y,
  };
  socket.emit('start', data);

}

function draw(){
  background(0);

  socket.on('heartbeat', function(data){
    ships = data;
  });
  for(var id in ships){
      if(socket.id !== id){
            noFill();
            stroke(255);
            circle(ships[id].x, ships[id].y, 45);
          }
    }


  clientShip.render();
  clientShip.update();
  clientShip.turn();


  var data = {
    x: clientShip.pos.x,
    y: clientShip.pos.y,
  };


  socket.emit('update', data);

}

function keyPressed(){
//W key
  if(keyCode == 87){
    clientShip.thrusting(true);
  }
}
function keyReleased(){
  if(keyCode == 87){
    clientShip.thrusting(false);
  }
}