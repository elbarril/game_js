import Position from './position.js'

const UP = "ArrowUp";
const DOWN = "ArrowDown";
const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";

const MOVEMENTS = {
    [UP]: new Position(0, -1),
    [DOWN]: new Position(0, 1),
    [LEFT]: new Position(-1, 0),
    [RIGHT]: new Position(1, 0)
}

export default MOVEMENTS;