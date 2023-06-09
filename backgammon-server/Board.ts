import { PLAYERS_COLOR } from "./enums"

interface Point{
    checkers: number,
    color: PLAYERS_COLOR | null
}

export class Board{
    board: {[k: number]: Point}

    initBoard() {
        this.board = {
            1: { checkers: 2, color: PLAYERS_COLOR.WHITE },
            6: { checkers: 5, color: PLAYERS_COLOR.BLACK },
            8: { checkers: 3, color: PLAYERS_COLOR.BLACK },
            12: { checkers: 5, color: PLAYERS_COLOR.WHITE },
            13: { checkers: 5, color: PLAYERS_COLOR.BLACK },
            17: { checkers: 3, color: PLAYERS_COLOR.WHITE },
            19: { checkers: 5, color: PLAYERS_COLOR.WHITE },
            24: { checkers: 2, color: PLAYERS_COLOR.BLACK }
        }

        for(let k = 1; k < 24; k++){
            if(!this.board[k]){
                this.board[k] = { checkers: 0, color: null }
            }
        }
    }
}