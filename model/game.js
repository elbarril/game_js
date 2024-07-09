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
    
    
    createMapItem(item){
        let mapItems = [];
        let mapItem= null;
        
        function iterationItem(item) {
            let positions = [];
            for (let pos of item["position"]) {
                let x = pos.x;
                let y = pos.y;
                positions.push(new Position(x, y));
            }
            return positions;
        }

        if (item["player"]){
            let x = item["position"]["x"];
            let y =item["position"]["y"];
            let position = new Position(x,y);
            mapItem = new Character(position);
            this.player.character = mapItem;
            mapItems.push(mapItem);

        }else if(item["limit"]){
            const positions = iterationItem(item);
            for (let position of positions) {
                mapItem = new Obstacle(position);
                mapItems.push(mapItem);
            }

        }else if(item["bot"]){
            const positions = iterationItem(item);
            for (let position of positions) {
                mapItem = new Character(position);
                let bot = new PlayerBot('name');
                bot.character = mapItem;
                this.bots.push(bot);
                mapItems.push(mapItem);
            }
            

        }else if(item["door"]){
            mapItem = new Interactable(item["position"]);
            this.interact = mapItem;
            mapItems.push(mapItem);
        }
        
        return mapItems;
    
    }
    
    loadMap(x,y, items){
        this.map = new GameMap(x,y);
        
        for (let index = 0; index < items.length; index++) {
            const mapItems = this.createMapItem(items[index]);
            console.log(mapItems);
            if (!mapItems) continue;
            mapItems.forEach(mapItem => {
                this.map.add(mapItem);
            });
            
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