import MovableMapItem from './movablemapitem.js';
import {UP_DIRECTION, DOWN_DIRECTION, LEFT_DIRECTION, RIGHT_DIRECTION} from './MOVEMENTS.js';

class Character extends MovableMapItem{

    constructor(position, direction=UP_DIRECTION){
        super(position, direction);
    }

    say(message){
        alert(message);
    }

    toString(){

        if (this.direction === UP_DIRECTION) return 'UP';
        else if (this.direction === DOWN_DIRECTION) return 'DOWN';
        else if (this.direction === LEFT_DIRECTION) return 'LEFT';
        else if (this.direction === RIGHT_DIRECTION) return 'RIGHT';

    }

}

export default Character;