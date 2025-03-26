// 主题配色（含背景颜色，低饱和度）
const themes = {
    soft: {
        snakeColor: "#A3BFFA",    // 柔和蓝
        foodColor: "#F9A8D4",     // 柔和粉
        starColor: "#FDE68A",     // 柔和黄
        backgroundColor: "#E0F7FA" // 柔和背景
    },
    dark: {
        snakeColor: "#4B5EAA",    // 暗蓝
        foodColor: "#9B2D5F",     // 暗红
        starColor: "#D4A017",     // 暗黄
        backgroundColor: "#263238" // 暗背景
    },
    pastel: {
        snakeColor: "#B2DFDB",    // 淡青
        foodColor: "#F8BBD0",     // 淡粉
        starColor: "#FFF9C4",     // 淡黄
        backgroundColor: "#ECEFF1" // 淡背景
    }
};

// 网格密度选项
const gridSizes = {
    large: 30,  // 32x18
    medium: 20, // 48x27
    small: 15   // 64x36
};

// 配置对象
const config = {
    gridSize: gridSizes.large, // 默认大网格
    speed: 100,
    snakeColor: themes.soft.snakeColor,
    foodColor: themes.soft.foodColor,
    starColor: themes.soft.starColor,
    backgroundColor: themes.soft.backgroundColor,
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
    const theme = document.getElementById("themeSelect").value;
    const selectedTheme = themes[theme];
    config.snakeColor = document.getElementById("snakeColor").value || selectedTheme.snakeColor;
    config.foodColor = document.getElementById("foodColor").value || selectedTheme.foodColor;
    config.starColor = document.getElementById("starColor").value || selectedTheme.starColor;
    config.backgroundColor = selectedTheme.backgroundColor;
    config.gridSize = gridSizes[document.getElementById("gridSizeSelect").value];
    document.querySelector(".game-container").style.backgroundColor = config.backgroundColor;
}