import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    players: {
        // "white": {username: 'haim', color: COLORS.PLAYER_1},
        // "black": {username: 'avi', color: COLORS.PLAYER_2},
    },
    currentPlayer: null
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload
        },
        
        setCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload
        }
    }
})

export default playersSlice.reducer
export const { setCurrentPlayer, setPlayers } = playersSlice.actions
export const playersSelector = (state) => state.players.players
export const currentPlayerSelector = (state) => state.players.players[state.players.currentPlayer]
