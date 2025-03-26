let food = null;
let star = null;
let extraFoods = [];
let score = 0;
let gameOver = false;
let isPaused = false;
let gameLoopId = null;
let foodEaten = 0;
let doubleNextFood = false;

function resetGame() {
    const tileCountX = document.getElementById("gameCanvas").width / config.gridSize;
    const tileCountY = document.getElementById("gameCanvas").height / config.gridSize;
    resetSnake(tileCountX, tileCountY);
    food = spawnFood(tileCountX, tileCountY);
    star = null;
    extraFoods = [];
    score = 0;
    gameOver = false;
    isPaused = false;
    foodEaten = 0;
    doubleNextFood = false;
    document.getElementById("score").textContent = "0";
}

function gameLoop() {
    if (gameOver || isPaused) return;

    const tileCountX = document.getElementById("gameCanvas").width / config.gridSize;
    const tileCountY = document.getElementById("gameCanvas").height / config.gridSize;
    const {head, updatedSnake} = moveSnake(food, extraFoods, star, doubleNextFood);
    snake = updatedSnake;

    const collisionResult = checkCollision(head, tileCountX, tileCountY, snake, food, extraFoods, star, score, foodEaten, doubleNextFood);
    score = collisionResult.updatedScore;
    foodEaten = collisionResult.updatedFoodEaten;
    food = collisionResult.updatedFood;
    extraFoods = collisionResult.updatedExtraFoods;
    star = collisionResult.updatedStar;
    doubleNextFood = collisionResult.updatedDoubleNextFood;
    gameOver = collisionResult.gameOver;
    isPaused = collisionResult.isPaused;

    draw(config, snake, food, extraFoods, star, tileCountX, tileCountY, isPaused, gameOver, dx, dy);

    if (!gameOver && !isPaused) {
        gameLoopId = setTimeout(gameLoop, config.speed);
    }
}