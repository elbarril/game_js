import MapItem from "./mapitem.js";

class MovableMapItem extends MapItem{

    direction = null;
    
    constructor(position, direction){
        super(position);
        this.direction = direction;
    }

    move(){
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }

}

export default MovableMapItem;