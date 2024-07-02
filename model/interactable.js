import MapItem from "./mapitem.js";

class Interactable extends MapItem{

    interactPlayer(player){
        let nextX = player.character.position.x + player.character.direction.x;
        let nextY = player.character.position.y + player.character.direction.y;
        if (nextX === this.position.x && nextY === this.position.y){
            if (confirm('you wanna go?')){
                return true;
            }
        }
    }

    toString(){

        return 'door';
    }

}

export default Interactable;