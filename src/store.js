import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './features/pageSlice'
import searchReducer from './features/searchSlice'


export default configureStore({
    reducer: {
        page: pageReducer,
        search: searchReducer
    }
})
