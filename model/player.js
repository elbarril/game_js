class Player{

    character = null;
    name;

    constructor(name){
        this.name=name;
    }

    moveCharacter(map, direction){
        if (this.character.direction !== direction){
            this.character.direction = direction;
            return;
        }

        let nextX = this.character.position.x + direction.x;
        let nextY = this.character.position.y + direction.y;
        if (map.positions.length <= nextY || nextY < 0 ) return;
        if (map.positions[nextY].length <= nextX || nextX < 0 ) return;
        if (map.positions[nextY][nextX]) return;

        map.remove(this.character);
        this.character.move();
        map.add(this.character);
    }
}

export default Player;