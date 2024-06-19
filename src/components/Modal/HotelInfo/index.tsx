import Modal from '../index.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setHotel } from '../../../store/slices/hotelSlice.ts'
import hotelPic from '../../../assets/hotel.jpeg'
import { Rating } from 'primereact/rating'

export default function HotelInfo() {
    const hotel = useSelector((state: RootState) => state.hotel.hotel)

    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(setHotel(null))
    }

    return (
        <Modal open={!!hotel} onClose={onClose} title={hotel?.HOTEL_NAME}>
            <div className="flex w-full flex-col items-center gap-5">
                <img
                    src={hotelPic}
                    alt={hotel?.HOTEL_NAME}
                    className="w-full md:w-1/2"
                />
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2">
                        <span>Area</span>
                        <span>
                            {hotel?.NBHD_NAME}, {hotel?.CITY}
                        </span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Address</span>
                        <span>{hotel?.ADDRESS_LINE1}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Bedrooms</span>
                        <span>{hotel?.BEDROOMS}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Bathrooms</span>
                        <span>{hotel?.BATHROOMS}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Guests</span>
                        <span>{hotel?.GUESTS}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Rating</span>
                        <Rating value={hotel?.RATING} readOnly cancel={false} />
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Type</span>
                        <span>{hotel?.TYPE}</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
