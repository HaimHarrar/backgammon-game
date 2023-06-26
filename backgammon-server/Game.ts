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
        // this.players[PLAYERS.PLAYER_1] = new Player();
        this.players[PLAYERS.PLAYER_1].setName(player1.color === PLAYERS.PLAYER_1? player1.name: player2.name)
        this.players[PLAYERS.PLAYER_1].setColor(player1.color === PLAYERS.PLAYER_1? player1.color: player2.color)

        // this.players[PLAYERS.PLAYER_2] = new Player();
        this.players[PLAYERS.PLAYER_2].setName(player2.color === PLAYERS.PLAYER_2? player2.name: player1.name)
        this.players[PLAYERS.PLAYER_2].setColor(player2.color === PLAYERS.PLAYER_2? player2.color: player1.color)
        
        // this.players[PLAYERS.PLAYER_2] = player2.color === PLAYERS.PLAYER_2?  new Player(player2.name, player2.color): new Player(player1.name, player1.color);
        this.board.initBoard();
        this.dices[1] = new Dice
        this.dices[2] = new Dice
        this.currentPlayer = PLAYERS.PLAYER_2;
        this.state = STATES.START;
        this.move = new Move();
    }

    nextPlayer() {
        this.currentPlayer = this.currentPlayer === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1
        // this.currentPlayer = (this.currentPlayer + 1) % 2 === 0? 2 : 1;
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
        this.dices[1].value = 0
        this.dices[2].value = 0
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

    // black have to be negetive to be legal and whtie positive
    isDistanceInDices(distance: number, playerColor: PLAYERS) {
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
        return Object.values(this.dices).every(dice => !dice.value)
    }

    isStomp(to: number){
        return ((this.board.points[to].color && this.board.points[to].color !== this.currentPlayer) && (this.board.points[to].checkers === 1))
    }
 
    isBackToBoardLigalPoint(to: number, playerColor: PLAYERS){
        return (this.isDistanceInDices(playerColor === PLAYERS.PLAYER_2? to - 25: to, playerColor) && (((playerColor === PLAYERS.PLAYER_1 && to <= 6) || (playerColor === PLAYERS.PLAYER_2 && to > 18))))
    }

    isBackToBoardOptional(playerColor: PLAYERS){
        const startingPoint = playerColor === PLAYERS.PLAYER_1? 1: 19;
        const finishPoint = playerColor === PLAYERS.PLAYER_1? 6: 24;
        for(let i = startingPoint; i <= finishPoint; i++){
            if(this.board.points[i].checkers < 2 || this.board.points[i].color === playerColor){
                return true;
            }
        }
        return false;
    }

    isDicesLigalInBackToBoard(playerColor: PLAYERS){
        return ( Object.values(this.dices).some(dice =>this.board.points[playerColor === PLAYERS.PLAYER_1? dice.value:25 - dice.value].checkers < 2 || 
            this.board.points[playerColor === PLAYERS.PLAYER_1? dice.value: 25 - dice.value].color === playerColor))
    } 

    isMoveOutLigal(from: number, playerColor: PLAYERS) {
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

    isDicesPointValuesEmpty(distance: number){
        return Object.values(this.dices).some((dice) =>{
             dice.value > distance && dice.value && !this.board.points[dice.value].checkers
            })
    }

    initDices(){
        Object.keys(this.dices).forEach(k => this.dices[Number(k)].initDice())
    }

} 