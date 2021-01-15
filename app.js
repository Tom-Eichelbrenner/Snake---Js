const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height

/*
    Définition de la grille
 */

const blockSize = 10;
const widthInBlock = width / blockSize;
const heightInBlock = height / blockSize;

let endGame = false;

let score = 0;
const bestScore = localStorage.getItem("bestScore") || 0;
/*
    Les blocks
 */

class Block {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    drawSquare(color) {
        const x = this.col * blockSize;
        const y = this.row * blockSize;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    drawCircle(color) {
        const centerX = (this.col * blockSize) + blockSize / 2;
        const centerY = (this.row * blockSize) + blockSize / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, (blockSize / 2), 0, Math.PI * 2, false)
        ctx.fill();
    }

    collide(block) {
        return this.col === block.col && this.row === block.row;
    }
}

class Snake {
    constructor() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5),
        ];
        this.direction = "right";
    }

    draw() {
        this.segments.map(segment => segment.drawSquare("#BADA55"))
    }

    setDirection(newDirection) {
        this.direction = newDirection
    }

    checkCollision(head) {
        const lefCollision = head.col === 0;
        const topCollision = head.row === 0;
        const rightCollision = head.col === widthInBlock - 1;
        const leftCollision = head.row === heightInBlock - 1;

        const wallCollision = lefCollision || topCollision || rightCollision || leftCollision;

        let selfCollision = false;
        this.segments.map(segment => {
            if (head.collide(segment)) {
                selfCollision = true;
            }
        })

        return wallCollision || selfCollision;
    }

    move() {
        const head = this.segments[0];
        let newHead;

        if (this.direction === "right") {
            newHead = new Block(head.col + 1, head.row)
        } else if (this.direction === "left") {
            newHead = new Block(head.col - 1, head.row)
        } else if (this.direction === "up") {
            newHead = new Block(head.col, head.row - 1)
        } else if (this.direction === "down") {
            newHead = new Block(head.col, head.row + 1)
        }

        if (this.checkCollision(newHead)) {
            gameOver();
            return;
        }

        this.segments.unshift(newHead);
        if (newHead.collide(apple.position)) {
            score++;
            apple.move();
        } else {
            this.segments.pop();
        }
    }

}

const snake = new Snake();

class Apple {
    constructor() {
        this.position = new Block(
            Math.floor(Math.random() * (widthInBlock - 2) + 1),
            Math.floor(Math.random() * (heightInBlock - 2) + 1),
        );
    }

    draw() {
        this.position.drawCircle("#FB1");
    }

    move() {
        const randomCol = Math.floor(Math.random() * (widthInBlock - 2) + 1);
        const randomRow = Math.floor(Math.random() * (heightInBlock - 2) + 1);

        this.position = new Block(randomCol, randomRow);
    }
}

const apple = new Apple();

/*
    Les fonctions
 */

// Dessin du plateau
function drawBorder() {
    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.fillRect(0, 0, width, blockSize)
    ctx.fillRect(0, height - blockSize, width, blockSize)
    ctx.fillRect(0, 0, blockSize, height)
    ctx.fillRect(width - blockSize, 0, blockSize, height)
}

// Game Over
function gameOver() {
    ctx.font = "60px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
    endGame = true;
}

// Score

function drawScore() {
    ctx.font = "18px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Score : ${score}`, blockSize, blockSize);
}
function drawBestScore() {
    ctx.font = "18px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Best Score : ${bestScore}`, blockSize, blockSize * 3);
}

function saveBestScore() {
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
    }
}

// Speed

function setSpeed() {
    const start = 70;
    const end = 16;
    const maxScore = 50;
    const delay = Math.floor(Math.max(start - (start - end) * score / maxScore, end))
    console.log(delay);
    return delay;
}

/*
    Events
 */

const directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
};
addEventListener("keydown", function (event) {
    if (endGame) {
        location.reload();
    }
    const newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});

/*
    La boucle
 */

function interval() {
    if (endGame) {
        saveBestScore();
        cancelAnimationFrame(play);
        return;
    }
    ctx.clearRect(0, 0, width, height);
    drawScore();
    drawBestScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
    setTimeout(() => play = requestAnimationFrame(interval), setSpeed())
}

let play = requestAnimationFrame(interval);

