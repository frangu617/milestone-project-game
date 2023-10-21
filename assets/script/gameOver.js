import { ctx, canvas } from "./game.js";
import { player, revive } from "./player.js";
import { emptyEnemies } from "./enemies.js";
import { emptyBullets } from "./bulltets.js";
export let restartIcon = new Image();
restartIcon.src = "assets/pngs/restart.png";
let posx = 200;
let posy = -200;

export function renderGameOver() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "80px Arial";
    ctx.fillText(`Game Over`, posx, posy);
    ctx.font = "40px Arial";
    ctx.fillText(`Score: ${player.score}`, posx + posx / 2 + 30, posy + 100);
    ctx.fillText(`High Score: ${localStorage.getItem("hiScore")}`, posx + posx / 2 -65, posy + 150);
    ctx.fillText(`Press Q to start over`, posx + 30, posy + 250);
}

export function moveGameOverIn() {
    posy = 200;
}
export function moveGameOverOut() {
    posy = -200;

}


export function restart() {
    revive();    
    emptyEnemies();
    emptyBullets();
}