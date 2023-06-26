import { createSlice } from "@reduxjs/toolkit";
import { STATES } from '../enums'

const initialState = {
    screenColor: '',
    loading: null,
    state: STATES.START
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setScreenColor: (state, action) => {
            state.screenColor = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setState: (state, action) => {
            state.state = action.payload
        }
    }
})

export default gameSlice.reducer
export const {setScreenColor, setLoading, setState} = gameSlice.actions
export const screenColorSelector = (state) => state.game.screenColor
export const loadingSelector = (state) => state.game.loading
export const stateSelector = (state) => state.game.state