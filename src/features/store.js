import { configureStore } from '@reduxjs/toolkit'
import dicesSlice from './dicesSlice'
import playersSlice from './playersSlice'
import boardSlice from './boardSlice'

export default configureStore({
    reducer: {
        dices: dicesSlice,
        players: playersSlice,
        board: boardSlice
    }
})