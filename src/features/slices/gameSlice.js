import { createSlice } from "@reduxjs/toolkit";
import { STATES } from '../enums'

const initialState = {
    screenColor: '',
    message: null,
    state: STATES.START
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setScreenColor: (state, action) => {
            state.screenColor = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        clearMessage: (state) => {
            state.message = ''
        },
        setState: (state, action) => {
            state.state = action.payload
        }
    }
})

export default gameSlice.reducer
export const {setScreenColor, setMessage, setState, clearMessage} = gameSlice.actions
export const screenColorSelector = (state) => state.game.screenColor
export const messageSelector = (state) => state.game.message
export const stateSelector = (state) => state.game.state