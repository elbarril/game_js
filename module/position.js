export default class Position{
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export const LEFT = new Position(-1, 0);
export const RIGHT = new Position(1, 0);
export const UP = new Position(0, -1);
export const DOWN = new Position(0, 1);
