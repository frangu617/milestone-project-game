import { ctx, togglePaused } from "./game.js";

export var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    height: 20,
    width: 20,
    score: 0,
    imag: "assets/pngs/blueSquare.png",
    alive: true,
};
export var keys = {
    right: false,
    left: false,
    up: false,
    down: false,

};
export let playerIcon = new Image();
playerIcon.src = player.imag;
// Function to render the player
export function renderplayer() {
    if (player.alive) {
        ctx.drawImage(playerIcon, player.x, player.y, player.width, player.height);
    }
}

export function keydown(e) {
    // 37 is the code for thr left arrow key
    if (e.keyCode == 37 || e.keyCode == 65) {
        keys.left = true;
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39 || e.keyCode == 68) {
        keys.right = true;
    }
    // 38 is the code for the up arrow key
    if (e.keyCode == 38 || e.keyCode == 87) {
        keys.up = true;
    }
    // 40 is the code for the down arrow key
    if (e.keyCode == 40 || e.keyCode == 83) {
        keys.down = true;
    }
    if (e.keyCode == 80 || e.keyCode == 27) {
        togglePaused();
    }
}
// This function is called when the key is released
export function keyup(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
        keys.left = false;
    }
    if (e.keyCode == 39 || e.keyCode == 68) {
        keys.right = false;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {
        keys.up = false;
    }
    // 40 is the code for the down arrow key
    if (e.keyCode == 40 || e.keyCode == 83) {
        keys.down = false;
    }

}

export function playerDeath() {
    player.alive = false
}

export function revive() {
    player.score = 0;
    player.alive = true;
    player.x = 200;
    player.y = 200;
    player.x_v = 0;
    player.y_v = 0;
}