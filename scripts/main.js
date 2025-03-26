document.getElementById("startButton").addEventListener("click", () => {
    if (gameLoopId) clearTimeout(gameLoopId);
    resetGame();
    document.getElementById("pauseButton").textContent = "暂停";
    document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
    draw();
    move();
});

document.getElementById("pauseButton").addEventListener("click", () => {
    if (gameOver || !document.getElementById("starOptions").classList.contains("hidden")) return;
    isPaused = !isPaused;
    document.getElementById("pauseButton").textContent = isPaused ? "继续" : "暂停";
    if (isPaused) document.getElementById("bgm").pause();
    else document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
    draw();
    if (!isPaused) move();
});

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (key === config.keyMap.up && dy === 0) { dx = 0; dy = -1; }
    else if (key === config.keyMap.down && dy === 0) { dx = 0; dy = 1; }
    else if (key === config.keyMap.left && dx === 0) { dx = -1; dy = 0; }
    else if (key === config.keyMap.right && dx === 0) { dx = 1; dy = 0; }
    else if (event.key === " " && !gameOver) {
        if (!document.getElementById("starOptions").classList.contains("hidden")) return;
        isPaused = !isPaused;
        document.getElementById("pauseButton").textContent = isPaused ? "继续" : "暂停";
        if (isPaused) document.getElementById("bgm").pause();
        else document.getElementById("bgm").play().catch(e => console.error("背景音乐播放失败:", e));
        draw();
        if (!isPaused) move();
    }
});

// 初始绘制
draw();