import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    1: 5,
    2: 3
}
const dicesSlice = createSlice({
    name: "dices",
    initialState,
    reducers: {}
})

export default dicesSlice.reducer
export const dicesSelector = (state) => state.dices