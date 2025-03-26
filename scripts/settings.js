document.getElementById("settingsButton").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.remove("hidden");
    isPaused = true;
    document.getElementById("bgm").pause();
});

document.getElementById("closeSettings").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.add("hidden");
    updateConfig();
    resetGame(); // 重置游戏以适配新网格
    if (!gameOver) {
        isPaused = false;
        document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
        draw();
        move();
    }
});

document.getElementById("themeSelect").addEventListener("change", () => {
    const theme = document.getElementById("themeSelect").value;
    const selectedTheme = themes[theme];
    document.getElementById("snakeColor").value = selectedTheme.snakeColor;
    document.getElementById("foodColor").value = selectedTheme.foodColor;
    document.getElementById("starColor").value = selectedTheme.starColor;
    updateConfig();
    draw();
});

document.getElementById("gridSizeSelect").addEventListener("change", () => {
    updateConfig();
    resetGame(); // 网格变化后重置游戏
    draw();
});

document.getElementById("doubleLength").addEventListener("click", () => {
    const currentLength = snake.length;
    for (let i = 0; i < currentLength; i++) snake.push({...snake[snake.length - 1]});
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw();
    move();
});

document.getElementById("addFood").addEventListener("click", () => {
    for (let i = 0; i < 5; i++) extraFoods.push(spawnFood(tileCountX, tileCountY));
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw();
    move();
});

document.getElementById("doubleNext").addEventListener("click", () => {
    doubleNextFood = true;
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw();
    move();
});

document.getElementById("closeGameOver").addEventListener("click", () => {
    document.getElementById("gameOverModal").classList.add("hidden");
});