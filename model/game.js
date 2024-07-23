import Position from './position.js'
import Player from './player.js'
import GameMap from './map.js'
import Character from './character.js'
import Obstacle from './obstacle.js'
import PlayerBot from './playerbot.js'
import MOVEMENTS from './MOVEMENTS.js'
import Interactable from './interactable.js'

class Door extends Interactable{
    constructor(position){
        super(position);
        this.action = 'you wanna go?';
    }
    
    toString(){

        return 'door';
    }

}

class MapObjectCreator{
    
    static createCharacter(character){
        let position = MapObjectCreator.createPosition(character.position);
        return new Character(position);
    }

    static createObstacle(obstacle){
        let position = MapObjectCreator.createPosition(obstacle.position);
        return new Obstacle(position);
    }

    static createDoor(door){
        let position = MapObjectCreator.createPosition(door.position);
        return new Door(position);
    }
    
    static createMapItem(item){

        if(item.type === "limit"){
            return MapObjectCreator.createObstacle(item);

        }else if(item.type === "door"){
            return MapObjectCreator.createDoor(item)
        }
    }
    
    static createPosition(position){
        let x = position.x;
        let y = position.y;
        return new Position(x,y)
    }
}

class Game{

    map;
    player;
    mapObserver = [];
    status;
    bots;

    constructor(){
        
        this.status = 'init';
        this.bots = [];
    }
    
    setMap(width, height){
        this.map = new GameMap(width, height);
    }
    
    setPlayer(playerName){
        this.player = new Player(playerName);
    }

    setPlayerCharacter(character){
        this.player.character = MapObjectCreator.createCharacter(character);
        this.map.add(this.player.character);
    }

    setBot(name, character){
        let botCharacter = MapObjectCreator.createCharacter(character);
        let bot = new PlayerBot(name, botCharacter);
        this.map.add(bot.character);
        this.bots.push(bot);
    }

    setPlayers(players){
        for (let playerIndex in players){
            const player = players[playerIndex];
            if (player.type === "player"){
                this.setPlayerCharacter(player);
                
            }else if(player.type === "bot"){
                this.setBot("Bot" + (this.bots.length + 1),player);
            }
        }
    }

    setMapItems(items){
        if (!this.map) return;
        for (let index in items) {
            const item = items[index];

            for (let positonIndex in item.positions){
                const position = item.positions[positonIndex];
                let singleType = {"type":item.type, "position": position}
                const mapItem = MapObjectCreator.createMapItem(singleType);
                this.map.add(mapItem);
            }
        }
    }
    
    setPlayerControls(){

        function playerMoveCharacter(game, movementKey){
            if (game.status != 'playing') return;
            const direction = MOVEMENTS[movementKey];
            game.player.moveCharacter(game.map, direction);
            game.notifyMapObserver();
        }

        function pause(game){
            game.status = 'paused';
        }

        function play(game){
            game.play();
        }

        function interact(game){
            let nextX = game.player.character.position.x + game.player.character.direction.x;
            let nextY = game.player.character.position.y + game.player.character.direction.y;
            let object = game.map.get(nextY, nextX)
            if (game.bots.some(b => b.character === object)){
                object.say('Hi');
            }

            if (object.action){
                if (object.doAction()){
                    game.changeScene()
                }
            }
        }

        if (!this.player) return;
        document.addEventListener('keydown', event => {
            if (MOVEMENTS.hasOwnProperty(event.key)) playerMoveCharacter(this, event.key);
            else if (event.key === 'e') interact(this);
            else if (event.key === 'p') pause(this);
            else if(event.key === 'Enter') play(this);
        });
    }
    
    changeScene(){
        window.location.href = '/?name=scene2';
    }

    setPlayerBotActions(bot) {
        if (bot.movementIntervalId) return;
        const movementIntervalId = setInterval(() => {
            if (this.status != 'playing') return;
            bot.moveCharacter(this.map);
            this.notifyMapObserver();
        }, 1000*Math.random());

        bot.movementIntervalId = movementIntervalId;
    }

    addMapObserver(mapObserver){
        this.mapObserver = mapObserver;
    }

    notifyMapObserver(){
        this.mapObserver.updateMap(this.map.positions);
    }

    play(){
        this.status = 'playing';
        for (let index = 0; index < this.bots.length; index++) {
            this.setPlayerBotActions(this.bots[index]);
        }
    }

}

export default Game;