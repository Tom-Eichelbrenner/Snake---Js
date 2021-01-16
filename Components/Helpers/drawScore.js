import {score} from "./score";
import {blockSize, ctx} from "../variables";

export function drawScore() {
    ctx.font = "18px Monospace";
    ctx.fillStyle = "#1d1d1d";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Score : ${score}`, blockSize, blockSize);
}