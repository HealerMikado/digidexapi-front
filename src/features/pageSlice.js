import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: 1
    },
    reducers: {
        increment: state => {
            console.log(state.value)
            state.value += 1
        },
    }
})

export const { increment } = pageSlice.actions
export const selectPage = state => state.page.value

export default pageSlice.reducer
