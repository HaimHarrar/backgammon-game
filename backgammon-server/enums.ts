export enum PLAYERS{
    PLAYER_1 = "white", PLAYER_2="black"
}

export const MESSAGES = {
    WAITING_FOR_PLAYER: 'Waiting for player...',
    PLAYER_LEFT: (name: string) => `${name} had left`,
    ERROR: 'There is some error',
    WINNER: (name: string) => `${name} won`,
    LOADING: 'Loading',
    SUCCESS: 'Success'
}

export const EMITTERES = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    PLAYER_LEFT: 'Player left',
    WAITING_FOR_PLAYER: 'Waiting for player',
    MESSAGE: 'loading',
    WINNER: 'winner',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    MOVE: 'Move',
    SELECT: 'Select',
    UNSELECT: 'UnSelect',
    BACK_TO_BOARD: 'Baock to board',
    MOVE_OUT: 'Move out',
    ROLL_DICES: 'Roll dices',
    FIRST_ROLL: 'First roll',
    STOMP: 'Stomp',
    NEXT_PLAYER: 'Next player',
    TWO_LOGIN: 'two login'
}

export const STATES = { 
    START: 'Start',
    MIDDLE: 'Middle',
    END: 'End'
}