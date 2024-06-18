import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
    selectedFilter: string | null
}

const initialState: FilterState = {
    selectedFilter: null,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string | null>) => {
            state.selectedFilter = action.payload
        },
    },
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
