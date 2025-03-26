function showSettings() {
    document.getElementById("settingsModal").classList.remove("hidden");
    isPaused = true;
    document.getElementById("bgm").pause();
}

function hideSettings() {
    document.getElementById("settingsModal").classList.add("hidden");
    updateConfig();
    if (!gameOver) {
        isPaused = false;
        document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
        draw();
        move();
    }
}

document.getElementById("settingsButton").addEventListener("click", showSettings);
document.getElementById("closeSettings").addEventListener("click", hideSettings);

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

document.getElementById("themeSelect").addEventListener("change", () => {
    const theme = document.getElementById("themeSelect").value;
    const selectedTheme = themes[theme];
    document.getElementById("snakeColor").value = selectedTheme.snakeColor;
    document.getElementById("foodColor").value = selectedTheme.foodColor;
    document.getElementById("starColor").value = selectedTheme.starColor;
    updateConfig();
    draw();
});