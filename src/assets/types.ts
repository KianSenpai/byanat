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
    RATING: 4.6
    TYPE: string
    latitude: 23.5931
    longitude: 58.3896
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
