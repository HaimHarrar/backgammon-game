import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenColor: '',
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setScreenColor: (state, action) => {
            state.screenColor = action.payload
        }
    }
})

export default gameSlice.reducer
export const {setScreenColor} = gameSlice.actions
export const screenColorSelector = (state) => state.game.screenColor