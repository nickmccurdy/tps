const WIDTH = 500,
      HEIGHT = 200;

function InputComponent () {
  this.keys = [];

  document.body.addEventListener("keydown", (e) => {
    this.keys[e.keyCode] = true;
  });

  document.body.addEventListener("keyup", (e) => {
    this.keys[e.keyCode] = false;
  });

  this.update = (player) => {
    // check keys
    if (this.keys[38] || this.keys[32]) {
      // up arrow or space
      if(!player.jumping){
        player.jumping = true;
        player.velY = -player.SPEED*2;
      }
    }
    if (this.keys[39]) {
      // right arrow
      if (player.velX < player.SPEED) {
        player.velX++;
      }
    }
    if (this.keys[37]) {
      // left arrow
      if (player.velX > -player.SPEED) {
        player.velX--;
      }
    }
  };
}

function PhysicsComponent () {
  this.FRICTION = 0.8;
  this.GRAVITY = 0.3;

  this.update = (player) => {
    player.velX *= this.FRICTION;
    player.velY += this.GRAVITY;

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
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.canvas.width = WIDTH;
  this.canvas.height = HEIGHT;

  this.update = (player) => {
    this.context.clearRect(0,0,WIDTH,HEIGHT);
    this.context.fillStyle = "red";
    this.context.fillRect(player.x, player.y, player.WIDTH, player.HEIGHT);
  };
}

function Player () {
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

  this.update = () => {
    this.inputComponent.update(this);
    this.physicsComponent.update(this);
    this.graphicsComponent.update(this);

    requestAnimationFrame(this.update);
  };
}

var currentPlayer = new Player();
requestAnimationFrame(currentPlayer.update);
