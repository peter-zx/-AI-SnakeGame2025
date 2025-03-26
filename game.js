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
const starOptions = document.getElementById("starOptions");
const doubleLengthBtn = document.getElementById("doubleLength");
const addFoodBtn = document.getElementById("addFood");
const doubleNextBtn = document.getElementById("doubleNext");

const gridSize = 20;
const tileCount = 20;
let snake = [{x: 10, y: 10}];
let food = spawnFood();
let star = null; // 五角星对象
let dx = 0;
let dy = 0;
let score = 0;
let gameOver = false;
let isPaused = false;
let gameLoopId = null;
let speed = parseInt(speedSlider.value);
let foodEaten = 0; // 吃食物计数
let doubleNextFood = false; // 下个食物长度翻倍效果

// 检查音频加载
bgm.onerror = () => console.error("背景音乐加载失败，请检查 assets/bgm.mp3");
eatSound.onerror = () => console.error("吃食物音效加载失败，请检查 assets/eat.mp3");
gameOverSound.onerror = () => console.error("结束音效加载失败，请检查 assets/gameover.mp3");

function spawnFood() {
    return {x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)};
}

function spawnStar() {
    return {x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)};
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    food = spawnFood();
    star = null;
    dx = 0;
    dy = 0;
    score = 0;
    gameOver = false;
    isPaused = false;
    foodEaten = 0;
    doubleNextFood = false;
    scoreDisplay.textContent = "得分: 0";
    pauseButton.textContent = "暂停";
    starOptions.classList.add("hidden");
    bgm.currentTime = 0;
    bgm.play().catch(e => console.error("背景音乐播放失败:", e));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制网格
    ctx.strokeStyle = "#eee";
    for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
            ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }

    // 绘制蛇
    ctx.fillStyle = snakeColorPicker.value;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // 绘制食物
    ctx.fillStyle = foodColorPicker.value;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // 绘制五角星
    if (star) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(star.x * gridSize + gridSize / 2, star.y * gridSize);
        ctx.lineTo(star.x * gridSize + gridSize, star.y * gridSize + gridSize);
        ctx.lineTo(star.x * gridSize, star.y * gridSize + gridSize / 3);
        ctx.lineTo(star.x * gridSize + gridSize, star.y * gridSize + gridSize / 3);
        ctx.lineTo(star.x * gridSize, star.y * gridSize + gridSize);
        ctx.closePath();
        ctx.fill();
    }

    // 绘制界面文字
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
    } else if (isPaused && !starOptions.classList.contains("hidden")) {
        // 五角星选择时不显示“暂停中”
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
        foodEaten += 1;
        scoreDisplay.textContent = `得分: ${score}`;
        if (doubleNextFood) {
            for (let i = 0; i < snake.length - 1; i++) snake.push(snake[snake.length - 1]);
            doubleNextFood = false;
        }
        food = spawnFood();
        eatSound.play().catch(e => console.error("吃食物音效播放失败:", e));
        if (foodEaten % 5 === 0) star = spawnStar();
    } else if (star && head.x === star.x && head.y === star.y) {
        star = null;
        isPaused = true;
        starOptions.classList.remove("hidden");
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        bgm.pause();
        gameOverSound.play().catch(e => console.error("结束音效播放失败:", e));
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
    if (gameOver || !starOptions.classList.contains("hidden")) return;
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "继续" : "暂停";
    if (isPaused) bgm.pause();
    else bgm.play().catch(e => console.error("背景音乐播放失败:", e));
    draw();
    if (!isPaused) move();
}

doubleLengthBtn.addEventListener("click", () => {
    const currentLength = snake.length;
    for (let i = 0; i < currentLength; i++) snake.push(snake[snake.length - 1]);
    starOptions.classList.add("hidden");
    isPaused = false;
    move();
});

addFoodBtn.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
        const newFood = spawnFood();
        ctx.fillStyle = foodColorPicker.value;
        ctx.fillRect(newFood.x * gridSize, newFood.y * gridSize, gridSize - 2, gridSize - 2);
    }
    starOptions.classList.add("hidden");
    isPaused = false;
    move();
});

doubleNextBtn.addEventListener("click", () => {
    doubleNextFood = true;
    starOptions.classList.add("hidden");
    isPaused = false;
    move();
});

// 初始绘制
draw();