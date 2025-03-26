const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function draw(config, snake, food, extraFoods, star, tileCountX, tileCountY, isPaused, gameOver, dx, dy) {
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