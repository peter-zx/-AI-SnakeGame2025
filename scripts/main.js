document.getElementById("startButton").addEventListener("click", () => {
    if (gameLoopId) clearTimeout(gameLoopId);
    resetGame();
    document.getElementById("pauseButton").textContent = "暂停";
    document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
    document.querySelector(".controls").classList.add("hidden");
    draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
    gameLoop();
});

document.getElementById("pauseButton").addEventListener("click", () => {
    if (gameOver || !document.getElementById("starOptions").classList.contains("hidden") ||
        !document.getElementById("settingsModal").classList.contains("hidden")) return;
    isPaused = !isPaused;
    document.getElementById("pauseButton").textContent = isPaused ? "继续" : "暂停";
    if (isPaused) {
        document.getElementById("bgm").pause();
        document.querySelector(".controls").classList.remove("hidden");
    } else {
        document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
        document.querySelector(".controls").classList.add("hidden");
    }
    draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
    if (!isPaused) gameLoop();
});

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (key === config.keyMap.up && dy === 0) { dx = 0; dy = -1; }
    else if (key === config.keyMap.down && dy === 0) { dx = 0; dy = 1; }
    else if (key === config.keyMap.left && dx === 0) { dx = -1; dy = 0; }
    else if (key === config.keyMap.right && dx === 0) { dx = 1; dy = 0; }
    else if (event.key === " " && !gameOver) {
        if (!document.getElementById("starOptions").classList.contains("hidden") ||
            !document.getElementById("settingsModal").classList.contains("hidden")) return;
        isPaused = !isPaused;
        document.getElementById("pauseButton").textContent = isPaused ? "继续" : "暂停";
        if (isPaused) {
            document.getElementById("bgm").pause();
            document.querySelector(".controls").classList.remove("hidden");
        } else {
            document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
            document.querySelector(".controls").classList.add("hidden");
        }
        draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);
        if (!isPaused) gameLoop();
    }
});

// 初始化
updateConfig();
draw(config, snake, food, extraFoods, star, document.getElementById("gameCanvas").width / config.gridSize, document.getElementById("gameCanvas").height / config.gridSize, isPaused, gameOver, dx, dy);