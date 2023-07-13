export class Dice {
    static MIN = 1;
    static MAX = 6;
    public value: number = 0;
    public isRelevant = true;
    
    constructor(value?: number){
        if(value){
            this.value = value;
        }
    }

    setIsRelevant(isRelevant: boolean){
        this.isRelevant = isRelevant;
    }

    rollDice(){
        this.value = Math.floor(Math.random() * Dice.MAX + Dice.MIN);
    }

    initDice(){
        this.value = 0;
        this.setIsRelevant(false);
    }
}