//this code was refactored from https://www.educative.io/answers/how-to-make-a-simple-platformer-using-javascript

var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    height: 20,
    width: 20,
    score: 0,
    imag: "assets/pngs/blueSquare.png",
    position: [this.x, this.y],

};

var keys = {
    right: false,
    left: false,
    up: false,
    down: false,
    shoot: false,
};


let playerIcon = new Image();
let enemyIcon = new Image();
let bulletIcon = new Image();
playerIcon.src = player.imag;
enemyIcon.src = "assets/pngs/orangeTriangle.png";
bulletIcon.src = "assets/pngs/purpleTriStar.png";

let intervalInMilliseconds = 5000;

let bullets = [];
let enemies = [];

var friction = 0.5;

function rendercanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 600, 600);
}
// Function to render the player
function renderplayer() {

    ctx.drawImage(playerIcon, player.x, player.y, player.width, player.height);

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
    if (e.keyCode == 32) {
        keys.shoot = true;
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
    if (e.keyCode == 32) {
        keys.shoot = false;
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
    renderBullets();
    requestAnimationFrame(loop);
}
// setInterval(spawnEnemy, intervalInMilliseconds);
// setInterval(spawnEnemy, intervalInMilliseconds);
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

        ctx.drawImage(enemyIcon, enemyArr.x, enemyArr.y, enemyArr.width, enemyArr.height);
        moveEnemy(enemyArr);
    }
}

//code refactored from https://forum.wickeditor.com/t/how-do-you-make-enemies-move-toward-you/1378
function moveEnemy(enemy) {

    let xDistance = player.x - enemy.x;
    let yDistance = player.y - enemy.y;

    speed = .05;
    enemy.x += xDistance * speed;
    enemy.y += yDistance * speed;

}
function spawnEnemy() {

    let enemy = {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        position: [this.x, this.y],
    }

    console.log('Spawn a new enemy!');

    // Generate a random x position.
    let randomXPosition = Math.floor(Math.random() * (canvas.width - enemy.width)) + 1;

    // Generate a random y position.
    let randomYPosition = Math.floor(Math.random() * (canvas.height - enemy.height)) + 1;

    enemy.x = randomXPosition;
    enemy.y = randomYPosition;

    //Create a new Enemy instance and use above coordinates to place it in a random spot.
    //Fill the rest of this object like you did with var bullet = {...}.
    // let newEnemy = {

    // };

    // newEnemy = enemy;
    intervalInMilliseconds -= 100;
    if (intervalInMilliseconds < 500) {
        intervalInMilliseconds = 500;
    }
    // Push your new enemy in the enemies array so you can render them all at once in the draw loop.
    enemies.push(enemy);

    // newEnemy.xPosition = Math.max(0, Math.min(canvas.width - newEnemy.width, newEnemy.xPosition));
    // newEnemy.yPosition = Math.max(0, Math.min(canvas.height - newEnemy.height, newEnemy.yPosition));
}

//This function will run 'spawnEnemy()' every 'intervalInMilliSeconds'.
// setInterval(spawnEnemy, intervalInMilliseconds);

///////////////////////////////////////////////////////////////////////
//code for the bullets

function makeBullets() {

    if (bullets.length < 3) {


        let bulletObject = {
            x: player.x,
            y: player.y,
            width: 10,
            height: 10,
            velocity: {
                x: 0,
                y: 0,
            },
            acceleration: {
                x: 0,
                y: -9.81,
            },
            clickPosition:{x:mouseClick.x, y:mouseClick.y},
            keepGoing: true
            
        }
        console.log("PEW!");
        bullets.push(bulletObject);


    }
}

function renderBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bulletArr = bullets[i];

        ctx.drawImage(bulletIcon, bulletArr.x, bulletArr.y, bulletArr.width, bulletArr.height);
        moveBullets(bulletArr);
    }
}

function deleteBullets() {
    bullets.shift();
}
// let direction = {
//     x: 0,
//     y: 0
// }
let mouseClick;
//     canvas.addEventListener("mousedown", function (e) {
//         getMousePosition(canvas, e);
//     });
// console.log(mouseClick)
// canvas.addEventListener("click", makeBullets);
canvas.addEventListener("click", function (e) {
    getMousePosition(canvas, e);
    makeBullets();
});
// canvas.addEventListener("click", moveBullets(bullets.at(bullets.length - 1)));
setInterval(deleteBullets, 3000);

function getMousePosition(canvas, event) {
    // let rect = canvas.getBoundingClientRect();
//     let x = event.clientX - canvas.offsetLeft;
//     let y = event.clientY - canvas.offsetTop;
//     console.log("Coordinate x: " + x,
//         "Coordinate y: " + y);
//     let mCoords = {
//         x: x,
//         y: y
//     }
//     mouseClick = mCoords
//     console.log(mouseClick)
//     // console.log(mCoords);
//     // return [x,y];
//     // makeBullets(mCoords);
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    mouseClick = { x, y };
}






function moveBullets(bullet) {
    
        let direction = {
            x: bullet.clickPosition.x - bullet.x,
            y: bullet.clickPosition.y - bullet.y
        }

        // Normalize the direction vector to make the bullet move at a constant speed. Got this from a comment from Exca on https://www.html5gamedevs.com/topic/36416-bullet-go-on-mouse-position/
        const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        direction.x /= length;
        direction.y /= length;

        // Set the bullet's speed.
        bullet.speed = .1;

        // Update the bullet's position in the direction of the mouse click.
        bullet.x += direction.x * bullet.speed;
        bullet.y += direction.y * bullet.speed;
    }

