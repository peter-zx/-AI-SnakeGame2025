const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const scoreDisplay = document.getElementById("score");
const speedSlider = document.getElementById("speedSlider");
const snakeColorPicker = document.getElementById("snakeColor");
const foodColorPicker = document.getElementById("foodColor");
const bgm = document.getElementById("bgm");
const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");

const gridSize = 20;
const tileCount = 20;
let snake = [{x: 10, y: 10}];
let food = spawnFood();
let dx = 0;
let dy = 0;
let score = 0;
let gameOver = false;
let isPaused = false;
let gameLoopId = null;
let speed = parseInt(speedSlider.value);

function spawnFood() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    food = spawnFood();
    dx = 0;
    dy = 0;
    score = 0;
    gameOver = false;
    isPaused = false;
    scoreDisplay.textContent = "得分: 0";
    pauseButton.textContent = "暂停";
    bgm.play();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#eee";
    for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
            ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }

    ctx.fillStyle = snakeColorPicker.value;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = foodColorPicker.value;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    if (snake.length === 1 && dx === 0 && dy === 0 && !gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("贪吃蛇", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "20px Arial";
        ctx.fillText("按开始游戏", canvas.width / 2, canvas.height / 2 + 20);
    } else if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("游戏结束!", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "20px Arial";
        ctx.fillText(`得分: ${score} 按开始重玩`, canvas.width / 2, canvas.height / 2 + 20);
    } else if (isPaused) {
        ctx.fillStyle = "gray";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("暂停中", canvas.width / 2, canvas.height / 2);
    }
}

function move() {
    if (gameOver || isPaused) return;

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = `得分: ${score}`;
        food = spawnFood();
        eatSound.play();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        bgm.pause();
        gameOverSound.play();
    }

    draw();
    if (!gameOver && !isPaused) {
        speed = parseInt(speedSlider.value);
        gameLoopId = setTimeout(move, speed);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    else if (event.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    else if (event.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
    else if (event.key === " " && !gameOver) { togglePause(); }
});

startButton.addEventListener("click", () => {
    if (gameLoopId) clearTimeout(gameLoopId);
    resetGame();
    draw();
    move();
});

pauseButton.addEventListener("click", togglePause);

function togglePause() {
    if (gameOver) return;
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "继续" : "暂停";
    if (isPaused) bgm.pause();
    else bgm.play();
    draw();
    if (!isPaused) move();
}

draw();