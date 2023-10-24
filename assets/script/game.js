import { renderplayer, keydown, keyup } from "./player.js";
import { player, keys } from "./player.js";
import { renderenemy, spawnEnemy, } from "./enemies.js";
import { renderBullets, getMousePosition, makeBullets, } from "./bulltets.js";
import { enemyBulletColl, enemyPlayerColl } from "./collision.js";
import { movePausedIn, movePausedOut, renderPause } from "./pauseScreen.js";
import { renderGameOver, moveGameOverIn, restart } from "./gameOver.js";
import { renderGameStart, moveGameStartIn, moveGameStartOut } from "./startScreen.js";


function setHiScore() {
    if (player.score > localStorage.getItem("hiScore")) {
        localStorage.setItem("hiScore", player.score);
    }
}
function getHighScore() {
    return localStorage.getItem("hiScore");
}
export function togglePaused() {
    isItPaused = !isItPaused
}
if (getHighScore() == null) {
    localStorage.setItem("hiScore", 0);
}
let mySound = new Audio('./assets/audio/music-loop.mp3');

mySound.volume = 0.1;
mySound.loop = true;

export let intervalInMilliseconds = 3000;
export let isItPaused = false;
export let started = false;
function rendercanvas() {
    ctx.fillStyle = 'aquamarine';
    ctx.fillRect(0, 0, 800, 800);


}

function loop() {
    if (!started) {
        moveGameStartIn();
        renderGameStart();
        return
    }


    movePausedOut()
    if (player.alive) {
        if (isItPaused) {
            movePausedIn()
            renderPause();
            musicStop();
            return
        }
        // If the left key is pressed, move the player to the left
        if (keys.left) {

            if (player.x > 0 + player.width) {
                player.x += -4.5;
            }
        }
        // If the right key is pressed, move the player to the right
        if (keys.right) {
            if (player.x < canvas.width - player.width) {
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
            if (player.y < canvas.height - player.height) {
                player.y += 4.5;
            }
        }
        if (player.score > getHighScore()) {
            setHiScore()
        }
        moveGameStartOut();
        rendercanvas();
        updateScore(0);
        renderenemy();
        renderBullets();
        enemyPlayerColl();
        enemyBulletColl();
    }
    renderplayer();
    if (player.alive === false) {
        moveGameOverIn();
        renderGameOver();
        addEventListener("keyup", function (e) {

            if (e.keyCode === 81) {

                restart()
            }

        });
    }

}
setInterval(spawnEnemy, intervalInMilliseconds);
setInterval(spawnEnemy, intervalInMilliseconds * 2);
setInterval(spawnEnemy, intervalInMilliseconds * 2.5);

export function updateScore(num) {
    ctx.clearRect(10, 0, canvas.width - 5, 10);
    ctx.fillStyle = "black";
    if (player.score <= 0 || player.score > 0) {
        player.score += num
    }
    // Set the font and draw the new score
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${player.score}`, 10, 20);
    ctx.fillText(`Hi Score: ${localStorage.getItem("hiScore")}`, 10, 40);

}

export let canvas = document.getElementById("gameCanvas");
export let ctx = canvas.getContext("2d");
ctx.canvas.height = 800;
ctx.canvas.width = 800;
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

document.addEventListener('keyup', function (e) {
    if (started === false) {
        if (e.keyCode === 81) {
            musicStart();
            started = true;
        }
    }
})

// Calling loop every 22 milliseconds to update the frame
window.onload = function () {
    renderGameStart();
    if (!isItPaused) {    
    setInterval(loop, 22);
    loop();
    }
}
canvas.addEventListener("click", function (e) {
    getMousePosition(canvas, e);
    makeBullets();

});

function musicStart() {

    mySound.play();
}
function musicStop() {
    mySound.pause();
}