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

    addElement(element){
        this.positions[element.position.y][element.position.x] = element;
    }

    removeElement(element){
        let currentElement = this.positions[element.position.y][element.position.x];
        if (currentElement === element)
            this.positions[element.position.y][element.position.x] = null;
    }

    getElementByPosition(position){
        return this.positions[position.y][position.x];
    }

    isValidPosition(position){
        if (this.positions.length <= position.y || position.y < 0) return false;
        if (this.positions[position.y].length <= position.x || position.x < 0) return false;
        return true
    }
}

export default GameMap;