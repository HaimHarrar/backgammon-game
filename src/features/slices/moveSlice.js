import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    move: {
        from: null, to: null, color: null
    }
}

const moveSlice = createSlice({
    name: 'move',
    initialState,
    reducers: {
        setMove: (state, action) => {
            state.move = action.payload            
        },

        setFrom: {
            reducer: (state, action) => {
                state.move.from = action.payload.from
                state.move.color = action.payload.color
            },
            prepare: (from, color) => {
                return {
                    payload: {
                        from, color
                    }
                }
            },
        },
        setToWithoutColor: (state, action) => {
            state.move.to = action.payload
        },
        setToWithColor: {
            reducer: (state, action) => {
                state.move.to = action.payload.to
            },
            prepare: (to, color) => {
                return {
                    payload: {
                        from: to, color
                    }
                }
            }
        }

    }
})

export default moveSlice.reducer
export const { setFrom, setToWithColor, setToWithoutColor, setMove } = moveSlice.actions
export const moveSelector = (state) => state.move.move