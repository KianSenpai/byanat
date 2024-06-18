import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import geojsonReducer from './slices/geojsonSlice'
import cityReducer from './slices/citySlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        geojson: geojsonReducer,
        city: cityReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
