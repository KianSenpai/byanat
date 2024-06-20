import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { City, CityState } from '../../assets/types'

const initialState: CityState = {
    selectedCity: [{ name: 'Muscat', code: 'MSC' }],
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setSelectedCity(state, action: PayloadAction<City[]>) {
            state.selectedCity = action.payload
        },
    },
})

export const { setSelectedCity } = citySlice.actions
export default citySlice.reducer
