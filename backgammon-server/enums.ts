export enum PLAYERS{
    PLAYER_1 = "white", PLAYER_2="black"
}

export const LOADING = {
    WAITING_FOR_PLAYER: 'Waiting for player...',
    ERROR: 'There is some error',
    LOADING: 'Loading',
    SUCCESS: 'Success'
}

export const EMITTERES = {
    CONNECTION: 'connection',
    LOADING: 'loading',
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
    NEXT_PLAYER: 'Next player'
}

export const STATES = {
    START: 'Start',
    MIDDLE: 'Middle',
    END: 'End'
}