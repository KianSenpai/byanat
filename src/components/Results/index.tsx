import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import HotelCard from './HotelCard'

export default function Results() {
    const fetchedData = useSelector(
        (state: RootState) => state.fetchedData.fetchedData
    )

    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            <span className="text-3xl font-extrabold">Results in here</span>
            {fetchedData?.features.map((hotel) => (
                <HotelCard
                    key={hotel.properties.HOTEL_NAME}
                    title={hotel.properties.HOTEL_NAME}
                    rating={hotel.properties.RATING}
                    guest={hotel.properties.GUESTS}
                    bedroom={hotel.properties.BEDROOMS}
                    bathroom={hotel.properties.BATHROOMS}
                    area={hotel.properties.NBHD_NAME}
                    type={hotel.properties.TYPE}
                />
            ))}
        </div>
    )
}
