import Position from './position.js'
import Player from './player.js'
import GameMap from './map.js'
import Character from './character.js'
import Obstacle from './obstacle.js'
import PlayerBot from './playerbot.js'
import MOVEMENTS from './MOVEMENTS.js'
import Interactable from './interactable.js'

class Game{

    map;
    player;
    playerBot;
    mapObserver = [];
    status;
    interact;
    bots;

    constructor(playerName, npcName){

        this.status = 'init';
        this.player = new Player(playerName);
        this.playerBot = new PlayerBot(npcName);
        this.bots = [];
    }

    createMapItem(itemNumber, position){
        let mapItem = null;
        
        if (itemNumber === 2){
            mapItem = new Character(position);
            this.player.character = mapItem;
        }else if(itemNumber === 1){
            mapItem = new Obstacle(position);
        }else if(itemNumber === 3){
            let bot = new PlayerBot('name');
            mapItem = new Character(position);
            bot.character = mapItem;
            this.bots.push(bot);
        }else if(itemNumber === 4){
            mapItem = new Interactable(position);
            this.interact = mapItem;
        }
        return mapItem;
    }
    
    loadMap(map){
        this.map = new GameMap(10,10);
    
        for (let row = 0; row < map.length; row++) {
            for (let column = 0; column < map[row].length; column++) {
                const itemNumber = map[row][column];
                if (!itemNumber) continue;
                const position = new Position(column, row);
                const mapItem = this.createMapItem(itemNumber, position);
                if (!mapItem) continue;
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

            if (object === game.interact){
                if (game.interact.action()){
                    game.changeScene()
                }
            }
        }

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