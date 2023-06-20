import { configureStore } from '@reduxjs/toolkit'
import dicesSlice from './slices/dicesSlice'
import playersSlice from './slices/playersSlice'
import boardSlice from './slices/boardSlice'
import moveSlice from './slices/moveSlice'
import gameSlice from './slices/gameSlice'

export default configureStore({
    reducer: {
        dices: dicesSlice,
        players: playersSlice,
        board: boardSlice,
        move: moveSlice,
        game: gameSlice
    }
})