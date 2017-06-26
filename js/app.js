var Game = function () {
  this.start();
};
Game.prototype.start = function () {
  this.state = 'start';
};
Game.prototype.update = function(key) {
  switch (key) {
    case 'enter':
      this.state = 'running';
      break;
  }
};
Game.prototype.handleInput = function(key) {
  if (game.state == 'start') {
    this.update(key);
  }
};


// I'm not sure how much value I'm getting out of this, but it seemed
// appropriate to create a parent class containing the methods that were
// the same between my renderable classes
var Renderable = function() {};
Renderable.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Character selector for the main menu
var Selector = function() {
  this.charImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ];
  this.sprite = 'images/Selector.png';
  this.start();
};
Selector.prototype = Object.create(Renderable.prototype);
Selector.prototype.start = function() {
  this.player = new Player();
  this.selected = 0;
  this.x = 0;
  this.y = 3 * 83;
};
Selector.prototype.update = function(key) {
  switch (key) {
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
        this.selected -= 1;
        player.sprite = this.charImages[this.selected];
      }
      break;
    case 'right':
      if (this.x < 404) {
        this.x += 101;
        this.selected += 1;
        player.sprite = this.charImages[this.selected];
      }
      break;
  }
};
Selector.prototype.handleInput = function(key) {
  if (game.state == 'start') {
    this.update(key);
  }
};

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  // Setup the enemy!
  this.start();
};
Enemy.prototype = Object.create(Renderable.prototype);
Enemy.prototype.constructor = Enemy;

// Starts the enemy out initially or after it reaches the end of the board
Enemy.prototype.start = function() {
  // Offsetting the enemy by 101 pixels to start if off the canvas
  this.x = -101;

  // Randomly select the road row that the enemy shows up on
  var row = Math.floor(Math.random() * 3 + 1);
  // The rows are 83 pixels apart vertically, and offsetting the enemy by
  // about 20 pixels seems to work well
  this.y = row * 83 - 25;

  // Randomly set the enemy's speed ...100 to 600 seems good right now...
  this.speed = Math.floor(Math.random() * 500 + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed;

  // Restart the enemy after it leaves the page!
  if (this.x > 5 * 101) {
    this.start();
  }

  // Speed * dt seems significantly small enough that this collision
  // detection seems to work
  if (this.y == player.y && Math.abs(this.x - player.x) < 50) {
    player.start();
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.start();
};
Player.prototype = Object.create(Renderable.prototype);
Player.prototype.constructor = Player;

Player.prototype.start = function() {
  this.x = 202;
  this.y = 5 * 83 - 25;
};

Player.prototype.update = function(key) {
  switch (key) {
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case 'up':
      if (this.y > 83) {
        this.y -= 83;
      } else {
        this.start();
      }
      break;
    case 'right':
      if (this.x < 404) {
        this.x += 101;
      }
      break;
    case 'down':
      if (this.y < 83 * 4) {
        this.y += 83;
      }
      break;
  }
};

Player.prototype.handleInput = function(key) {
  if (game.state == 'running') {
    this.update(key);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game();
var selector = new Selector();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Updated to listen for 'keydown'...it was weird to use 'keyup'
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    13: 'enter'
  };

  selector.handleInput(allowedKeys[e.keyCode]);
  game.handleInput(allowedKeys[e.keyCode]);
  player.handleInput(allowedKeys[e.keyCode]);
});
