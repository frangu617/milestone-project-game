import { renderplayer, keydown, keyup } from "./player.js";
import {player, keys}from "./player.js";
import { renderenemy,  spawnEnemy,  } from "./enemies.js";
import { renderBullets, getMousePosition, makeBullets, } from "./bulltets.js";
import {enemyBulletColl, enemyPlayerColl} from "./collision.js";
//this code was refactored from https://www.educative.io/answers/how-to-make-a-simple-platformer-using-javascript


export let intervalInMilliseconds = 3000;

function rendercanvas() {
    ctx.fillStyle = 'aquamarine';
    ctx.fillRect(0, 0, 800, 800);
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
    enemyPlayerColl();
    enemyBulletColl();
    // requestAnimationFrame(loop);
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
}
export let canvas = document.getElementById("gameCanvas");
export let ctx = canvas.getContext("2d");
ctx.canvas.height = 800;
ctx.canvas.width = 800;
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
// Calling loop every 22 milliseconds to update the frame
setInterval(loop, 22);
loop();

canvas.addEventListener("click", function (e) {
    getMousePosition(canvas, e);
    makeBullets();
});
