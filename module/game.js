import Position from "./position.js";
import GameMap from "./map.js";
import Player from "./player.js";
import Bot from "./bot.js";
import Character from "./character.js";
import Obstacle from "./obstacle.js";
import MOVEMENTS from "./movements.js";

const STATICS = {
    "obstacle": Obstacle
};

export default class Game{
    observers = [];
    map;
    player;
    botSet = [];
    status = 'init';

    setMap(mapData){
        let width = mapData["width"];
        let height = mapData["height"];
        let staticsData = mapData["statics"];
        this.map = new GameMap(width, height);
        staticsData.forEach(staticData => {
            let staticType = STATICS[staticData["id"]];
            let x = staticData["position"]["x"];
            let y = staticData["position"]["y"];
            let position = new Position(x, y);
            if (!this.map.isValidPosition(position))
                return;
            let mapObject = new staticType(position);
            this.map.addElement(mapObject);
        });
    }

    setPlayer(playerData){
        let name = playerData["name"];
        let x = playerData["position"]["x"];
        let y = playerData["position"]["y"];
        let position = new Position(x, y);
        if (!this.map.isValidPosition(position))
            return
        let playerCharacter = new Character(name, position);
        this.player = new Player(name, playerCharacter);
        this.player.character = playerCharacter;
        this.map.addElement(playerCharacter);
    }

    setBots(botsData){
        botsData.forEach(botData => {
            let name = botData["name"];
            let x = botData["position"]["x"];
            let y = botData["position"]["y"];
            let position = new Position(x, y);
            if (!this.map.isValidPosition(position))
                return
            let botCharacter = new Character(name, position);
            let bot = new Bot(name, botCharacter);
            bot.character = botCharacter;
            this.botSet.push(bot);
            this.map.addElement(botCharacter); 
        });
    }

    botMove(bot){
        if (bot.movementEventId) return;
        let movementEventId = setInterval(()=>{
            if (this.status !== 'playing')
                return;
            bot.moveCharacter(this.map);
            this.notifyObservers();
        }, bot.character.velocity * 1000);
        bot.movementEventId = movementEventId;
    }

    playerMove(direction_key){
        if (this.status !== 'playing')
            return;
        let direction = MOVEMENTS[direction_key];
        this.player.moveCharacter(this.map, direction);
    }

    playerInteract(){
        if (this.status !== 'playing') return;
        let nextPosition = this.player.character.getNextPosition();
        if (!this.map.isValidPosition(nextPosition))
            return;
        let nextPositionObject = this.map.getElementByPosition(nextPosition);
        if (this.botSet.some(bot => bot.character === nextPositionObject))
            nextPositionObject.sayHello();
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
            else if (event.key === ' ')
                this.playerInteract()
            this.notifyObservers();
        });
    }

    setBotsActions(){
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
