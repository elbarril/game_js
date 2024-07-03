import Player from "./player.js";
import {getRandomDirection} from "./MOVEMENTS.js";

class PlayerBot extends Player{

    movementIntervalId= null;

    moveCharacter(map){
        const randomDirection = getRandomDirection();
        super.moveCharacter(map, randomDirection);
    }

}

export default PlayerBot;