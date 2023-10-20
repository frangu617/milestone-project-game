import { ctx, canvas,} from "./game.js";
import { player } from "./player.js";
let intervalInMilliseconds = 3000;
export let enemyIcon = new Image();
enemyIcon.src = "assets/pngs/orangeTriangle.png";
export let enemies = [];
//code refactore from user Rembrandt at https://www.html5gamedevs.com/topic/21551-spawning-enemies/
export function renderenemy() {
    for (let i = 0; i < enemies.length; i++) {
        let enemyArr = enemies[i];

        ctx.drawImage(enemyIcon, enemyArr.x, enemyArr.y, enemyArr.width, enemyArr.height);
        moveEnemy(enemyArr);
    }
}
//code refactored from https://forum.wickeditor.com/t/how-do-you-make-enemies-move-toward-you/1378
export function moveEnemy(enemy) {

    let xDistance = player.x - enemy.x;
    let yDistance = player.y - enemy.y;

    let speed = .03;
    enemy.x += xDistance * speed;
    enemy.y += yDistance * speed;

}
export function spawnEnemy() {
    if (enemies.length < 100) {
        let enemy = {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            position: [this.x, this.y],
        }

        console.log('Spawn a new enemy!');

        const canvasPadding = 20; // Padding to ensure enemies spawn outside the canvas

        // Generate a random number to determine the spawn location (0 for left/right, 1 for top/bottom)
        const spawnLocation = Math.floor(Math.random() * 4); // 0, 1, 2, or 3

        if (spawnLocation === 0) {
            // Left side
            enemy.x = -enemy.width - canvasPadding;
            enemy.y = Math.random() * canvas.height;
        } else if (spawnLocation === 1) {
            // Right side
            enemy.x = canvas.width + canvasPadding;
            enemy.y = Math.random() * canvas.height;
        } else if (spawnLocation === 2) {
            // Top side
            enemy.x = Math.random() * canvas.width;
            enemy.y = -enemy.height - canvasPadding;
        } else {
            // Bottom side
            enemy.x = Math.random() * canvas.width;
            enemy.y = canvas.height + canvasPadding;
        }


        //Create a new Enemy instance and use above coordinates to place it in a random spot.

        if (intervalInMilliseconds > 500) {
            intervalInMilliseconds -= 100;
        }
        else if (intervalInMilliseconds <= 500) {
            intervalInMilliseconds = 500;
        }

        else if (intervalInMilliseconds <= 0) {
            intervalInMilliseconds = 10;
        }
        // Push your new enemy in the enemies array so you can render them all at once in the draw loop.
        enemies.push(enemy);
        setTimeout(spawnEnemy, intervalInMilliseconds);
    }
}