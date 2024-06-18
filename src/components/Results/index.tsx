import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import HotelCard from './HotelCard'

export default function Results() {
    const geojson = useSelector((state: RootState) => state.geojson.geojson)
    const filter = useSelector(
        (state: RootState) => state.filter.selectedFilter
    )
    const city = useSelector((state: RootState) => state.city.selectedCity)

    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            <span className="text-3xl font-extrabold">
                Results in {city ? city[0].name : ''}
            </span>
            {geojson?.features
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
                .map((hotel) => (
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
                ))}
        </div>
    )
}
