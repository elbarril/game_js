import Position from "./position.js";
import GameMap from "./map.js";
import Player from "./player.js";
import Bot from "./bot.js";
import Character from "./character.js";
import Obstacle from "./obstacle.js";
import MOVEMENTS from "./movements.js";

const OBSTACLE_NUMBER = 1;
const PLAYER_NUMBER = 2;
const BOT_NUMBER = 3;

const MAP_ELEMENT_NUMBERS = [
    OBSTACLE_NUMBER,
    PLAYER_NUMBER,
    BOT_NUMBER
]

export default class Game{
    observers = [];
    map = new GameMap(10, 10);
    player = new Player();
    botSet = new Set();
    status = 'init';

    createMapObject(elementNumber, position){
        let mapElement = null;
        if (elementNumber === PLAYER_NUMBER && this.player.character === null){
            mapElement = new Character(position);
            this.player.character = mapElement;
        }else if (elementNumber === OBSTACLE_NUMBER){
            mapElement = new Obstacle(position);
        }else if (elementNumber === BOT_NUMBER){
            mapElement = new Character(position);
            let bot = new Bot();
            bot.character = mapElement;
            bot.character.velocity += Math.random();
            this.botSet.add(bot);
        }
        return mapElement;
    }

    loadMap(map){
        for (let row = 0; row < map.length; row++) {
            var rowColumns = map[row];
            for (let column = 0; column < rowColumns.length; column++) {
                let elementNumber = rowColumns[column];
                if (!elementNumber || !MAP_ELEMENT_NUMBERS.includes(elementNumber))
                    continue;
                let position = new Position(column, row);
                if (!this.map.isValidPosition(position))
                    continue;
                let mapElement = this.createMapObject(elementNumber, position);
                if (mapElement)
                    this.map.addElement(mapElement);
            }   
        }
    }

    botMove(bot){
        if (bot.movementEventId) return;
        let movementEventId = setInterval(()=>{
            if (this.status !== 'playing') return;
            bot.moveCharacter(this.map);
            this.notifyObservers();
        }, bot.character.velocity * 1000);
        bot.movementEventId = movementEventId;
    }

    playerMove(direction_key){
        if (this.status !== 'playing') return;
        let direction = MOVEMENTS[direction_key];
        this.player.moveCharacter(this.map, direction);
    }

    play(){
        this.status = 'playing';
        this.notifyObservers();
    }

    pause(){
        this.status = 'paused';
        this.notifyObservers();
    }

    setPlayerControls(){
        document.addEventListener('keydown', event => {
            if (MOVEMENTS.hasOwnProperty(event.key))
                this.playerMove(event.key);
            else if (event.key === 'p')
                (this.status === 'paused') ? this.play() : this.pause();
            this.notifyObservers();
        });
    }

    setBots(){
        this.botSet.forEach(bot => {
            this.botMove(bot);
        })

    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(){
        this.observers.forEach(o => o.update(this));
    }
}
