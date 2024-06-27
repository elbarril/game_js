import MapObject from './mapobject.js';
import {default as Position, UP} from './position.js';

class MovableMapObject extends MapObject {
    direction;
    velocity;

    constructor(position, direction=UP, velocity=1){
        super(position);
        this.direction = direction;
        this.velocity = velocity
    }

    move(){
        this.position = this.getNextPosition();
    }

    rotate(direction){
        this.direction = direction;
    }

    getNextPosition(){
        let nextX = this.position.x + this.direction.x;
        let nextY = this.position.y + this.direction.y;
        return new Position(nextX, nextY);
    }
}

export default MovableMapObject;