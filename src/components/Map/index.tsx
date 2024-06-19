import mapboxgl, { Map } from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FeatureProperties, GeoJSONResponse } from '../../assets/types'
import { useDispatch, useSelector } from 'react-redux'
import { setGeoJSON } from '../../store/slices/geojsonSlice'
import { RootState } from '../../store'
import HoverCard from './HoverCard'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

const accessToken =
    'pk.eyJ1Ijoia2lhYWF3biIsImEiOiJja3Q2MWxjdTQwZTY2MnBqcDNkODZoejJnIn0.X7ayP4QCy30wrYV41LlaOg'
const tileID = 'kiaaawn.c8xnqxjp'

const initialCoordinates = {
    Muscat: [58.38, 23.58],
    Dubai: [55.27, 25.2],
    Tehran: [51.37, 35.74],
}

const fetchGeoJSON = async (center: [number, number]) => {
    const radius = 100000000
    const limit = 50
    const query = await fetch(
        `https://api.mapbox.com/v4/${tileID}/tilequery/${center[0]},${center[1]}.json?radius=${radius}&limit=${limit}&access_token=${accessToken}`,
        { method: 'GET' }
    )
    return await query.json()
}

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
            console.log(coordinates)
            if (coordinates) {
                setLng(coordinates[0])
                setLat(coordinates[1])
            }
        }
    }, [city])

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
            } catch (error) {
                console.error('Error fetching tile query results:', error)
            }
        },
        [dispatch, city]
    )

    const addTileQuerySourceAndLayer = useCallback(() => {
        if (!mapRef.current) return

        mapRef.current.addSource('tilequery', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [],
            },
        })

        mapRef.current.addLayer({
            id: 'tilequery-points',
            type: 'circle',
            source: 'tilequery',
            paint: {
                'circle-stroke-color': 'red',
                'circle-stroke-width': {
                    stops: [
                        [0, 0.1],
                        [18, 3],
                    ],
                    base: 5,
                },
                'circle-radius': {
                    stops: [
                        [12, 5],
                        [22, 180],
                    ],
                    base: 5,
                },
                'circle-color': 'blue',
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
    }, [])

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
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML('You clicked here: <br/>' + coordinates)
                    .addTo(mapRef.current!)
            })
        })
    }, [lng, lat, zoom, handleGeoJSONFetch, addTileQuerySourceAndLayer])

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
        <div className="h-full">
            <div ref={mapContainerRef} className="h-full" />
        </div>
    )
}
