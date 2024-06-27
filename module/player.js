export default class Player{
    character;
    name;

    constructor(name=null, character=null){
        this.name = name;
        this.character = character;
    }

    moveCharacter(map, direction){
        if (this.character.direction !== direction)
            return this.character.rotate(direction);
        let nextPosition = this.character.getNextPosition();
        if (!map.isValidPosition(nextPosition) || map.getElementByPosition(nextPosition)) return;
        map.removeElement(this.character);
        this.character.move();
        map.addElement(this.character);
    }
}