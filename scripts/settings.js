document.getElementById("settingsButton").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.remove("hidden");
    isPaused = true;
    document.getElementById("bgm").pause();
});

document.getElementById("closeSettings").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.add("hidden");
    updateConfig();
    resetGame();
    if (!gameOver) {
        isPaused = false;
        document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
        document.querySelector(".controls").classList.add("hidden");
        draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
        gameLoop();
    }
});

document.getElementById("themeSelect").addEventListener("change", () => {
    const theme = document.getElementById("themeSelect").value;
    const selectedTheme = themes[theme];
    document.getElementById("snakeColor").value = selectedTheme.snakeColor;
    document.getElementById("foodColor").value = selectedTheme.foodColor;
    document.getElementById("starColor").value = selectedTheme.starColor;
    updateConfig();
    draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
});

document.getElementById("gridSizeSelect").addEventListener("change", () => {
    updateConfig();
    resetGame();
    draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
});

document.getElementById("doubleLength").addEventListener("click", () => {
    const currentLength = snake.length;
    for (let i = 0; i < currentLength; i++) snake.push({...snake[snake.length - 1]});
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
    gameLoop();
});

document.getElementById("addFood").addEventListener("click", () => {
    const tileCountX = document.getElementById("gameCanvas").width / config.gridSize;
    const tileCountY = document.getElementById("gameCanvas").height / config.gridSize;
    for (let i = 0; i < 5; i++) extraFoods.push(spawnFood(tileCountX, tileCountY));
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw(config, snake, food, extraFoods, star, tileCountX, tileCountY, isPaused, gameOver, dx, dy);
    gameLoop();
});

document.getElementById("doubleNext").addEventListener("click", () => {
    doubleNextFood = true;
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
    gameLoop();
});

document.getElementById("closeGameOver").addEventListener("click", () => {
    document.getElementById("gameOverModal").classList.add("hidden");
    document.querySelector(".controls").classList.remove("hidden");
});