import Position from "./position.js";
import GameMap from "./map.js";
import Player from "./player.js";
import Bot from "./bot.js";
import Character from "./character.js";
import BotCharacter from "./botcharacter.js";
import Obstacle from "./obstacle.js";
import Door from "./door.js";
import {default as MOVEMENTS, getRandomDirectionKey} from "./movements.js";

const MAP_OBJECTS = {
    "obstacle": Obstacle,
    "door": Door,
    "character": Character,
    "botcharacter": BotCharacter
};

export default class Game{
    observers = [];
    map;
    player;
    botSet = [];
    status = 'init';

    init(data){
        this.setMap(data.map);
        
        data.statics.forEach(staticData => {
            let staticObject = this.setMapObject(staticData);
            this.map.addElement(staticObject);
            staticData?.action && staticObject.setAction(staticData.action);
        });

        let player = this.setPlayer(data.player);
        this.map.addElement(player.character);

        data.bots.forEach(botData => {
            let bot = this.setBot(botData);
            this.map.addElement(bot.character);
            botData?.action && bot.character.setAction(botData.action);
        });
    }

    setMap(mapData){
        let width = mapData.width;
        let height = mapData.height;
        this.map = new GameMap(width, height);
        return this.map;
    }

    setMapObject(mapObjectData, objectName=null){
        let objectId = mapObjectData.id;
        let x = mapObjectData.position.x;
        let y = mapObjectData.position.y;
        let position = new Position(x, y);
        let staticType = MAP_OBJECTS[objectId];
        let mapObject = objectName ? new staticType(objectName, position) : new staticType(position);
        return mapObject;
    }

    setCharacter(characterData){
        return this.setMapObject(characterData, characterData.name);
    }

    setPlayer(playerData){
        let playerCharacter = this.setCharacter(playerData);
        this.player = new Player(playerCharacter.name, playerCharacter);
        this.setPlayerControls();
        return this.player;
    }

    setBot(botData){
        let botCharacter = this.setCharacter(botData);
        let bot = new Bot(botCharacter.name, botCharacter);
        this.botSet.push(bot);
        this.setBotMoveEvent(bot);
        return bot;
    }

    getObjectInFrontPlayer() {
        if (this.status !== 'playing')
            return;
        let nextPosition = this.player.character.getNextPosition();
        if (!this.map.isValidPosition(nextPosition))
            return;
        return this.map.getElementByPosition(nextPosition);
    }

    objectIsBot(object) {
        return this.botSet.some(bot => bot.character === object && bot.character.action);
    }

    botSay(bot, say) {
        alert(say.replace("%name%", bot.name));
    }

    playerSay(say) {
        let response;
        let selected;
        say.forEach((answer, answerKey) => {
            if (selected) return;
            selected = confirm(answer.replace("%name%", this.player.character.name));
            if (selected)
                response = answerKey;
        });
        return response;
    }

    runDialog(object) {
        let response;
        object.action.talks.forEach(talk => {
            talk.say && this.botSay(object, talk.say[response ?? 0]);
            talk.answer && (response = this.playerSay(talk.answer));
        });
        return response;
    }

    moveCharacter(character, direction_key){
        if (this.status !== 'playing')
            return;
        let direction = MOVEMENTS[direction_key];
        if (character.direction !== direction)
            return character.rotate(direction);
        let nextPosition = character.getNextPosition();
        if (this.map.getElementByPosition(nextPosition)) return;
        this.map.removeElement(character);
        character.move();
        this.map.addElement(character);
    }

    playerInteract(object){
        let response = 0;
        if (this.objectIsBot(object) && object.action.talks)
            response = this.runDialog(object);
        else
            response = confirm(`Want you ${object.action.action}?`) ? 0 : 1;
        object.action.next && alert(object.action.next[response]);
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
                this.moveCharacter(this.player.character, event.key);
            else if (event.key === 'p')
                (this.status === 'paused') ? this.play() : this.pause();
            else if (event.key === ' ') {
                let object = this.getObjectInFrontPlayer();
                object && object.action && this.playerInteract(object)
            }
            this.notifyObservers();
        });
    }

    setBotMoveEvent(bot){
        if (bot.movementEventId)
            return;
        let movementEventId = setInterval(()=>{
            this.moveCharacter(bot.character, getRandomDirectionKey());
            this.notifyObservers();
        }, bot.character.velocity * 1000);
        bot.movementEventId = movementEventId;
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(){
        this.observers.forEach(o => o.update(this));
    }
}
