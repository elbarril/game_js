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

const DIRECTION_KEYS = [UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY]

const MOVEMENTS = {
    [UP_KEY]: UP,
    [DOWN_KEY]: DOWN,
    [LEFT_KEY]: LEFT,
    [RIGHT_KEY]: RIGHT
}

function getRandomDirectionKey(){
    return DIRECTION_KEYS[Math.floor(Math.random() * DIRECTION_KEYS.length)];
}

export default MOVEMENTS;

export {getRandomDirectionKey};