import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: ""
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { set } = searchSlice.actions

export default searchSlice.reducer
