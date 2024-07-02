import Player from "./player.js";
import {getRandomDirection} from "./MOVEMENTS.js";

class PlayerBot extends Player{

    movementIntervalId= null;

    moveCharacter(map){
        const randomDirection = getRandomDirection();
        super.moveCharacter(map, randomDirection);
    }

    interactWithPlayer(player){

        document.addEventListener('keydown', event => {
            let nextX = player.character.position.x + player.character.direction.x;
            let nextY = player.character.position.y + player.character.direction.y;
            if (nextX === this.character.position.x && nextY === this.character.position.y && event.key === 'e'){
                this.character.say('Hi');
            }
            
        });
    
    }

}

export default PlayerBot;