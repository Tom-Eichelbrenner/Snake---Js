import {ctx, height, width} from "../variables";

function gameOver() {
    ctx.font = "60px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
    endGame = true;
}

export {gameOver};