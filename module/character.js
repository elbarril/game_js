import MovableMapObject from './movablemapobject.js';

export default class Character extends MovableMapObject{
    name;
    
    constructor(name, position){
        super(position);
        this.name = name;
    }

    toString(){
        return ":)";
    }

    sayHello(){
        alert(`Hello! I'm ${this.name}`);
    }
}