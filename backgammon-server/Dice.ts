export class Dice {
    static MIN = 1;
    static MAX = 6;
    public value: number = 0;

    constructor(value1?: number){
        if(value1){
            this.value = value1
        }
    }

    rollDice(){
        this.value = Math.floor(Math.random() * Dice.MAX + Dice.MIN)
    }

    initDice(){
        this.value = 0;
    }
}