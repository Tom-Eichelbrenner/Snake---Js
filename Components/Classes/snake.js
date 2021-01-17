import {Block} from "./block";
import {addScore} from "../Helpers/score";
import {gameOver} from "../Helpers/gameOver";
import {apple, heightInBlock, widthInBlock} from "../variables";

export class Snake {
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
        if (newDirection === "right") {
            if (this.direction === "left") {
                this.direction = "left";
            } else {
                this.direction = newDirection;
            }
        } else if (newDirection === "left") {
            if (this.direction === "right") {
                this.direction = "right";
            } else {
                this.direction = "left";
            }
        } else if (newDirection === "up") {
            if (this.direction === "down") {
                this.direction = "down";
            } else {
                this.direction = "up";
            }
        } else if (newDirection === "down") {
            if (this.direction === "up") {
                this.direction = "up";
            } else {
                this.direction = "down";
            }
        }
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
            addScore();
            apple.move();
        } else {
            this.segments.pop();
        }
    }

}