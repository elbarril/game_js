import Player from "./player.js";
import {getRandomDirection} from "./MOVEMENTS.js";

class PlayerBot extends Player{

    movementIntervalId= null;

    constructor(name, character){
        super(name);
        this.character = character;
    }

    moveCharacter(map){
        const randomDirection = getRandomDirection();
        super.moveCharacter(map, randomDirection);
    }

}

export default PlayerBot;