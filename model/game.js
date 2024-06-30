import Position from './position.js'
import Player from './player.js'
import GameMap from './map.js'
import Character from './character.js'
import Obstacle from './obstacle.js'
import PlayerBot from './playerbot.js'
import MOVEMENTS from './MOVEMENTS.js'
import Interactable from './interactable.js'

class Game{

    map = new GameMap(10,10);
    player;
    playerBot;
    mapObserver = [];
    status;
    interact = new Interactable([7,8]);

    constructor(playerName, npcName){

        this.status = 'init';
        this.player = new Player(playerName);
        this.playerBot = new PlayerBot(npcName);

    }

    createMapItem(itemNumber, position){
        let mapItem = null;
        
        if (itemNumber === 2){
            mapItem = new Character(position);
            this.player.character = mapItem;
        }else if(itemNumber === 1){
            mapItem = new Obstacle(position);
        }else if(itemNumber === 3){
            mapItem = new Character(position);
            this.playerBot.character = mapItem;  
        }else if(itemNumber === 4){
            mapItem = new Interactable(position);
        }
        return mapItem;
    }

    loadMap(map){
    
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
            game.playerBot.interactWithPlayer(game.player);
            game.interact.interactPlayer(game.player);
            game.notifyMapObserver();
        }

        function pause(game){
            game.status = 'paused';
        }

        function play(game){
            game.play();
        }

        document.addEventListener('keydown', event => {
            if (MOVEMENTS.hasOwnProperty(event.key)) playerMoveCharacter(this, event.key);
            else if (event.key === 'p') pause(this);
            else if(event.key === 'Enter') play(this);
        });
    }
    
    setPlayerBotActions() {
        if (this.playerBot.movementIntervalId) return;
        const movementIntervalId = setInterval(() => {
            if (this.status != 'playing') return;
            this.playerBot.moveCharacter(this.map);
            this.notifyMapObserver();
        }, 1000);

        this.playerBot.movementIntervalId = movementIntervalId;
    }

    addMapObserver(mapObserver){
        this.mapObserver = mapObserver;
    }

    notifyMapObserver(){
        this.mapObserver.updateMap(this.map.positions);
    }

    play(){
        this.status = 'playing';
        this.setPlayerBotActions();
    }

}

export default Game;