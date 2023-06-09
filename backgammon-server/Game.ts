import { Board } from './Board';
import { Dice } from './Dice';
import { Player } from './Player';

export class Game {
    board: Board;
    player1: Player;
    player2: Player;
    dice1: Dice
    dice2: Dice

    constructor(public name1: string, public name2: string){
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.board = new Board();
        this.board.initBoard();
        this.dice1 = new Dice()
        this.dice2 = new Dice()
    }


}