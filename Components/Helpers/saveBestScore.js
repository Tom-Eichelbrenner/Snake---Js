import {bestScore, score} from "./score";

export function saveBestScore() {
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
    }
    console.log(score > "0");
}