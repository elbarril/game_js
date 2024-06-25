class Player{

    character = null;
    name;

    constructor(name){
        this.name=name;
    }

    moveCharacter(map, direction, npc){

        this.character.direction = direction;
        let nextX = this.character.position.x + direction.x;
        let nextY =this.character.position.y + direction.y;
        if (map.positions.length < nextY || nextY < 0 ) return;
        if (map.positions[nextY].length < nextX || nextX < 0 ) return;
        if (map.positions[nextX][nextY]) return;
        if (nextX === npc.position.x && nextY === npc.position.y) return;

        map.remove(this.character);
        this.character.move();
        map.add(this.character);
    }
}

export default Player;