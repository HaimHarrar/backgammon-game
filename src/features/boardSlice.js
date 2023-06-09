import { createSlice } from '@reduxjs/toolkit'
import { COLORS } from './enums'

const initialState = {
    points: {
        1: { checkers: 2, color: COLORS.PLAYER_1 },
        2: { checkers: 0, color: null },
        3: { checkers: 0, color: null },
        4: { checkers: 0, color: null },
        5: { checkers: 0, color: null },
        6: { checkers: 5, color: COLORS.PLAYER_2 },
        7: { checkers: 0, color: null },
        8: { checkers: 3, color: COLORS.PLAYER_2 },
        9: { checkers: 0, color: null },
        10: { checkers: 0, color: null },
        11: { checkers: 0, color: null },
        12: { checkers: 5, color: COLORS.PLAYER_1 },
        13: { checkers: 5, color: COLORS.PLAYER_2 },
        14: { checkers: 0, color: null },
        15: { checkers: 0, color: null },
        16: { checkers: 0, color: null },
        17: { checkers: 3, color: COLORS.PLAYER_1 },
        18: { checkers: 0, color: null },
        19: { checkers: 5, color: COLORS.PLAYER_1 },
        20: { checkers: 0, color: null },
        21: { checkers: 0, color: null },
        22: { checkers: 0, color: null },
        23: { checkers: 0, color: null },
        24: { checkers: 2, color: COLORS.PLAYER_2 }
    },
    middleCheckers: {
        [COLORS.PLAYER_1]: 3,
        [COLORS.PLAYER_2]: 6,
    },
    outsideCheckers: {
        [COLORS.PLAYER_1]: 4,
        [COLORS.PLAYER_2]: 3,
    }
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {}
})

export default boardSlice.reducer
export const pointsSelector = (state) => state.board.points
export const middleCheckersSelector = (state) => state.board.middleCheckers
export const outsideCheckersSelector = (state) => state.board.outsideCheckers