
var position;

function loadMap(map){
    let gameElement = document.body.querySelector('#game');
    for (let row = 0; row < map.length; row++) {
        const itemsMap = map[row];
        let rowElement = document.createElement('ul');
        for (let column = 0; column < itemsMap.length; column++) {
            position = new Position(row, column)
            const item = itemsMap[column];
            let itemElement = createItem(item, row, column);
            itemElement && rowElement.appendChild(itemElement);
        }
        gameElement.appendChild(rowElement);
    }
    return position;
}

class Position{

    x;
    y;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

}

class Character{

    position;
    direction;

    constructor(position, direction){
        this.position=position;
        this.direction=direction;
    }

}

class PlayerCharacter extends Character{

    name;

    constructor(name, position, direction){
        super(position, direction)
        this.name=name;
    }

    
    setDirection(direction){
        this.direction = direction
        return this
    }

    move(){

        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
        
    }
}

const UP = "ArrowUp"
const DOWN = "ArrowDown"
const LEFT = "ArrowLeft"
const RIGHT = "ArrowRight"

const ITEMS_MAP = {
    "0": false,
    "1": "solid",
    "2": "player"
}

const MOVEMENTS = {
    [UP]: new Position(0, -1),
    [DOWN]: new Position(0, 1),
    [LEFT]: new Position(-1, 0),
    [RIGHT]: new Position(1, 0)
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
            let player = new PlayerCharacter('Brisa', position, direction);
            player.setDirection(direction).move();
            console.log(player.position);
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
    var map=[
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,2,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ]
    loadMap(map);
    createControls();
});