import {bestScore} from "./score";
import {blockSize, ctx} from "../variables";

export function drawBestScore() {
    ctx.font = "18px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Best Score : ${bestScore}`, blockSize, blockSize * 3);
}