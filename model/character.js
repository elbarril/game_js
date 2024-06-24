import MapItem from './mapitem.js'

class Character extends MapItem{

    move(){

        if (!this.direction) return;
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }

    toString(){

        return '*';
    }

}

export default Character;