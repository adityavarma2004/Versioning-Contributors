const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let score = 0;
let dx = box; // Initial movement along x-axis
let dy = 0;
let changingDirection = false;
const obstacles = [{x: 100, y: 100}, {x: 200, y: 200}, {x: 300, y: 300}];

function randomFood() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
}

function drawFood() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x, food.y, box, box);
}


function drawSnake() {
    snake.forEach(segment => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Generate a random color
        ctx.fillStyle = randomColor;
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = "#000000"; // Black color for obstacles
        ctx.fillRect(obstacle.x, obstacle.y, box, box);
    });
}


function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        randomFood();
    } else {
        snake.pop();
    }

    if (head.x >= canvas.width) {
        head.x = 0;
    } else if (head.x < 0) {
        head.x = canvas.width - box;
    }

    if (head.y >= canvas.height) {
        head.y = 0;
    } else if (head.y < 0) {
        head.y = canvas.height - box;
    }

    if (checkCollision()) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true; // Snake touches the border
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true; // Snake collides with itself
        }
    }
    return false;
}



function main() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();

    setTimeout(main, 100);
}

document.addEventListener("keydown", event => {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.key;
    if (keyPressed === "ArrowUp" && dy === 0) {
        dy = -box;
        dx = 0;
    }
    if (keyPressed === "ArrowDown" && dy === 0) {
        dy = box;
        dx = 0;
    }
    if (keyPressed === "ArrowLeft" && dx === 0) {
        dy = 0;
        dx = -box;
    }
    if (keyPressed === "ArrowRight" && dx === 0) {
        dy = 0;
        dx = box;
    }
});

randomFood();
main();
