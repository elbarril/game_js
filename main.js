import Game from "./module/game.js";
import View from "./module/view.js";

let game = new Game();
let view = new View();

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded.");
    fetch("data.json").then(response => {
        return response.json();
    }).then(map => {
        game.loadMap(map);
        game.setPlayerControls();
        game.setBots();
        game.addObserver(view);
        view.render(game);

        game.play();
    });
});