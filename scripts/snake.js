let snake = [];
let dx = 0;
let dy = 0;

function initSnake(tileCountX, tileCountY) {
    snake = [{x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2)}];
    dx = 0;
    dy = 0;
}

function moveSnake(food, extraFoods, star, doubleNextFood) {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    return {head, updatedSnake: snake, updatedDoubleNextFood: doubleNextFood};
}

function resetSnake(tileCountX, tileCountY) {
    initSnake(tileCountX, tileCountY);
}