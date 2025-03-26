function spawnFood(tileCountX, tileCountY) {
    return {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
    };
}

function spawnStar(tileCountX, tileCountY) {
    return {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
    };
}