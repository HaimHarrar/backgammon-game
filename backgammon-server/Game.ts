import { Board } from './Board';
import { Dice } from './Dice';
import { Move } from './Move';
import { Player } from './Player';
import { PLAYERS, STATES } from './enums';

export class Game {
    board: Board = new Board();
    dices: { [k: number]: Dice } = {};
    currentPlayer: PLAYERS = PLAYERS.PLAYER_1;
    state: string;
    move: Move;
    players: {[k in PLAYERS]: Player} = {
        [PLAYERS.PLAYER_1]: new Player(),
        [PLAYERS.PLAYER_2]: new Player()
    };
 
    constructor(player1: Player, player2: Player) {
        this.players[PLAYERS.PLAYER_1].setName(player1.name)
        this.players[PLAYERS.PLAYER_1].setColor(player1.color)
        this.players[PLAYERS.PLAYER_2].setName(player2.name)
        this.players[PLAYERS.PLAYER_2].setColor(player2.color)
        this.board.initBoard();
        this.dices[1] = new Dice
        this.dices[2] = new Dice
        this.currentPlayer = PLAYERS.PLAYER_2;
        this.state = STATES.START;
        this.move = new Move();
    }

    isMoveLigal(to: number, playerColor: PLAYERS){
        if(to <= 0 || to >= 25){
            return false;
        }
        if(this.board.points[to].color !== playerColor && this.board.points[to].checkers > 1){
            return false;
        }
        return true;
    }

    nextPlayer() {
        if(this.isThereOptionToMove(this.currentPlayer === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1)){
            this.currentPlayer = this.currentPlayer === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1;
        }
        this.resetDices();
    }

    firstRolling(index: number) {
        this.dices[index].rollDice();
        this.nextPlayer()
    }

    whoIsStarting(){
        if((this.dices[1].value && this.dices[2].value) && (this.dices[1].value !== this.dices[2].value)){
            this.dices[1] > this.dices[2]? this.currentPlayer = PLAYERS.PLAYER_1: this.currentPlayer = PLAYERS.PLAYER_2;
            this.state = STATES.MIDDLE;
        }
    }

    resetDices() {
        delete this.dices[3]
        delete this.dices[4]
        this.dices[1].initDice();
        this.dices[2].initDice();
    }

    rollDices() {
        this.resetDices()
        this.dices[1].rollDice();
        this.dices[2].rollDice();
        if(this.dices[1].value === this.dices[2].value){
            this.dices[3] = new Dice(this.dices[1].value);
            this.dices[4] = new Dice(this.dices[1].value);
        }
    }

    isDistanceInDices(distance: number, playerColor: PLAYERS) {
        /* black have to be negetive to be legal and whtie positive */
        if(playerColor === PLAYERS.PLAYER_1 && distance > 0 || playerColor === PLAYERS.PLAYER_2 && distance < 0){
            return Object.values(this.dices).map(dice => dice.value).includes(Math.abs(distance))
        }else {  
            return false
        }
    } 

    deleteDiceByValue(value: number){
        const key = Object.keys(this.dices).find((k) => this.dices[Number(k)].value === Math.abs(value))
        if(key !== undefined){
            this.dices[Number(key)].initDice()
        } 
    }

    isAllDicesUsed(){
        return Object.values(this.dices).every(dice => !dice.isRelevant)
    }

    isStomp(to: number){
        return ((this.board.points[to].color && this.board.points[to].color !== this.currentPlayer) && (this.board.points[to].checkers === 1))
    }

    isBackToBoardLigalPoint(to: number, playerColor: PLAYERS){
        return (this.isDistanceInDices(playerColor === PLAYERS.PLAYER_2? to - 25: to, playerColor) && (((playerColor === PLAYERS.PLAYER_1 && to <= 6) || (playerColor === PLAYERS.PLAYER_2 && to > 18))))
    }
 
    backToBoard(point: number, playerColor: PLAYERS){ 
        if(this.isStomp(point)){ 
            this.board.points[point].checkers = 0;
            this.board.middleCheckers[playerColor === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1]++
        }
        this.board.middleCheckers[this.currentPlayer]--
        this.move.to = point;
        this.board.points[point].checkers++;
        this.board.points[point].color = this.currentPlayer;
        this.deleteDiceByValue(playerColor === PLAYERS.PLAYER_1? point: 25 - point)
    }

    backToBoardOptions(playerColor: PLAYERS): number[]{
        const startingPoint = playerColor === PLAYERS.PLAYER_1? 1: 19;
        const finishPoint = playerColor === PLAYERS.PLAYER_1? 6: 24;
        const options: number[] = [];
        for(let i = startingPoint; i <= finishPoint; i++){
            if(this.board.points[i].checkers < 2 || this.board.points[i].color === playerColor){
                options.push(playerColor === PLAYERS.PLAYER_1? i: 25 - i)
            }
        }
        return options
    }

    isDicesLigalInBackToBoard(playerColor: PLAYERS){
        return ( Object.values(this.dices).some(dice =>this.board.points[playerColor === PLAYERS.PLAYER_1? dice.value:25 - dice.value].checkers < 2 || 
            this.board.points[playerColor === PLAYERS.PLAYER_1? dice.value: 25 - dice.value].color === playerColor))
    } 

    isMoveOutLigal(playerColor: PLAYERS) {
        const startingPoint = playerColor === PLAYERS.PLAYER_1? 1: 7;
        const endingPoint = playerColor === PLAYERS.PLAYER_1? 18: 24;
        
        for(let i = startingPoint; i <= endingPoint; i++){
            if( this.board.points[i].color === playerColor && this.board.points[i].checkers > 0){
                return false
            }
        }
        return true;
    }

    isDicesGreaterThanDistance(distance: number) {
        return Object.values(this.dices).some(dice => dice.value > distance)
    }

    isGreaterPointsEmpty(point: number, playerColor: PLAYERS){
        let startingPoint = playerColor === PLAYERS.PLAYER_1? 19: 6;
        const endingPoint = point
        while(startingPoint != endingPoint){
            if(this.board.points[startingPoint].checkers > 0 && this.board.points[startingPoint].color === playerColor){
                return false;
            }
            startingPoint += playerColor === PLAYERS.PLAYER_1? 1: -1;
        }
        return true
    }

    initDices(){
        Object.keys(this.dices).forEach(k => this.dices[Number(k)].initDice())
    }

    isThereWinner(){
        return Object.keys(this.board.outsideCheckders).find(key => this.board.outsideCheckders[PLAYERS.PLAYER_1 === key? PLAYERS.PLAYER_1: PLAYERS.PLAYER_2]===15)
    }
 
    isThereOptionToMove(playerColor: PLAYERS){
        for(let i = 1; i < 25; i++){ 
            if(this.board.points[i].color === playerColor && this.board.points[i].checkers > 0 ){
                if(this.isTherePlaceToMoveInSixRadius(i, playerColor)){
                    return true
                }
            }
        }
        return false
    }

    isTherePlaceToMoveInSixRadius(from: number, playerColor: PLAYERS){
        let startingPoint = from;
        let endingPoint = from + 6 * (playerColor === PLAYERS.PLAYER_1? 1: -1)

        while(endingPoint !== startingPoint && endingPoint > 0 && endingPoint < 25){
            if(this.isMoveLigal(endingPoint, playerColor)){
                return true;
            }
            endingPoint += (playerColor === PLAYERS.PLAYER_1? -1: 1)
        }
        return false
    }

    isDicesRelevant(playerColor: PLAYERS){
        Object.keys(this.dices).forEach(k => {
            if(this.dices[Number(k)].value){
                let isRelevant: boolean = false;

                if(this.board.middleCheckers[playerColor]){
                    if(this.isBackToBoardLigalPoint(playerColor === PLAYERS.PLAYER_1? this.dices[Number(k)].value: 25 - this.dices[Number(k)].value, playerColor)){
                        isRelevant = true;
                    }
                }else{
                    for(let i = 1; i < 25; i++){ 
                        if(this.board.points[i].color === playerColor && this.board.points[i].checkers > 0 ){
                            if(this.isMoveLigal(i + this.dices[Number(k)].value * (playerColor === PLAYERS.PLAYER_1? 1: -1), playerColor)){
                                isRelevant = true;
                                break;
                            }
                        }
                    }
                }
                this.dices[Number(k)].setIsRelevant(isRelevant);
            }else{
                this.dices[Number(k)].setIsRelevant(false);
            }
        })
        return Object.values(this.dices).some(val => val.isRelevant);
    }


}