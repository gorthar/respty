import { createSlice } from "@reduxjs/toolkit";

type State={
    data: number
}

const initialState: State = {
    data: 10
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers:{
        increment: (state) => {
            state.data += 1
            
        },
        decrementByAmount: (state, action) => {
            state.data -= action.payload
        },
        incrementByAmount: (state, action) => {
            state.data += action.payload
        }
    }
})

export const { increment, decrementByAmount, incrementByAmount } = testSlice.actions