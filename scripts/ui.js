function showSettings() {
    const modal = document.getElementById("settingsModal");
    modal.classList.remove("hidden");
}

function hideSettings() {
    const modal = document.getElementById("settingsModal");
    modal.classList.add("hidden");
    updateConfig();
}

function showGameOver() {
    const modal = document.getElementById("gameOverModal");
    document.getElementById("finalScore").textContent = `最终得分: ${score}`;
    modal.classList.remove("hidden");
}

function hideGameOver() {
    const modal = document.getElementById("gameOverModal");
    modal.classList.add("hidden");
}

document.getElementById("settingsButton").addEventListener("click", showSettings);
document.getElementById("closeSettings").addEventListener("click", hideSettings);
document.getElementById("closeGameOver").addEventListener("click", hideGameOver);

document.getElementById("doubleLength").addEventListener("click", () => {
    const currentLength = snake.length;
    for (let i = 0; i < currentLength; i++) {
        snake.push({...snake[snake.length - 1]});
    }
    document.getElementById("starOptions").classList.add("hidden");
    isPaused = false;
    draw();
    move();
});

document.getElementById("addFood").addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
        const newFood = spawnFood();
        extraFoods.push(newFood);
    }
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