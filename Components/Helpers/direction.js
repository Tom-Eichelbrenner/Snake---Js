import {endGame, snake} from "../variables";

const directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    90: "up",
    81: "left",
    83: "down",
    68: "right"
};
const move = () => (
    addEventListener("keydown", function (event) {
        if (endGame) {
            location.reload();
        }
        const newDirection = directions[event.keyCode];
        if (newDirection !== undefined) {
            snake.setDirection(newDirection);
        }
    })
)
export default move