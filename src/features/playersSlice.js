import { createSlice } from '@reduxjs/toolkit'
import { COLORS } from './enums'

const initialState = {
    players: {
        1: {username: 'haim', color: COLORS.PLAYER_1},
        2: {username: 'avi', color: COLORS.PLAYER_2},
    },
    currentPlayer: 1
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {

    }
})

export default playersSlice.reducer
export const playersSelector = (state) => state.players.players
export const currentPlayerSelector = (state) => state.players.players[state.players.currentPlayer]
