class NPC{

    character = null;
    name;

    constructor(name){
        this.name=name;
    }

    move(map){

        const directions = [
            {x:0, y: -1},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 1, y: 0}
        ];

        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const nextX = this.character.position.x + randomDirection.x;
        const nextY = this.character.position.y + randomDirection.y;

        if (map.positions.length < nextY || nextY < 0 ) return;
        if (map.positions[nextY].length < nextX || nextX < 0) return;
        if (map.positions[nextX][nextY]) return;

        map.remove(this.character);
        this.character.position.x = nextX;
        this.character.position.y = nextY;
        map.add(this.character);
    }

    msgNpc(player, direction){
        this.character.direction = direction;
        let nextX = player.character.position.x + direction.x;
        let nextY = player.character.position.y + direction.y;
        if (nextX === this.character.position.x && nextY === this.character.position.y){
            alert('Hi');
        }
    }

}

export default NPC;