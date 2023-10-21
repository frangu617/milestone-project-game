import{ctx, canvas, isItPaused} from "./game.js";
import { player } from "./player.js";

export let bullets = [];

let bulletIcon = new Image();

bulletIcon.src = "assets/pngs/purpleTriStar.png";

export function makeBullets() {

    if (isItPaused) {
        return
    }
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
            clickPosition: { x: mouseClick.x, y: mouseClick.y },
            keepGoing: true

        }
        console.log("PEW!");
        bullets.push(bulletObject);


    }
}

export function renderBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bulletArr = bullets[i];

        ctx.drawImage(bulletIcon, bulletArr.x, bulletArr.y, bulletArr.width, bulletArr.height);
        moveBullets(bulletArr);
    }
}

export function deleteBullets() {
    bullets.shift();
}

export let mouseClick;


setInterval(deleteBullets, 3000);

export function getMousePosition(canvas, event) {

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    mouseClick = { x, y };
}
export function moveBullets(bullet) {
    let m, b;
    let direction = {
        x: bullet.clickPosition.x - bullet.x,
        y: bullet.clickPosition.y - bullet.y
    }
    m = (bullet.y - bullet.clickPosition.y) / (bullet.x - bullet.clickPosition.x);
    b = bullet.y - m * bullet.x;

    // Normalize the direction vector to make the bullet move at a constant speed. Got this from a comment from Exca on https://www.html5gamedevs.com/topic/36416-bullet-go-on-mouse-position/
    const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    direction.x /= length;
    direction.y /= length;

    // Set the bullet's speed.
    bullet.speed = 5;
    bullet.velocity.x = direction.x * bullet.speed;
    bullet.velocity.y = direction.y * bullet.speed;


    // Update the bullet's position in the direction of the mouse click.
    bullet.x += bullet.velocity.x;
    bullet.y += bullet.velocity.y;
}
