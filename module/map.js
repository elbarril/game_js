class GameMap{
    positions = [];

    constructor(width, height){
        for (let row = 0; row < height; row++) {
            this.positions[row] = [];
            for (let column = 0; column < width; column++) {
                this.positions[row][column] = null;
            }
            
        }
    }

    add(element){
        this.positions[element.position.y][element.position.x] = element;
    }

    remove(element){
        this.positions[element.position.y][element.position.x] = null;
    }
}

export default GameMap;