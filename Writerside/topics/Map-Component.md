# Map Component

## Overview
`MapComponent` is a React component that integrates with Mapbox to display a map with interactive features. It allows users to view markers and popups for specific locations, fetch geoJSON data, and interact with map elements.

## Imports
```typescript
import mapboxgl, { Map } from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FeatureProperties, GeoJSONResponse } from '../../assets/types'
import { useDispatch, useSelector } from 'react-redux'
import { setGeoJSON } from '../../store/slices/geojsonSlice'
import { RootState } from '../../store'
import HoverCard from './HoverCard'
import { createRoot } from 'react-dom/client'
import { setHotel } from '../../store/slices/hotelSlice.ts'
import { setNewHotel } from '../../store/slices/newHotelSlice.ts'
import NewHotel from '../Modal/NewHotel'
```

## Constants
`Access Token`: Token for Mapbox API.\
`Tile ID`: Mapbox tile ID.\
`Initial Coordinates`: Default coordinates for specific cities.

```typescript
const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'
const tileID = 'YOUR_TILE_ID'

const initialCoordinates = {
    Muscat: [58.38, 23.58],
    Dubai: [55.27, 25.2],
    Tehran: [51.37, 35.74],
}
```

## Fetch GeoJSON Data
Fetches geoJSON data for a given coordinate.

```typescript
const fetchGeoJSON = async (center: [number, number]) => {
    const radius = 100000000
    const limit = 50
    const query = await fetch(
        `https://api.mapbox.com/v4/${tileID}/tilequery/${center[0]},${center[1]}.json?radius=${radius}&limit=${limit}&access_token=${accessToken}`,
        { method: 'GET' }
    )
    return await query.json()
}
```

## Main Component
```typescript
export default function MapComponent() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<Map | null>(null)
    const [lng, setLng] = useState<number>(initialCoordinates.Muscat[0])
    const [lat, setLat] = useState<number>(initialCoordinates.Muscat[1])
    const [zoom, setZoom] = useState<number>(12)
    const city = useSelector((state: RootState) => state.city.selectedCity)
    const dispatch = useDispatch()

    useEffect(() => {
        if (city) {
            const coordinates = initialCoordinates[city[0].name]
            if (coordinates) {
                setLng(coordinates[0])
                setLat(coordinates[1])
            }
        }
    }, [city])
}
```

## Fetch and Display GeoJSON Data
Fetches geoJSON data and updates the map.
```typescript
 const handleGeoJSONFetch = useCallback(
        async (center: [number, number]) => {
            try {
                const json: GeoJSONResponse = await fetchGeoJSON(center)
                const geoJSON = {
                    type: 'FeatureCollection',
                    features: json.features.map((feature) => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: feature.geometry.coordinates,
                        },
                        properties: feature.properties,
                    })),
                }

                if (mapRef.current?.getSource('tilequery')) {
                    mapRef.current.getSource('tilequery').setData(geoJSON)
                }
                dispatch(setGeoJSON(geoJSON))

                geoJSON.features.forEach((feature) => {
                    const coordinates = feature.geometry.coordinates
                    const properties = feature.properties as FeatureProperties
                    const el = document.createElement('div')
                    el.className = 'marker'
                    el.style.backgroundColor = 'white'
                    el.style.border = '1px solid gray'
                    el.style.padding = '5px'
                    el.style.borderRadius = '5px'
                    el.innerHTML = `$${properties.PRICE}`
                    el.style.textAlign = 'center'
                    el.style.width = '50px'

                    new mapboxgl.Marker(el)
                        .setLngLat(coordinates)
                        .addTo(mapRef.current!)
                })
            } catch (error) {
                console.error('Error fetching tile query results:', error)
            }
        },
        [dispatch, city]
    )
```

## Add Tile Query Source and Layer
Configures the map to display the tile query layer.

```typescript
    const addTileQuerySourceAndLayer = useCallback(() => {
        if (!mapRef.current) return

        mapRef.current.addSource('tilequery', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [],
            },
        })

        const popup = new mapboxgl.Popup()

        mapRef.current.on('mouseenter', 'tilequery-points', (event) => {
            const features = event.features
            if (features && features.length > 0) {
                mapRef.current!.getCanvas().style.cursor = 'pointer'
                const coordinates = features[0].geometry.coordinates.slice()
                const properties = features[0].properties as FeatureProperties
                popup
                    .setLngLat(coordinates)
                    .setDOMContent(
                        (() => {
                            const container = document.createElement('div')
                            const root = createRoot(container)
                            root.render(
                                <HoverCard
                                    bedroom={properties.BEDROOMS}
                                    bathroom={properties.BATHROOMS}
                                    price={properties.PRICE}
                                />
                            )
                            return container
                        })()
                    )
                    .addTo(mapRef.current!)
            }
        })

        mapRef.current.on('mouseleave', 'tilequery-points', () => {
            mapRef.current!.getCanvas().style.cursor = ''
            popup.remove()
        })

        mapRef.current.on('click', 'tilequery-points', (event) => {
            const features = event.features
            if (features && features.length > 0) {
                const properties = features[0].properties as FeatureProperties
                dispatch(setHotel(properties))
            }
        })
    }, [])
```

## Initialize Map
Initializes the map and sets up event listeners.

```typescript
    const initializeMap = useCallback(() => {
        if (mapRef.current) return

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
            accessToken,
        })

        mapRef.current.on('load', () => {
            addTileQuerySourceAndLayer()
            handleGeoJSONFetch([lng, lat])
        })

        mapRef.current.on('move', () => {
            const { lng, lat } = mapRef.current!.getCenter()
            setLng(Number(lng.toFixed(4)))
            setLat(Number(lat.toFixed(4)))
            setZoom(Number(mapRef.current!.getZoom().toFixed(2)))
        })

        mapRef.current!.on('style.load', () => {
            mapRef.current!.on('dblclick', (e) => {
                const coordinates = e.lngLat
                dispatch(
                    setNewHotel({
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                        ADDRESS_LINE1: '',
                        BATHROOMS: 0,
                        BEDROOMS: 0,
                        CITY: '',
                        COUNTRY: '',
                        GUESTS: 0,
                        HOTEL_NAME: '',
                        NBHD_NAME: '',
                        PRICE: 100,
                        RATING: 5,
                        TYPE: '',
                    })
                )
            })
        })
    }, [lng, lat, zoom, handleGeoJSONFetch, addTileQuerySourceAndLayer])
```

## Effect Hooks
Setup and update the map on component mount and city changes.

```typescript
    useEffect(() => {
        initializeMap()
    }, [initializeMap])

    useEffect(() => {
        if (mapRef.current && city) {
            mapRef.current.setCenter([lng, lat])
            handleGeoJSONFetch([lng, lat])
        }
    }, [handleGeoJSONFetch, city])

    return (
        <div className="cy-map h-full overflow-hidden rounded-xl">
            <div ref={mapContainerRef} className="h-full" />
            <NewHotel />
        </div>
    )
```