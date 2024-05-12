function loadMap(map){
    let gameElement = document.body.querySelector('#game');
    for (let row = 0; row < map.length; row++) {
        const items = map[row];
        let rowElement = document.createElement('ul');
        for (let column = 0; column < items.length; column++) {
            const item = items[column];
            let itemElement = createItem(item, row, column);
            itemElement && rowElement.appendChild(itemElement);
        }
        gameElement.appendChild(rowElement);
    }
}

const ITEMS = {
    "0": false,
    "1": "solid",
    "2": "player"
}

const DIRECTION_KEYS = {
    "ArrowUp": "UP",
    "ArrowDown": "DOWN",
    "ArrowLeft": "LEFT",
    "ArrowRight": "RIGHT"
}

const MOVEMENTS = {
    "UP": [-1, 0],
    "DOWN": [1, 0],
    "LEFT": [0, -1],
    "RIGHT": [0, 1]
}

function createItem(itemCode, row, column){
    try {
        let itemElement = document.createElement('li');
        ITEMS[itemCode] && itemElement.classList.add(ITEMS[itemCode]);
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
            const direction = DIRECTION_KEYS[event.key];
            move(direction);
        } catch (error) {
            console.log(error);
        }
    });
}

function move(direction) {
    let movement = MOVEMENTS[direction];
    let player = document.querySelector(".player");
    let row = new Number(player.dataset.row);
    let column = new Number(player.dataset.column);
    let newRow = row + new Number(movement[0]);
    let newColumn = column + new Number(movement[1]);

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