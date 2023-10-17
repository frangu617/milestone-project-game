//this code was refactored from https://www.educative.io/answers/how-to-make-a-simple-platformer-using-javascript

var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    height: 20,
    width: 20,
    score: 0,
};

var keys = {
    right: false,
    left: false,
    up: false,
    down: false,
};


// let stageWidth = canvas.width;
// let stageHeight = canvas.height;

let intervalInMilliseconds = 5000;

let enemies = [];

var friction = 0.5;

function rendercanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 600, 600);
}
// Function to render the player
function renderplayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect((player.x) - 20, (player.y) - 20, player.width, player.height);

}

function keydown(e) {
    // 37 is the code for thr left arrow key
    if (e.keyCode == 37) {
        keys.left = true;
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39) {
        keys.right = true;
    }
    // 38 is the code for the up arrow key
    if (e.keyCode == 38) {
        keys.up = true;
    }
    // 40 is the code for the down arrow key
    if (e.keyCode == 40) {
        keys.down = true;
    }
}
// This function is called when the key is released
function keyup(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }
    if (e.keyCode == 38) {
        keys.up = false;
    }
    // 40 is the code for the down arrow key
    if (e.keyCode == 40) {
        keys.down = false;
    }
}
function loop() {
    if (keys.left) {

        if (player.x > 0 + player.width) {
            player.x += -4.5;
        }
    }
    // If the right key is pressed, move the player to the right
    if (keys.right) {
        if (player.x < canvas.width) {
            player.x += 4.5;
        }
    }
    // If the up key is pressed, move the player up
    if (keys.up) {
        if (player.y > 0 + player.height + 25) {
            player.y += -4.5;

        }
    }
    // If the down key is pressed, move the player down
    if (keys.down) {
        if (player.y < canvas.height) {
            player.y += 4.5;
        }
    }
    rendercanvas();
    renderplayer();
    updateScore(0);
    renderenemy();
    // renderplat();
}
setInterval(spawnEnemy, intervalInMilliseconds);
function updateScore(num) {
    ctx.clearRect(10, 0, canvas.width - 5, 10);
    ctx.fillStyle = "black";
    if (player.score <= 0 || player.score > 0) {
        player.score += num
    }
    // Set the font and draw the new score
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${player.score}`, 10, 20);
}
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 400;
ctx.canvas.width = 400;
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
// Calling loop every 22 milliseconds to update the frame
setInterval(loop, 22);
loop();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//code refactore from user Rembrandt at https://www.html5gamedevs.com/topic/21551-spawning-enemies/
function renderenemy() {
    for (let i = 0; i < enemies.length; i++) {
        let enemyArr = enemies[i];
        ctx.fillStyle = "red";
        ctx.fillRect((enemyArr.x) - 20, (enemyArr.y) - 20, enemyArr.width, enemyArr.height);
    }
}

function spawnEnemy() {
    let enemy = {

        x: 200,
        y: 200,
        x_v: 0,
        y_v: 0,
        height: 20,
        width: 20,
        score: 0,
    };
    

    console.log('Spawn a new enemy!');

    // Generate a random x position.
    let randomXPosition = Math.floor(Math.random() * (canvas.width - enemy.width)) + 1;

    // Generate a random y position.
    let randomYPosition = Math.floor(Math.random() * (canvas.height - enemy.height)) + 1;

    enemy.x = randomXPosition;
    enemy.y = randomYPosition;
    renderenemy();
    //Create a new Enemy instance and use above coordinates to place it in a random spot.
    //Fill the rest of this object like you did with var bullet = {...}.
    let newEnemy = {
        xPosition: randomXPosition,
        yPosition: randomYPosition
    };

    intervalInMilliseconds -= 100;
    if (intervalInMilliseconds <= 500) {
        intervalInMilliseconds = 500;
    }
    // Push your new enemy in the enemies array so you can render them all at once in the draw loop.
    enemies.push(enemy);

    newEnemy.xPosition = Math.max(0, Math.min(canvas.width - newEnemy.width, newEnemy.xPosition));
    newEnemy.yPosition = Math.max(0, Math.min(canvas.height - newEnemy.height, newEnemy.yPosition));
}

//This function will run 'spawnEnemy()' every 'intervalInMilliSeconds'.
// setInterval(spawnEnemy, intervalInMilliseconds);