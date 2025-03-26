const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tileCountX = canvas.width / config.gridSize;
let tileCountY = canvas.height / config.gridSize;
let snake = [{x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2)}];
let food = spawnFood(tileCountX, tileCountY);
let star = null;
let extraFoods = [];
let dx = 0;
let dy = 0;
let score = 0;
let gameOver = false;
let isPaused = false;
let gameLoopId = null;
let foodEaten = 0;
let doubleNextFood = false;

function resetGame() {
    tileCountX = canvas.width / config.gridSize;
    tileCountY = canvas.height / config.gridSize;
    snake = [{x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2)}];
    food = spawnFood(tileCountX, tileCountY);
    star = null;
    extraFoods = [];
    dx = 0;
    dy = 0;
    score = 0;
    gameOver = false;
    isPaused = false;
    foodEaten = 0;
    doubleNextFood = false;
    document.getElementById("score").textContent = "0";
}

function draw() {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ccc";
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            ctx.strokeRect(i * config.gridSize, j * config.gridSize, config.gridSize, config.gridSize);
        }
    }

    ctx.fillStyle = config.snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * config.gridSize, segment.y * config.gridSize, config.gridSize - 2, config.gridSize - 2);
    });

    ctx.fillStyle = config.foodColor;
    ctx.fillRect(food.x * config.gridSize, food.y * config.gridSize, config.gridSize - 2, config.gridSize - 2);

    extraFoods.forEach(extra => {
        ctx.fillStyle = config.foodColor;
        ctx.fillRect(extra.x * config.gridSize, extra.y * config.gridSize, config.gridSize - 2, config.gridSize - 2);
    });

    if (star) {
        ctx.fillStyle = config.starColor;
        ctx.beginPath();
        ctx.moveTo(star.x * config.gridSize + config.gridSize / 2, star.y * config.gridSize);
        ctx.lineTo(star.x * config.gridSize + config.gridSize, star.y * config.gridSize + config.gridSize);
        ctx.lineTo(star.x * config.gridSize, star.y * config.gridSize + config.gridSize / 3);
        ctx.lineTo(star.x * config.gridSize + config.gridSize, star.y * config.gridSize + config.gridSize / 3);
        ctx.lineTo(star.x * config.gridSize, star.y * config.gridSize + config.gridSize);
        ctx.closePath();
        ctx.fill();
    }

    if (snake.length === 1 && dx === 0 && dy === 0 && !gameOver) {
        ctx.fillStyle = "#333";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("贪吃蛇", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "24px Arial";
        ctx.fillText("按开始游戏", canvas.width / 2, canvas.height / 2 + 20);
    } else if (isPaused && document.getElementById("starOptions").classList.contains("hidden") &&
               document.getElementById("settingsModal").classList.contains("hidden")) {
        ctx.fillStyle = "gray";
        ctx.font = "40px Arial";
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
        foodEaten += 1;
        document.getElementById("score").textContent = score;
        if (doubleNextFood) {
            const currentLength = snake.length - 1;
            for (let i = 0; i < currentLength; i++) snake.push({...snake[snake.length - 1]});
            doubleNextFood = false;
        }
        food = spawnFood(tileCountX, tileCountY);
        document.getElementById("eatSound").play().catch(e => console.error("吃食物音效播放失败:", e));
        if (foodEaten % 5 === 0) star = spawnStar(tileCountX, tileCountY);
    } else if (extraFoods.some(f => f.x === head.x && f.y === head.y)) {
        score += 10;
        extraFoods = extraFoods.filter(f => f.x !== head.x || f.y !== head.y);
        document.getElementById("score").textContent = score;
        document.getElementById("eatSound").play().catch(e => console.error("吃食物音效播放失败:", e));
    } else if (star && head.x === star.x && head.y === star.y) {
        star = null;
        isPaused = true;
        document.getElementById("starOptions").classList.remove("hidden");
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        document.getElementById("bgm").pause();
        document.getElementById("gameOverSound").play().catch(e => console.error("结束音效播放失败:", e));
        document.getElementById("finalScore").textContent = `最终得分: ${score}`;
        document.getElementById("gameOverModal").classList.remove("hidden");
    }

    draw();
    if (!gameOver && !isPaused) {
        gameLoopId = setTimeout(move, config.speed);
    }
}