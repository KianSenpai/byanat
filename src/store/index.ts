import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import geojsonReducer from './slices/geojsonSlice'
import cityReducer from './slices/citySlice'
import hotelReducer from './slices/hotelSlice'
import newHotelReducer from './slices/newHotelSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        geojson: geojsonReducer,
        city: cityReducer,
        hotel: hotelReducer,
        newHotel: newHotelReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
