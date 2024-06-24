class GameMap{

    positions =[];

    constructor(rows, columns){
        for (let row = 0; row < rows; row++) {
            this.positions[row] = [];
            for (let column = 0; column < columns; column++) {
                this.positions[row][column] = null;
            }
        }
    }

    add(mapItem){
        this.positions[mapItem.position.y][mapItem.position.x] = mapItem;
    }

    remove(mapItem){
        this.positions[mapItem.position.y][mapItem.position.x] = null;
    } 
    
}

export default GameMap;