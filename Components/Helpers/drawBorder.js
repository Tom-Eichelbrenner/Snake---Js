import {blockSize, ctx, height, width} from "../variables";

export function drawBorder() {
    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.fillRect(0, 0, width, blockSize)
    ctx.fillRect(0, height - blockSize, width, blockSize)
    ctx.fillRect(0, 0, blockSize, height)
    ctx.fillRect(width - blockSize, 0, blockSize, height)
}