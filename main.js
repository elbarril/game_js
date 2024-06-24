import Game from './model/game.js'
import GameView from './view/gameview.js'

var playerName = 'Player';

document.addEventListener("DOMContentLoaded", () => {
    //while (!playerName){
    //    playerName = prompt('Ingresa tu nombre');
    //}
    let game = new Game(playerName);
    let view = new GameView();

    fetch('data.json').then(response => {
        return response.json();
    }).then(data =>{
        game.loadMap(data);
        game.setPlayerControls();
        game.addMapObserver(view);

        view.setTitle(game.player.name);
        view.renderMap(game.map.positions);

    })

});