import {Block} from "./block";
import {heightInBlock, widthInBlock} from "../variables";

export class Apple {
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