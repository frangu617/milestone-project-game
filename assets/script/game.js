let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let gameUI = canvas.getContext("2d");

gameUI.font = "10px Consolas";
gameUI.fillText("Score: 0", 10, 10);

// Create a square object
