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

class Game{

    map;
    player;
    mapObserver = [];
    status;
    interact;
    bots;

    
    constructor(playerName){
        
        this.status = 'init';
        this.player = new Player(playerName);
        this.bots = [];
    }
    
    createPlayer(player){
        let position = this.createPosition(player.position)
        let playerCharacter = new Character(position);

        if (player.type === "player"){
            this.player.character = playerCharacter;

        }else if(player.type === "bot"){
            let bot = new PlayerBot('name');
            bot.character = playerCharacter;
            this.bots.push(bot);
        }
        return playerCharacter;

    }

    createMapItem(item){
        let mapItem= null;
        let position = this.createPosition(item.position);

        if(item.type === "limit"){
            mapItem = new Obstacle(position);

        }else if(item.type === "door"){
            mapItem = new Door(position);
            this.interact = mapItem;
        }
        
        return mapItem;
    
    }
    
    createPosition(position){
        let x = position.x;
        let y = position.y;
        return new Position(x,y)
    }

    loadMap(x,y, items, players){
        this.map = new GameMap(x,y);
        
        for (let index in items) {
            const item = items[index];
            for (let positonIndex in item.positions){
                const position = item.positions[positonIndex]
                const mapItem = this.createMapItem({"type":item.type, "position": position});
                this.map.add(mapItem);
            }
        }

        for (let index = 0; index < players.length; index++) {
            const player = this.createPlayer(players[index]);
            this.map.add(player)
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
                if (game.interact.doAction()){
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