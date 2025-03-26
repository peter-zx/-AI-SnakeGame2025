function checkCollision(head, tileCountX, tileCountY, snake, food, extraFoods, star, score, foodEaten, doubleNextFood) {
    let updatedScore = score;
    let updatedFoodEaten = foodEaten;
    let updatedFood = food;
    let updatedExtraFoods = [...extraFoods];
    let updatedStar = star;
    let updatedDoubleNextFood = doubleNextFood;
    let gameOver = false;
    let isPaused = false;

    if (head.x === food.x && head.y === food.y) {
        updatedScore += 10;
        updatedFoodEaten += 1;
        document.getElementById("score").textContent = updatedScore;
        if (updatedDoubleNextFood) {
            const currentLength = snake.length - 1;
            for (let i = 0; i < currentLength; i++) snake.push({...snake[snake.length - 1]});
            updatedDoubleNextFood = false;
        }
        updatedFood = spawnFood(tileCountX, tileCountY);
        document.getElementById("eatSound").play().catch(e => console.error("吃食物音效播放失败:", e));
        if (updatedFoodEaten % 5 === 0) updatedStar = spawnStar(tileCountX, tileCountY);
    } else if (updatedExtraFoods.some(f => f.x === head.x && f.y === head.y)) {
        updatedScore += 10;
        updatedExtraFoods = updatedExtraFoods.filter(f => f.x !== head.x || f.y !== head.y);
        document.getElementById("score").textContent = updatedScore;
        document.getElementById("eatSound").play().catch(e => console.error("吃食物音效播放失败:", e));
    } else if (updatedStar && head.x === updatedStar.x && head.y === updatedStar.y) {
        updatedStar = null;
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

    return {
        updatedScore,
        updatedFoodEaten,
        updatedFood,
        updatedExtraFoods,
        updatedStar,
        updatedDoubleNextFood,
        gameOver,
        isPaused
    };
}