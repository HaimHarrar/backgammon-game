export class Dice {
    MIN = 1
    MAX = 6
    result: number;
    constructor(){
        this.result = 0
    }

    rollDice(){
        this.result = Math.floor(Math.random() * this.MAX + this.MIN)
    }
}