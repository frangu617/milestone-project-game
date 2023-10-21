import{ctx, canvas, updateScore} from "./game.js";
import{player, playerDeath} from "./player.js";
import{enemies} from "./enemies.js";
import{bullets} from "./bulltets.js";
function collisionCheckRectRect(rectOne, rectTwo) { //taken from https://stackoverflow.com/questions/8017541/javascript-canvas-collision-detection comment from "thatOneGuy"

    var x1 = rectOne.x, y1 = rectOne.y, height1 = rectOne.height, width1 = rectOne.width;
    var x2 = rectTwo.x, y2 = rectTwo.y, height2 = rectTwo.height, width2 = rectTwo.width;

    return x1 < x2 + width2 && x2 < x1 + width1 && y1 < y2 + height2 && y2 < y1 + height1;
}

export function enemyPlayerColl() {
    for (let i = 0; i < enemies.length; i++) {
        if (collisionCheckRectRect(player, enemies[i])) {
            let mySound = new Audio('./assets/audio/death.wav');
            mySound.volume = 0.3;
            mySound.playbackRate = 1.2;
            mySound.play();
            
            playerDeath();
        }
    }
}

export function enemyBulletColl() {
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
            if (collisionCheckRectRect(enemies[i], bullets[j])) {
                let mySound = new Audio('./assets/audio/hit.wav');
                mySound.volume = 0.2;
                mySound.playbackRate = 1.5;
                mySound.play();
                
                console.log(`boom goes the dynamite!`)
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                updateScore(1)
                
            }
        }
    }
}
