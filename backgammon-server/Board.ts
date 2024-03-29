import { PLAYERS } from './enums';

interface Point{
    checkers: number,
    color: PLAYERS | null
}

export class Board{
    points: {[k: number]: Point} = []
    middleCheckers: {[k in PLAYERS]: number} = {
        [PLAYERS.PLAYER_1]: 0,
        [PLAYERS.PLAYER_2]: 0,
    };
    outsideCheckders: {[k in PLAYERS]: number} = {
        [PLAYERS.PLAYER_1]: 0,
        [PLAYERS.PLAYER_2]: 0,
    };
    
    constructor(){}

    initBoard() {
        this.points = this.points =   this.points = {
            1: { checkers: 2, color: PLAYERS.PLAYER_1 },
            6: { checkers: 5, color: PLAYERS.PLAYER_2 },
            8: { checkers: 3, color: PLAYERS.PLAYER_2 },
            12: { checkers: 5, color: PLAYERS.PLAYER_1 },
            13: { checkers: 5, color: PLAYERS.PLAYER_2 },
            17: { checkers: 3, color: PLAYERS.PLAYER_1 },
            19: { checkers: 5, color: PLAYERS.PLAYER_1 },
            24: { checkers: 2, color: PLAYERS.PLAYER_2 }
        }
        
        for(let k = 1; k <= 24; k++){
            if(!this.points[k]){
                this.points[k] = { checkers: 0, color: null };
            }
        }
    }

    outsideCheckersAddOne(player: PLAYERS){
        this.outsideCheckders[player]++
    }

    pointAddOne(index: number){
        this.points[index].checkers++
    }
    
    pointSubOne(index: number){
        this.points[index].checkers--
    }

    pointChangeColor(index: number, color: PLAYERS){
        this.points[index].color = color
    }
}


/* regular template

 this.points = {
     1: { checkers: 2, color: PLAYERS.PLAYER_1 },
     6: { checkers: 5, color: PLAYERS.PLAYER_2 },
     8: { checkers: 3, color: PLAYERS.PLAYER_2 },
     12: { checkers: 5, color: PLAYERS.PLAYER_1 },
     13: { checkers: 5, color: PLAYERS.PLAYER_2 },
     17: { checkers: 3, color: PLAYERS.PLAYER_1 },
     19: { checkers: 5, color: PLAYERS.PLAYER_1 },
     24: { checkers: 2, color: PLAYERS.PLAYER_2 }
 }

*/ 

// all white in position and black in middle line

/**
 *         this.points = {
            12: { checkers: 2, color: PLAYERS.PLAYER_2 },
            18: { checkers: 5, color: PLAYERS.PLAYER_2 },
            19: { checkers: 3, color: PLAYERS.PLAYER_1},
            20: { checkers: 5, color: PLAYERS.PLAYER_1 },
            21: { checkers: 5, color: PLAYERS.PLAYER_1 },
            22: { checkers: 3, color: PLAYERS.PLAYER_1 },
            23: { checkers: 5, color: PLAYERS.PLAYER_1 },
            24: { checkers: 2, color: PLAYERS.PLAYER_1 }
        }
        this.middleCheckers[PLAYERS.PLAYER_2] = 1;
 */

/**
 * everyone in position to move out
        
 */


/**
    all whites block to back to board but only one is open 

    this.points = this.points =  this.points = {
            12: { checkers: 2, color: PLAYERS.PLAYER_2 },
            18: { checkers: 5, color: PLAYERS.PLAYER_2 },
            19: { checkers: 3, color: PLAYERS.PLAYER_1},
            20: { checkers: 5, color: PLAYERS.PLAYER_1 },
            21: { checkers: 5, color: PLAYERS.PLAYER_1 },
            22: { checkers: 3, color: PLAYERS.PLAYER_1 },
            23: { checkers: 5, color: PLAYERS.PLAYER_1 },
            24: { checkers: 2, color: PLAYERS.PLAYER_1 }
        }
        this.middleCheckers[PLAYERS.PLAYER_2] = 1;
    
 */