import { PLAYERS } from "./enums";


export class Move {
    public from: number = 0;
    public to: number = 0;
    public color: PLAYERS | null = null;

    initMove(){
        this.from = 0
        this.to = 0
        this.color = null
    }

    setFrom(index: number) {
        this.from = index
    }

    setColor(color: PLAYERS){
        this.color = color;
    }

    setTo(index: number) {
        this.to = index;
    }
}