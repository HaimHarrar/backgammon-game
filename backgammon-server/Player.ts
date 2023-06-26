import { PLAYERS } from "./enums";

export class Player {
    public name: string = '';
    public color: PLAYERS = PLAYERS.PLAYER_1;
    constructor(name?: string){
        if(name){
            this.name = name
        }
    }

    setName(name: string){
        this.name = name
    }

    setColor(color: PLAYERS){
        this.color = color
    }
}