import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import geojsonReducer from './slices/geojsonSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        geojson: geojsonReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
