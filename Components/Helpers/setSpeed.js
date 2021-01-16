import {score} from "./score";

export function setSpeed() {
    const start = 70;
    const end = 30;
    const maxScore = 150;
    return Math.floor(Math.max(start - (start - end) * score / maxScore, end));
}