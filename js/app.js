
"use strict";

//Sets the total score at 0 to begin with 
var totalScore = 0; 


// Enemies our player must avoid
var Enemy = function() {   
	//Set the enemies x start position to random point to left of screen, to stagger their arrival into game
	this.x = (Math.floor((Math.random() * -300)) - 100); 
	//Sets the enemies y position to one of the three lanes - positions either 55, 140 or 225 
	this.y = (Math.floor((Math.random() * 3)) * 85) + 55;
	//sets the enemies speed 
	this.speed = (Math.floor((Math.random() * this.y)) + 125); 
	//enemies image to the bug  
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
	//if enemy moves off the right of he screen, moves back to left of the screen, and randomise which lane it is in
	else  {
		this.x = (Math.floor((Math.random() * -125)) - 50);
		this.y = (Math.floor((Math.random() * 3)) * 85) + 55;
	}
	//if there is a collision between the player and an enemy - the deduction from score and the position of the player is reset
	if(player.x > this.x - 50 & player.x < this.x + 50 & player.y > this.y - 40 & player.y < this.y + 40) {
		totalScore = totalScore - 10;
		player.reset();
	}
};


//Function to create enemies 
var allEnemies = []; 

	(function setEnemies(){
		//limits the no. of enemies to 6	
		while (allEnemies.length < 6) {
		allEnemies.push(new Enemy);
		}
	}
	());

//Array with the different images for players 
var possiblePlayers = [
  	'images/char-boy.png',
  	'images/char-cat-girl.png',
  	'images/char-horn-girl.png',
  	'images/char-pink-girl.png',
  	'images/char-princess-girl.png'
];

// Player info 
var Player = function() {
	//Starting position - grass bottom middle of the screen
	this.x = 200;
	this.y = 400;
	//plater is a randomly selected  image each time game is loaded
	this.sprite = possiblePlayers[Math.floor(Math.random() * 5)];
}


//Draw the player on the screen
Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}; 

//Reset to retun player to starting position if collision or gets to water
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


//Player handles input from keys but is stopped from moving our of screen
Player.prototype.handleInput = function (key) {
	if(key === 'left' & this.x > 0) {
		this.x = this.x - 101;
	} else if (key === 'right' & this.x < 400) {
	this.x = this.x + 101;
	} else if (key === 'up') {
	this.y = this.y - 83;
	} else if (key === 'down' & this.y < 400) {
		this.y = this.y + 83;}	
}; 

//If players reaches the water 
Player.prototype.update = function () {
	if (this.y < -10) {
		//then adds to the score
		totalScore = totalScore + 20;
		// and resets the players position
		this.reset();
	};
} 

//Create a new player
var player = new Player;


//Array for the different coloured gem images
var possibleGems = [
	'images/Gem Orange.png', 
	'images/Gem Blue.png', 
	'images/Gem Green.png'
	];

var Gem = function() {
	//picks a random coloured gem
	this.sprite = possibleGems[Math.floor(Math.random() * 3)];
	// Ensure Gem is loaded at a random place somewhere on the roads 
	this.x = (Math.floor((Math.random()) * 400) + 10); 
	this.y = (Math.floor((Math.random()) * 200) + 10);
};

//Renders the Gem 
Gem.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}; 

//Updates if player collects gem
Gem.prototype.update = function() {
	//if player gets to gem
	if(player.x > this.x - 90 & player.x < this.x + 90 & player.y > this.y - 90 & player.y < this.y + 90) {
		//then adds this amount to the score 
		totalScore = totalScore + 5;
		//and moves the gem to a new location - possibly with a different color
		this.sprite = possibleGems[Math.floor(Math.random() * 3)];
		this.x = (Math.floor((Math.random()) * 400) + 10); 
		this.y = (Math.floor((Math.random()) * 200) + 10);
	};
};

var gem = new Gem; 


//Displays the player's score at the bottom of the page
var displayScore = function () {
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score = " + totalScore, 5, 575);
};
