import {
    UP,
    DOWN,
    LEFT,
    RIGHT
} from "/module/position.js";

export const UP_KEY = "ArrowUp"
export const DOWN_KEY = "ArrowDown"
export const LEFT_KEY = "ArrowLeft"
export const RIGHT_KEY = "ArrowRight"

const MOVEMENTS = {
    [UP_KEY]: UP,
    [DOWN_KEY]: DOWN,
    [LEFT_KEY]: LEFT,
    [RIGHT_KEY]: RIGHT
}

export default MOVEMENTS;