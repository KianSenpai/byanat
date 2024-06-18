import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import HotelCard from './HotelCard'

export default function Results() {
    const fetchedData = useSelector(
        (state: RootState) => state.fetchedData.fetchedData
    )

    console.log(fetchedData)
    return (
        <div className="flex flex-col gap-4">
            {fetchedData?.features.map((hotel) => (
                <HotelCard
                    title={hotel.properties.HOTEL_NAME}
                    rating={hotel.properties.RATING}
                    guest={hotel.properties.GUESTS}
                    bedroom={hotel.properties.BEDROOMS}
                    bathroom={hotel.properties.BEDROOMS}
                    price={hotel.properties.NBHD_NAME}
                    type={hotel.properties.TYPE}
                />
            ))}
        </div>
    )
}
