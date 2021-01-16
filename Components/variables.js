import {Snake} from "./Classes/snake";
import {Apple} from "./Classes/apple";
import move from "./Helpers/direction";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height

/*
    Définition de la grille
 */

const blockSize = 10;
const widthInBlock = width / blockSize;
const heightInBlock = height / blockSize;

let endGame = false;
const setEndGame = () => {
    endGame = true;
    return endGame
};
export default setEndGame

const snake = new Snake();
const apple = new Apple();
move();

export {
    ctx,
    width,
    height,
    widthInBlock,
    heightInBlock,
    blockSize,
    apple,
    endGame,
    snake
}