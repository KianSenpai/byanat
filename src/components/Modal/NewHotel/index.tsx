import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setNewHotel } from '../../../store/slices/newHotelSlice.ts'
import hotelPic from '../../../assets/hotel.jpeg'
import Modal from '../index.tsx'
import FieldContainer from './FieldContainer'

export default function NewHotel() {
    const newHotel = useSelector((state: RootState) => state.newHotel.hotel)

    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(setNewHotel(null))
    }

    return (
        <Modal open={!!newHotel} onClose={onClose} title="Add new hotel">
            <div className="flex w-full flex-col items-center gap-5 md:h-[600px]">
                <img
                    src={hotelPic}
                    alt={newHotel?.HOTEL_NAME}
                    className="w-full md:w-1/2"
                />
                <FieldContainer />
            </div>
        </Modal>
    )
}
