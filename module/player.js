import MOVEMENTS from "./movements.js";
import Position from "./position.js";

export default class Player{
    character;

    constructor(character=null){
        this.character = character;
    }

    moveCharacter(map, direction_key){
        if (!MOVEMENTS.hasOwnProperty(direction_key)) return;
        let direction = MOVEMENTS[direction_key];
        let nextY = this.character.position.y + direction.y;
        if (map.positions.length <= nextY || nextY < 0) return;
        let nextX = this.character.position.x + direction.x;
        if (map.positions[nextY].length <= nextX || nextX < 0) return;
        if (map.positions[nextY][nextX]) return;
        map.remove(this.character);
        this.character.position = new Position(nextX, nextY);
        map.add(this.character);
    }
}