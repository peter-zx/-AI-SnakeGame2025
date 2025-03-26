const config = {
    gridSize: 30, // 调整为 30，确保 960x540 被整除
    speed: 100,
    snakeColor: "#A3BFFA", // 默认柔和主题
    foodColor: "#F9A8D4",
    starColor: "#FDE68A",
    keyMap: {
        up: "W",
        down: "S",
        left: "A",
        right: "D"
    }
};

// 主题配色（低饱和度）
const themes = {
    soft: { snakeColor: "#A3BFFA", foodColor: "#F9A8D4", starColor: "#FDE68A" }, // 柔和
    dark: { snakeColor: "#4B5EAA", foodColor: "#9B2D5F", starColor: "#D4A017" }, // 暗色
    pastel: { snakeColor: "#B2DFDB", foodColor: "#F8BBD0", starColor: "#FFF9C4" } // 淡彩
};

function updateConfig() {
    config.speed = parseInt(document.getElementById("speedSlider").value);
    const theme = document.getElementById("themeSelect").value;
    const selectedTheme = themes[theme];
    config.snakeColor = document.getElementById("snakeColor").value || selectedTheme.snakeColor;
    config.foodColor = document.getElementById("foodColor").value || selectedTheme.foodColor;
    config.starColor = document.getElementById("starColor").value || selectedTheme.starColor;
    config.keyMap.up = document.getElementById("keyUp").value.toUpperCase();
    config.keyMap.down = document.getElementById("keyDown").value.toUpperCase();
    config.keyMap.left = document.getElementById("keyLeft").value.toUpperCase();
    config.keyMap.right = document.getElementById("keyRight").value.toUpperCase();
}