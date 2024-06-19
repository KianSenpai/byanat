export interface FeatureProperties {
    ADDRESS_LINE1: string
    BATHROOMS: number
    BEDROOMS: number
    CITY: string
    COUNTRY: string
    GUESTS: number
    HOTEL_NAME: string
    NBHD_NAME: string
    PRICE: number
    RATING: number
    TYPE: string
    latitude: number
    longitude: number
}

export interface Feature {
    type: string
    geometry: {
        type: string
        coordinates: number[]
    }
    properties: FeatureProperties
}

export interface GeoJSONResponse {
    type: string
    features: Feature[]
}

export interface City {
    name: string
    code: string
}

export interface CityState {
    selectedCity: City[] | null
}
