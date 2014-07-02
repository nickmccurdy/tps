var width = 500,
    height = 200;

function InputComponent () {
  var self = this;
  this.keys = [];

  document.body.addEventListener("keydown", function(e) {
    self.keys[e.keyCode] = true;
  });

  document.body.addEventListener("keyup", function(e) {
    self.keys[e.keyCode] = false;
  });
  
  this.update = function(player){
    // check keys
    if (self.keys[38] || self.keys[32]) {
      // up arrow or space
      if(!player.jumping){
        player.jumping = true;
        player.velY = -player.speed*2;
      }
    }
    if (self.keys[39]) {
      // right arrow
      if (player.velX < player.speed) {
        player.velX++;
      }
    }
    if (self.keys[37]) {
      // left arrow
      if (player.velX > -player.speed) {
        player.velX--;
      }
    }
  };
}

function PhysicsComponent () {
  var friction = 0.8;
  var gravity = 0.3;

  this.update = function(player){
    player.velX *= friction;
    player.velY += gravity;

    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= width-player.width) {
      player.x = width-player.width;
    } else if (player.x <= 0) {
      player.x = 0;
    }

    if(player.y >= height-player.height){
      player.y = height - player.height;
      player.jumping = false;
    }
  };
}

function GraphicsComponent () {
  var self = this;
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  
  this.update = function(player){
    context.clearRect(0,0,width,height);
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, player.width, player.height);
  };
}

function Player () {
  var self = this;
  var inputComponent = new InputComponent();
  var physicsComponent = new PhysicsComponent();
  var graphicsComponent = new GraphicsComponent();

  this.x = width/2;
  this.y = height - 5;
  this.width = 5;
  this.height = 5;
  this.speed = 3;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;

  this.update = function(){
    inputComponent.update(self);
    physicsComponent.update(self);
    graphicsComponent.update(self);

    requestAnimationFrame(this);
  };
}

var currentPlayer = new Player();
requestAnimationFrame(currentPlayer.update);