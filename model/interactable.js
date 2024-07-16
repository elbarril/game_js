import MapItem from "./mapitem.js";

class Interactable extends MapItem{
    action;

    doAction(){
        return confirm(this.action);
    }

}

export default Interactable;