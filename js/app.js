/* global ctx Resources */

// I'm not sure how much value I'm getting out of this, but it seemed
// appropriate to create a parent class containing the methods that were
// the same between Enemy and Player...
class Character {
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Character {
  constructor() {
    super();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.start();
  }

  start() {
    // Offsetting the enemy by 101 pixels to start if off the canvas
    this.x = -101;

    // Randomly select the road row that the enemy shows up on
    const row = Math.floor((Math.random() * 3) + 1);

    // The rows are 83 pixels apart vertically, and offsetting the enemy by
    // about 20 pixels seems to work well
    this.y = (row * 83) - 25;

    // Randomly set the enemy's speed ...100 to 600 seems good right now...
    this.speed = Math.floor((Math.random() * 500) + 100);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
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
    if (this.y === player.y && Math.abs(this.x - player.x) < 50) {
      player.start();
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
  constructor() {
    super();
    this.sprite = 'images/char-boy.png';
    this.start();
  }

  start() {
    this.x = 202;
    this.y = (5 * 83) - 25;
  }

  update(key) {
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
      default:
        break;
    }
  }

  handleInput(key) {
    this.update(key);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Updated to listen for 'keydown'...it was weird to use 'keyup'
document.addEventListener('keydown', (e) => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
