
var totalScore = 0; 

// Enemies our player must avoid
var Enemy = function() {   
								this.x = (Math.floor((Math.random() * -300)) - 100); 
								//console.log(this.x);
								this.y = (Math.floor((Math.random() * 3)) * 85) + 55;
								//console.log(this.y);
								this.speed = (Math.floor((Math.random() * this.y)) + 125); 
								//console.log(this.speed);  
								this.sprite = 'images/enemy-bug.png';
								}; 

// Draw the enemy on the screen
Enemy.prototype.render = function() {
				ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position with parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
					if (this.x < 500) {
								this.x += this.speed * dt; 
				}
				else  {
								this.x = (Math.floor((Math.random() * -125)) - 50);; 
				}
				//if there is a collision between the player and the enemies then the position of the player is reset
				if(player.x > this.x - 35 & player.x < this.x + 35 & player.y > this.y - 30 & player.y < this.y +30) {
					totalScore = totalScore - 50;
					console.log(totalScore); 
					player.reset();
				}
};


//Create enemies - currently one a lane - may need to change. 
var allEnemies = []; 

				(function setEnemies(){
				while (allEnemies.length < 6) {
					allEnemies.push(new Enemy);
					}
				}
				());

// Player info 
var Player = function() {
				this.x = 200;
				this.y = 400;
				this.sprite ="images/char-boy.png";
				this.reset();
}


//Draw the player on the screen
Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}; 

//Reset to take player  back to starting position if collision or crosses all the lanes
Player.prototype.reset = function () {
	this.x = 200; 
	this.y = 400; 
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
                var allowedKeys = {
                                37: 'left',
                                38: 'up',
                                39: 'right',
                                40: 'down'
                };
    player.handleInput(allowedKeys[e.keyCode]);
});

var player = new Player;

//Player handles input from keys but is stopped from moving our of screen
Player.prototype.handleInput = function (key) {
				if(key === 'left' & this.x > 10) {
					this.x = this.x - 40;
					} else if (key === 'right' & this.x < 400) {
					this.x = this.x + 40;
				} else if (key === 'up') {
					this.y = this.y - 40;
				} else if (key === 'down' & this.y < 400) {
					this.y = this.y + 40;}

}; 
Player.prototype.update = function () {
	if (this.y < -30) {
		totalScore = totalScore + 100;
		console.log(totalScore); 
		this.reset();
	};
} 









// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// need - player and allEnemies to be defined var player = new Player(); 
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


