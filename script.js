const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10; // 한 칸의 크기
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 10};
let dx = 1; // x 방향 이동
let dy = 0; // y 방향 이동
let score = 0; // 점수 추가

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

    // 음식 그리기
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // 뱀 그리기
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++; // 점수 증가
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    } else {
        snake.pop();
    }

    // 벽 충돌 처리
        if (head.x < 0 || head.x * gridSize >= canvas.width || head.y < 0 || head.y * gridSize >= canvas.height ) {
            alert("Game Over!");
            snake = [{x: 10, y: 10}];
            food = {x: 15, y: 10};
            dx = 1;
            dy = 0;
            score = 0;
            return;
        }
    //자기 몸 충돌 처리
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                alert("Game Over!");
                snake = [{x: 10, y: 10}];
                food = {x: 15, y: 10};
                dx = 1;
                dy = 0;
                score = 0;
                return;
            }
        }

}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

function gameLoop() {
    moveSnake();
    draw();
    setTimeout(gameLoop, 100); // 100ms마다 반복
}

gameLoop();
