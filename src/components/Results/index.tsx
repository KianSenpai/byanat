import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import HotelCard from './HotelCard'
import { DataScroller } from 'primereact/datascroller'
import { Feature, FeatureProperties } from '../../assets/types.ts'
import { setHotel } from '../../store/slices/hotelSlice.ts'
import FilterContainer from './FilterContainer'
import { useState } from 'react'

export default function Results() {
    const [selectedFilter, setSelectedFilter] = useState('')
    const dispatch = useDispatch()
    const geojson = useSelector((state: RootState) => state.geojson.geojson)
    const filter = useSelector(
        (state: RootState) => state.filter.selectedFilter
    )
    const city = useSelector((state: RootState) => state.city.selectedCity)
    const handleClick = (hotel: FeatureProperties) => dispatch(setHotel(hotel))

    const itemTemplate = (hotel: Feature) => {
        return (
            <div
                className="cursor-pointer"
                onClick={() => handleClick(hotel.properties)}
            >
                <HotelCard
                    key={hotel.properties?.HOTEL_NAME}
                    title={hotel.properties?.HOTEL_NAME}
                    rating={hotel.properties?.RATING}
                    guest={hotel.properties?.GUESTS}
                    bedroom={hotel.properties?.BEDROOMS}
                    bathroom={hotel.properties?.BATHROOMS}
                    area={hotel.properties?.NBHD_NAME}
                    type={hotel.properties?.TYPE}
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <span className="text-3xl font-extrabold">
                Results in {city ? city[0].name : ''}
            </span>
            <FilterContainer onChange={(e) => setSelectedFilter(e)} />
            {geojson ? (
                <DataScroller
                    value={geojson?.features
                        .filter((hotel) => {
                            if (!filter) return hotel

                            const rating = Number(filter)
                            if (!isNaN(rating)) {
                                switch (rating) {
                                    case 3:
                                        return hotel.properties?.RATING < 3
                                    case 4:
                                        return (
                                            hotel.properties?.RATING >= 3 &&
                                            hotel.properties?.RATING < 4
                                        )
                                    case 5:
                                        return hotel.properties?.RATING >= 4
                                    default:
                                        return hotel
                                }
                            }

                            return hotel.properties?.TYPE === filter
                        })
                        .sort((a, b) => {
                            if (selectedFilter === 'price') {
                                return a.properties?.PRICE - b.properties?.PRICE
                            }
                            if (selectedFilter === 'name') {
                                if (
                                    a.properties?.HOTEL_NAME <
                                    b.properties?.HOTEL_NAME
                                )
                                    return -1
                                if (
                                    a.properties?.HOTEL_NAME >
                                    b.properties?.HOTEL_NAME
                                )
                                    return 1
                                return 0
                            }
                            return
                        })}
                    itemTemplate={itemTemplate}
                    rows={100}
                    inline
                    scrollHeight="calc(100vh - 250px)"
                />
            ) : (
                <div
                    className="flex flex-col"
                    style={{ height: 'calc(100vh - 250px)' }}
                >
                    <HotelCard isLoading={true} />
                    <HotelCard isLoading={true} />
                    <HotelCard isLoading={true} />
                    <HotelCard isLoading={true} />
                </div>
            )}
        </div>
    )
}
