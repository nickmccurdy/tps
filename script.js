var WIDTH = 500,
    HEIGHT = 200;

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
        player.velY = -player.SPEED*2;
      }
    }
    if (self.keys[39]) {
      // right arrow
      if (player.velX < player.SPEED) {
        player.velX++;
      }
    }
    if (self.keys[37]) {
      // left arrow
      if (player.velX > -player.SPEED) {
        player.velX--;
      }
    }
  };
}

function PhysicsComponent () {
  var self = this;
  this.FRICTION = 0.8;
  this.GRAVITY = 0.3;

  this.update = function(player){
    player.velX *= self.FRICTION;
    player.velY += self.GRAVITY;

    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= WIDTH-player.WIDTH) {
      player.x = WIDTH-player.WIDTH;
    } else if (player.x <= 0) {
      player.x = 0;
    }

    if(player.y >= HEIGHT-player.HEIGHT){
      player.y = HEIGHT - player.HEIGHT;
      player.jumping = false;
    }
  };
}

function GraphicsComponent () {
  var self = this;
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.canvas.width = WIDTH;
  this.canvas.height = HEIGHT;
  
  this.update = function(player){
    self.context.clearRect(0,0,WIDTH,HEIGHT);
    self.context.fillStyle = "red";
    self.context.fillRect(player.x, player.y, player.WIDTH, player.HEIGHT);
  };
}

function Player () {
  var self = this;
  this.inputComponent = new InputComponent();
  this.physicsComponent = new PhysicsComponent();
  this.graphicsComponent = new GraphicsComponent();

  this.x = WIDTH/2;
  this.y = HEIGHT - 5;
  this.WIDTH = 5;
  this.HEIGHT = 5;
  this.SPEED = 3;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;

  this.update = function(){
    self.inputComponent.update(self);
    self.physicsComponent.update(self);
    self.graphicsComponent.update(self);

    requestAnimationFrame(this);
  };
}

var currentPlayer = new Player();
requestAnimationFrame(currentPlayer.update);
