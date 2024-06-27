import MapObject  from "./mapobject.js";

export default class Obstacle extends MapObject{
    toString(){
        return '*';
    }
}