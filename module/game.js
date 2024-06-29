import Position from "./position.js";
import GameMap from "./map.js";
import Player from "./player.js";
import Bot from "./bot.js";
import Character from "./character.js";
import Obstacle from "./obstacle.js";
import Door from "./door.js";
import MOVEMENTS from "./movements.js";

const STATICS = {
    "obstacle": Obstacle,
    "door": Door
};

class Talk {
    say;
    answer;

    constructor (talkData) {
        this.say = talkData["say"];
        this.answer = talkData["answer"];
    }
}

class Action {
    next;

    constructor (actionData) {
        this.action = actionData["perform"];
        this.next = actionData["next"];
    }
}

class Dialog extends Action {
    talks = [];

    constructor(actionData) {
        super(actionData);
        actionData["dialog"].forEach(talkData => {
            this.talks.push(new Talk(talkData))
        });

    }
}

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
            if (staticData.hasOwnProperty("action") && staticData["action"].hasOwnProperty("perform")) {
                mapObject.action = new Action(staticData["action"]);
            }
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
            if (botData.hasOwnProperty("action")){
                botCharacter.action = botData["action"]["perform"] === "dialog" ? new Dialog(botData["action"]) : new Action(botData["action"]);
            }
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

    getObjectInFrontPlayer() {
        if (this.status !== 'playing') return;
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
                this.playerMove(event.key);
            else if (event.key === 'p')
                (this.status === 'paused') ? this.play() : this.pause();
            else if (event.key === ' ') {
                let object = this.getObjectInFrontPlayer();
                object && object.action && this.playerInteract(object)
            }
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
