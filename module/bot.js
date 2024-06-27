import Player from './player.js';
import {getRandomDirection} from './movements.js';

class Bot extends Player{
    movementEventId=null;

    moveCharacter(map){
        let direction = getRandomDirection();
        super.moveCharacter(map, direction);
    }

    toString(){
        return ":("
    }
}

export default Bot;