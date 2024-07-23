import Game from './model/game.js'
import GameView from './view/gameview.js'

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game();
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
        game.setMap(x,y);
        game.setPlayer("player");
        game.setPlayers(players);
        game.setMapItems(items);
        game.setPlayerControls();
        game.addMapObserver(view);

        view.setTitle(game.status);
        view.renderMap(game.map.positions);

    })

});