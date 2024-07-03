import MapItem from "./mapitem.js";

class Interactable extends MapItem{

    action(){
        return confirm('you wanna go?');
    }

    toString(){

        return 'door';
    }

}

export default Interactable;