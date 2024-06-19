import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import geojsonReducer from './slices/geojsonSlice'
import cityReducer from './slices/citySlice'
import hotelReducer from './slices/hotelSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        geojson: geojsonReducer,
        city: cityReducer,
        hotel: hotelReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
