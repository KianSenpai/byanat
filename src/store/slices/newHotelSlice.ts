import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FeatureProperties } from '../../assets/types.ts'

const initialState: { hotel: FeatureProperties | null } = {
    hotel: null,
}

const newHotelSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setNewHotel: (
            state,
            action: PayloadAction<FeatureProperties | null>
        ) => {
            state.hotel = action.payload
        },
    },
})

export const { setNewHotel } = newHotelSlice.actions
export default newHotelSlice.reducer
