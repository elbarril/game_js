import MapItem from "./mapitem.js";

class Interactable extends MapItem{

    interactPlayer(player){
        console.log(player.character.position);
        console.log(this.position);
        let nextX = player.character.position.x + player.character.direction.x;
        let nextY = player.character.position.y + player.character.direction.y;
        if (nextX === this.position.x && nextY === this.position.y){
            alert('Hi');
        }
    }

    toString(){

        return 'door';
    }

}

export default Interactable;