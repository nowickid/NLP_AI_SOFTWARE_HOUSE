const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const restartButton = document.getElementById('restart-button');

const GRID_SIZE = 20;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

let snake;
let food;
let direction;
let score;
let highScore;
let isPaused;
let gameOver;
let gameLoop;
let gameSpeed;

function init() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
    ];
    direction = 'right';
    score = 0;
    isPaused = false;
    gameOver = false;
    gameSpeed = 100;

    // Load high score from localStorage
    highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreElement.textContent = highScore;

    scoreElement.textContent = score;
    restartButton.style.display = 'none';

    generateFood();
    gameLoop = setInterval(main, gameSpeed);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE))
    };

    // Ensure food doesn't spawn on the snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function update() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        if (score % 5 === 0) {
            gameSpeed -= 10;
            clearInterval(gameLoop);
            gameLoop = setInterval(main, gameSpeed);
        }
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x * GRID_SIZE >= CANVAS_WIDTH || head.y < 0 || head.y * GRID_SIZE >= CANVAS_HEIGHT) {
        gameOver = true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            break;
        }
    }
}

function handleKeyPress(event) {
    const key = event.key;

    if (key === ' ') {
        isPaused = !isPaused;
        return;
    }

    const currentDirection = direction;
    if (key === 'ArrowUp' && currentDirection !== 'down') {
        direction = 'up';
    } else if (key === 'ArrowDown' && currentDirection !== 'up') {
        direction = 'down';
    } else if (key === 'ArrowLeft' && currentDirection !== 'right') {
        direction = 'left';
    } else if (key === 'ArrowRight' && currentDirection !== 'left') {
        direction = 'right';
    }
}

function resetGame() {
    clearInterval(gameLoop);
    init();
}

function main() {
    if (gameOver) {
        clearInterval(gameLoop);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
        restartButton.style.display = 'block';
        return;
    }

    if (isPaused) {
        return;
    }

    update();
    checkCollision();
    draw();
}

document.addEventListener('keydown', handleKeyPress);
restartButton.addEventListener('click', resetGame);

init();
