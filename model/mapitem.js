class MapItem{

    position;
    direction = null;

    constructor(position){
        this.position = position;
    }

    move(){

        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }

}

export default MapItem;