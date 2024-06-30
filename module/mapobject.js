import {default as Action, Dialog} from "./action.js";

const ACTIONS = {
    "dialog": Dialog,
    "default": Action
}

class MapObject{
    name;
    position;
    action;
    
    constructor(position){
        this.position = position;
    }

    setAction(actionData){
        let action = ACTIONS[actionData.perform] ?? ACTIONS.default;
        this.action = new action(actionData);
    }
}

export default MapObject;