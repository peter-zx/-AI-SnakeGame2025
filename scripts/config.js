// 配置对象
const config = {
    speed: 100,
    snakeColor: "#00FF00",
    foodColor: "#FF0000",
    starColor: "#FFFF00",
    keyMap: {
        up: "W",
        down: "S",
        left: "A",
        right: "D"
    }
};

// 更新配置的函数
function updateConfig() {
    config.speed = parseInt(document.getElementById("speedSlider").value);
    config.snakeColor = document.getElementById("snakeColor").value;
    config.foodColor = document.getElementById("foodColor").value;
    config.starColor = document.getElementById("starColor").value;
    config.keyMap.up = document.getElementById("keyUp").value.toUpperCase();
    config.keyMap.down = document.getElementById("keyDown").value.toUpperCase();
    config.keyMap.left = document.getElementById("keyLeft").value.toUpperCase();
    config.keyMap.right = document.getElementById("keyRight").value.toUpperCase();
}