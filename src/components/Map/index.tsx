import mapboxgl, { Map, GeoJSONSource } from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken =
    'pk.eyJ1Ijoia2lhYWF3biIsImEiOiJja3Q2MWxjdTQwZTY2MnBqcDNkODZoejJnIn0.X7ayP4QCy30wrYV41LlaOg'
const tileID = 'kiaaawn.a1a23zgn'

interface FeatureProperties {
    HOTEL_NAME: string
    ADDRESS_LINE1: string
    CITY: string
    COUNTRY: string
}

interface Feature {
    type: string
    geometry: {
        type: string
        coordinates: number[]
    }
    properties: FeatureProperties
}

interface GeoJSONResponse {
    type: string
    features: Feature[]
}

export default function MapComponent(): JSX.Element {
    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<Map | null>(null)
    const [lng, setLng] = useState<number>(58.38)
    const [lat, setLat] = useState<number>(23.58)
    const [zoom, setZoom] = useState<number>(12)

    const fetchData = useCallback(async (center: [number, number]) => {
        const radius = 10000000 // 1609 meters is roughly equal to one mile
        const limit = 50 // The maximum amount of results to return

        try {
            const query = await fetch(
                `https://api.mapbox.com/v4/${tileID}/tilequery/${center[0]},${center[1]}.json?radius=${radius}&limit=${limit}&access_token=${accessToken}`,
                { method: 'GET' }
            )
            const json: GeoJSONResponse = await query.json()

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
        } catch (error) {
            console.error('Error fetching tile query results:', error)
        }
    }, [])

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
                const content = `<h3>${properties.HOTEL_NAME}</h3>
            <p>${properties.ADDRESS_LINE1}</p>
            <p>${properties.CITY}, ${properties.COUNTRY}</p>`
                popup
                    .setLngLat(coordinates)
                    .setHTML(content)
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
            fetchData([lng, lat])
        })

        mapRef.current.on('move', () => {
            const { lng, lat } = mapRef.current!.getCenter()
            setLng(Number(lng.toFixed(4)))
            setLat(Number(lat.toFixed(4)))
            setZoom(Number(mapRef.current!.getZoom().toFixed(2)))
        })
    }, [lng, lat, zoom, fetchData, addTileQuerySourceAndLayer])

    useEffect(() => {
        initializeMap()
    }, [initializeMap])

    return (
        <div className="h-full">
            <div ref={mapContainerRef} className="h-full" />
        </div>
    )
}