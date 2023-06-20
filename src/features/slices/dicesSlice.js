import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    dices: {}
}
const dicesSlice = createSlice({
    name: "dices",
    initialState,
    reducers: {
        setDices: (state, action) => {
            state.dices = action.payload
        }
    }
})

export default dicesSlice.reducer
export const {setDices} = dicesSlice.actions
export const dicesSelector = (state) => state.dices.dices