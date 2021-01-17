import {saveBestScore} from "./Helpers/saveBestScore";
import {drawScore} from "./Helpers/drawScore";
import {drawBestScore} from "./Helpers/drawBestScore";
import {drawBorder} from "./Helpers/drawBorder";
import {setSpeed} from "./Helpers/setSpeed";
import {apple, ctx, endGame, height, snake, width} from "./variables";
import move from "./Helpers/direction";

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
    console.log(snake)
    snake.draw();
    apple.draw();
    drawBorder();
    setTimeout(() => play = requestAnimationFrame(interval), setSpeed())
}
let play = requestAnimationFrame(interval);