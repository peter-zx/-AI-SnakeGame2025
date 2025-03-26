const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;
let snake = [{x: tileCountX / 2, y: tileCountY / 2}];
let food = spawnFood();
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

function spawnFood() {
    return {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
    };
}

function spawnStar() {
    return {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
    };
}

function resetGame() {
    snake = [{x: tileCountX / 2, y: tileCountY / 2}];
    food = spawnFood();
    star = null;
    extraFoods = [];
    dx = 0;
    dy = 0;
    score = 0;
    gameOver = false;
    isPaused = false;
    foodEaten = 0;
    doubleNextFood = false;
    document.getElementById("score").textContent = "得分: 0";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#eee";
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }

    ctx.fillStyle = config.snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = config.foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    extraFoods.forEach(extra => {
        ctx.fillStyle = config.foodColor;
        ctx.fillRect(extra.x * gridSize, extra.y * gridSize, gridSize - 2, gridSize - 2);
    });

    if (star) {
        ctx.fillStyle = config.starColor;
        ctx.beginPath();
        ctx.moveTo(star.x * gridSize + gridSize / 2, star.y * gridSize);
        ctx.lineTo(star.x * gridSize + gridSize, star.y * gridSize + gridSize);
        ctx.lineTo(star.x * gridSize, star.y * gridSize + gridSize / 3);
        ctx.lineTo(star.x * gridSize + gridSize, star.y * gridSize + gridSize / 3);
        ctx.lineTo(star.x * gridSize, star.y * gridSize + gridSize);
        ctx.closePath();
        ctx.fill();
    }

    if (snake.length === 1 && dx === 0 && dy === 0 && !gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("贪吃蛇", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "24px Arial";
        ctx.fillText("按开始游戏", canvas.width / 2, canvas.height / 2 + 20);
    } else if (isPaused && document.getElementById("starOptions").classList.contains("hidden")) {
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
        document.getElementById("score").textContent = `得分: ${score}`;
        if (doubleNextFood) {
            const currentLength = snake.length - 1;
            for (let i = 0; i < currentLength; i++) snake.push({...snake[snake.length - 1]});
            doubleNextFood = false;
        }
        food = spawnFood();
        document.getElementById("eatSound").play().catch(e => console.error("吃食物音效播放失败:", e));
        if (foodEaten % 5 === 0) star = spawnStar();
    } else if (extraFoods.some(f => f.x === head.x && f.y === head.y)) {
        score += 10;
        extraFoods = extraFoods.filter(f => f.x !== head.x || f.y !== head.y);
        document.getElementById("score").textContent = `得分: ${score}`;
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
        showGameOver();
    }

    draw();
    if (!gameOver && !isPaused) {
        gameLoopId = setTimeout(move, config.speed);
    }
}