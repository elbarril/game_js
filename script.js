function loadMap(map){
    let gameElement = document.body.querySelector('#game');
    for (let row = 0; row < map.length; row++) {
        const itemsMap = map[row];
        let rowElement = document.createElement('ul');
        for (let column = 0; column < itemsMap.length; column++) {
            const item = itemsMap[column];
            let itemElement = createItem(item, row, column);
            itemElement && rowElement.appendChild(itemElement);
        }
        gameElement.appendChild(rowElement);
    }
}

const ITEMS_MAP = {
    "0": false,
    "1": "solid",
    "2": "player"
}

const MOVEMENTS = {
    "ArrowUp": [-1, 0],
    "ArrowDown": [1, 0],
    "ArrowLeft": [0, -1],
    "ArrowRight": [0, 1]
}

function createItem(itemCode, row, column){
    try {
        let itemElement = document.createElement('li');
        ITEMS_MAP[itemCode] && itemElement.classList.add(ITEMS_MAP[itemCode]);
        itemElement.dataset["row"] = row;
        itemElement.dataset["column"] = column;
        itemElement.dataset["id"] = itemCode;
        return itemElement;
    } catch (error) {
        console.log(error);
    }
}

function createControls() {
    document.addEventListener('keydown', event => {
        try {
            const direction = MOVEMENTS[event.key];
            move(direction);
        } catch (error) {
            console.log(error);
        }
    });
}

function move(direction) {
    let player = document.querySelector(".player");
    let row = new Number(player.dataset.row);
    let column = new Number(player.dataset.column);
    let newRow = row + new Number(direction[0]);
    let newColumn = column + new Number(direction[1]);

    let positionToMove = document.querySelector(`[data-row="${newRow}"][data-column="${newColumn}"]`);
    if (positionToMove && ITEMS[positionToMove.dataset.id] != "solid") {
        positionToMove.classList.toggle("player");
        player.classList.toggle("player");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded.");
    fetch("data.json").then(response => {
        return response.json();
    }).then(map => {
        loadMap(map);
        createControls();
    });
});