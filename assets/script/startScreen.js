import { ctx, canvas, started } from "./game.js";

let startIcon = new Image();
startIcon.src = "assets/pngs/title.png";
startIcon.width = 400;
startIcon.height = 100;
let posx = 100;


export function renderGameStart() {

   
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = "black";
   ctx.font = "80px Arial";
   ctx.fillText(`Survive!`, posx-60, 100);
   ctx.font = "30px Arial";
   ctx.fillText(`Press "Q" to start`, posx, 200);
   ctx.font = "30px Arial";
   ctx.fillText(`Use WASD or the Arrow keys to move`, posx, 300);   
   ctx.fillText(`Click where you want to shoot`, posx, 400);
   ctx.fillText(`Press P or Esc to pause`, posx, 500);

}

export function moveGameStartOut() {
   posx = -800;
}

export function moveGameStartIn() {
   posx = 100;
}