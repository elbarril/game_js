import Position from './position.js'
import Player from './player.js'
import GameMap from './map.js'
import Character from './character.js'
import Obstacle from './obstacle.js'
import MOVEMENTS from './MOVEMENTS.js'

class Game{

    map = new GameMap(10,10);
    player;
    mapObserver = [];

    constructor(playerName){

        this.player = new Player(playerName);

    }

    loadMap(map){
    
        for (let row = 0; row < map.length; row++) {
            for (let column = 0; column < map[row].length; column++) {
                const itemNumber = map[row][column];
                if (!itemNumber) continue;
                let mapItem = null;
                var position = new Position(column, row);
                if (itemNumber ===2){
                    mapItem = new Character(position);
                    this.player.character = mapItem;
                }else if(itemNumber === 1){
                    mapItem = new Obstacle(position);
                }
                if (mapItem) this.map.add(mapItem);
            }   
        }
    }

    setPlayerControls(){
        document.addEventListener('keydown', event => {
            if (!MOVEMENTS.hasOwnProperty(event.key)) return;
            const direction = MOVEMENTS[event.key];
            this.player.moveCharacter(this.map, direction);
            this.notifyMapObserver();
        });
    }

    addMapObserver(mapObserver){
        this.mapObserver = mapObserver;
    }

    notifyMapObserver(){
        this.mapObserver.updateMap(this.map.positions);
    }

}

export default Game;