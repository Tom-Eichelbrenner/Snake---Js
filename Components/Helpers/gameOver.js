import setEndGame, {ctx, height, width} from "../variables";
import {endGame} from "../variables";

function gameOver() {
    ctx.font = "60px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
    setEndGame()
}

export {gameOver};