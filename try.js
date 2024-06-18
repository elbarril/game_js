class Position{

    x;
    y;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

}

class Player{

    position;
    name;

    constructor(name, position){
        this.name=name;
        this.position = position;
    }

    setDirection(direction){
        this.direction = direction;
        return this
    }

    move(){

        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
        
    }
}


const mapArray = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]

]

const UP = "ArrowUp"
const DOWN = "ArrowDown"
const LEFT = "ArrowLeft"
const RIGHT = "ArrowRight"

const MOVEMENTS = {
    [UP]: new Position(0, -1),
    [DOWN]: new Position(0, 1),
    [LEFT]: new Position(-1, 0),
    [RIGHT]: new Position(1, 0)
}

var player;

function controls() {
    document.addEventListener('keydown', event => {
        try {
            const direction = MOVEMENTS[event.key];
            player.setDirection(direction).move();
            
            console.log(player.position);
        } catch (error) {
            console.log(error);
        }
    });
}

function map(){
    
    for (let column = 0; column < mapArray.length; column++) {
        for (let row = 0; row < mapArray[column].length; row++) {
            const element = mapArray[column][row];
            
            if (element){
                var playerPosition = new Position(row, column);
                player = new Player('brisa',playerPosition);
                controls();
            }
        }   
    }
}

document.addEventListener("DOMContentLoaded", () => {
    map();

});