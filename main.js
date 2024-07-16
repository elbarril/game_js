import Game from './model/game.js'
import GameView from './view/gameview.js'

var playerName = 'Player';

document.addEventListener("DOMContentLoaded", () => {
    //while (!playerName){
    //    playerName = prompt('Ingresa tu nombre');
    //}
    let game = new Game(playerName, npcName);
    let view = new GameView();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sceneName = urlParams.get('name') ?? 'data';

    fetch(sceneName + '.json').then(response => {
        return response.json();
    }).then(data =>{
        let x = data.map.width;
        let y = data.map.height;
        let items = data.items;
        let players = data.players;
        game.loadMap(x,y, items, players);
        game.setPlayerControls();
        game.addMapObserver(view);

        view.setTitle(game.player.name);
        view.renderMap(game.map.positions);

    })

});