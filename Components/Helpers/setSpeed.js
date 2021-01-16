import {score} from "./score";

export function setSpeed() {
    const start = 70;
    const end = 16;
    const maxScore = 50;
    const delay = Math.floor(Math.max(start - (start - end) * score / maxScore, end))
    return delay;
}