import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FeatureProperties } from '../../assets/types'

const initialState: { hotel: FeatureProperties | null } = {
    hotel: null,
}

const hotelSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setHotel: (state, action: PayloadAction<FeatureProperties | null>) => {
            state.hotel = action.payload
        },
    },
})

export const { setHotel } = hotelSlice.actions
export default hotelSlice.reducer
