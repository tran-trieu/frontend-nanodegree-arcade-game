// Enemies our player must avoid
const Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    //enemy moves off canvas, alternates between paces
    if (this.x > 540) {
        this.x = -100;
        this.speed = 150 + Math.floor(Math.random()*256);
    }

    //collision between player and enemy, player is brought
    //back to original position
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
            player.x = 200;
            player.y = 380;
        }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';

};

Player.prototype.update = function() {

    //stops user from moving outside of the
    //frame
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    //moves user back to original position
    //if they've reached the water
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//moves character according to the keys the user
//is pressing
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left': this.x -= this.speed + 50;
        break;
        case 'right': this.x += this.speed + 50;
        break;
        case 'up': this.y -= this.speed + 30;
        break;
        case 'down': this.y += this.speed + 30;
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

//creates new enemies that move from
//the left side in
const enemyPosition = [60, 145, 230];
const player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 150 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
