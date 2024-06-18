import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'

interface GeoJSONState {
    geojson: FeatureCollection<Geometry, GeoJsonProperties> | null
}

const initialState: GeoJSONState = {
    geojson: null,
}

const geojsonSlice = createSlice({
    name: 'geojson',
    initialState,
    reducers: {
        setGeoJSON: (
            state,
            action: PayloadAction<
                FeatureCollection<Geometry, GeoJsonProperties>
            >
        ) => {
            state.geojson = action.payload
        },
    },
})

export const { setGeoJSON } = geojsonSlice.actions

export default geojsonSlice.reducer
