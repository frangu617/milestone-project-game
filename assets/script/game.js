let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let gameUI = canvas.getContext("2d");

let score = 0;

gameUI.font = "10px Arial";
gameUI.fillText("Score: 0", 10, 10);

// Create a square object

function update() {

}

function updateScore() {
    gameUI.clearRect(10, 0, canvas.width - 10, 10);
    score++
    // Set the font and draw the new score
    gameUI.font = "10px Arial";
    gameUI.fillText(`Score: ${score}`, 10, 10);
}
// Start the game loop
setInterval(update, 100);