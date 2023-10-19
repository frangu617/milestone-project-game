import { ctx } from "./game.js";
var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    height: 20,
    width: 20,
    score: 0,
    imag: "assets/pngs/blueSquare.png",
};
let playerIcon = new Image();
// Function to render the player
export function renderplayer() {

    ctx.drawImage(playerIcon, player.x, player.y, player.width, player.height);

}

export function keydown(e) {
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
export function keyup(e) {
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