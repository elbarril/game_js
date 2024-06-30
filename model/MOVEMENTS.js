import Position from './position.js'

const UP = "ArrowUp";
const DOWN = "ArrowDown";
const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";

const UP_DIRECTION = new Position(0, -1)
const DOWN_DIRECTION = new Position(0, 1)
const LEFT_DIRECTION = new Position(-1, 0)
const RIGHT_DIRECTION = new Position(1, 0)

const MOVEMENTS = {
    [UP]: UP_DIRECTION,
    [DOWN]: DOWN_DIRECTION,
    [LEFT]: LEFT_DIRECTION,
    [RIGHT]: RIGHT_DIRECTION
}

function getRandomDirection() {
    const directions = Object.values(MOVEMENTS);
    return directions[Math.floor(Math.random()*directions.length)];
}

export default MOVEMENTS;

export {UP_DIRECTION, DOWN_DIRECTION, LEFT_DIRECTION, RIGHT_DIRECTION, getRandomDirection};