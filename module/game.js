import Position from "./position.js";
import GameMap from "./map.js";
import Player from "./player.js";
import Character from "./character.js";
import Obstacle from "./obstacle.js";

export default class Game{
    observers = [];
    map = new GameMap(10, 10);
    player = new Player();

    loadMap(map){
        for (let row = 0; row < map.length; row++) {
            let elementNumber = null;
            var rowColumns = map[row];
            for (let column = 0; column < rowColumns.length; column++) {
                elementNumber = rowColumns[column];

                if (elementNumber === 0) continue;
                let mapElement = null;
                let position = new Position(column, row);
                if (elementNumber === 2 && this.player.character === null){
                    mapElement = new Character(position);
                    this.player.character = mapElement;
                }else if (elementNumber === 1 ){
                    mapElement = new Obstacle(position);
                }
                this.map.add(mapElement);
            }   
        }
    }

    setPlayerEvents(){
        document.addEventListener('keydown', event => {
            this.player.moveCharacter(this.map, event.key);
            this.notifyObservers();
        });
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(){
        this.observers.forEach(o => o.update(this.map));
    }
}
