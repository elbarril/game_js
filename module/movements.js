import {
    UP,
    DOWN,
    LEFT,
    RIGHT
} from "./position.js";

export const UP_KEY = "ArrowUp"
export const DOWN_KEY = "ArrowDown"
export const LEFT_KEY = "ArrowLeft"
export const RIGHT_KEY = "ArrowRight"

const DIRECTIONS = [UP, DOWN, LEFT, RIGHT]

const MOVEMENTS = {
    [UP_KEY]: UP,
    [DOWN_KEY]: DOWN,
    [LEFT_KEY]: LEFT,
    [RIGHT_KEY]: RIGHT
}

function getRandomDirection(){
    return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
}

export default MOVEMENTS;

export {getRandomDirection};