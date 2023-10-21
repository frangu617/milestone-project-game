import{ctx, canvas, isItPaused} from "./game.js";
let pauseIcon = new Image();
pauseIcon.src = "assets/pngs/pause.png";
let posx = 200;
let posy = -200;
let pauseObj={
    x:posx,
    y:posy,
    width:400,
    height:200
}
export function renderPause() {
  
    ctx.drawImage(pauseIcon, posx, posy, 400, 200);
    
}

export function movePausedIn(){
    posy = 200;
}
export function movePausedOut(){
    posy = -200;

}