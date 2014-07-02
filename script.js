const WIDTH = 500,
      HEIGHT = 200;

function InputComponent (player) {
  this.player = player;
  this.keys = [];

  document.body.addEventListener("keydown", (e) => {
    this.keys[e.keyCode] = true;
  });

  document.body.addEventListener("keyup", (e) => {
    this.keys[e.keyCode] = false;
  });

  this.update = () => {
    // check keys
    if (this.keys[38] || this.keys[32]) {
      // up arrow or space
      if(!this.player.jumping){
        this.player.jumping = true;
        this.player.velY = -this.player.SPEED*2;
      }
    }
    if (this.keys[39]) {
      // right arrow
      if (this.player.velX < this.player.SPEED) {
        this.player.velX++;
      }
    }
    if (this.keys[37]) {
      // left arrow
      if (this.player.velX > -this.player.SPEED) {
        this.player.velX--;
      }
    }
  };
}

function PhysicsComponent (player) {
  this.player = player;
  this.FRICTION = 0.8;
  this.GRAVITY = 0.3;

  this.update = () => {
    this.player.velX *= this.FRICTION;
    this.player.velY += this.GRAVITY;

    this.player.x += this.player.velX;
    this.player.y += this.player.velY;

    if (this.player.x >= WIDTH-this.player.WIDTH) {
      this.player.x = WIDTH-this.player.WIDTH;
    } else if (this.player.x <= 0) {
      this.player.x = 0;
    }

    if(this.player.y >= HEIGHT-this.player.HEIGHT){
      this.player.y = HEIGHT - this.player.HEIGHT;
      this.player.jumping = false;
    }
  };
}

function GraphicsComponent (player) {
  this.player = player;
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.canvas.width = WIDTH;
  this.canvas.height = HEIGHT;

  this.update = () => {
    this.context.clearRect(0,0,WIDTH,HEIGHT);
    this.context.fillStyle = "red";
    this.context.fillRect(this.player.x, this.player.y, this.player.WIDTH, this.player.HEIGHT);
  };
}

function Player () {
  this.inputComponent = new InputComponent(this);
  this.physicsComponent = new PhysicsComponent(this);
  this.graphicsComponent = new GraphicsComponent(this);

  this.x = WIDTH/2;
  this.y = HEIGHT - 5;
  this.WIDTH = 5;
  this.HEIGHT = 5;
  this.SPEED = 3;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;

  this.update = () => {
    this.inputComponent.update();
    this.physicsComponent.update();
    this.graphicsComponent.update();

    requestAnimationFrame(this.update);
  };
}

var currentPlayer = new Player();
requestAnimationFrame(currentPlayer.update);
