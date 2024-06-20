import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Pane, SortablePane } from 'react-sortable-pane'
import { Button } from 'primereact/button'
import { FeatureProperties } from '../../../../assets/types'
import { setNewHotel } from '../../../../store/slices/newHotelSlice'
import { Toast } from 'primereact/toast'

interface Item {
    id: number
    body: ReactNode
}

const types = [
    {
        name: 'Entire Studio Apartment',
        code: 'Entire Studio Apartment',
    },
    { name: 'Entire Home', code: 'Entire Home' },
    {
        name: 'Share with Super Host',
        code: 'Share with Super Host',
    },
]

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

export default function FieldContainer() {
    const toast = useRef(null)

    const newHotel = useSelector((state: RootState) => state.newHotel.hotel)

    const [name, setName] = useState(newHotel?.HOTEL_NAME || '')
    const [area, setArea] = useState(newHotel?.NBHD_NAME || '')
    const [address, setAddress] = useState(newHotel?.ADDRESS_LINE1 || '')
    const [guest, setGuest] = useState(newHotel?.GUESTS || 0)
    const [bedroom, setBedroom] = useState(newHotel?.BEDROOMS || 0)
    const [bathroom, setBathroom] = useState(newHotel?.BATHROOMS || 0)
    const [type, setType] = useState(newHotel?.TYPE || types[0].code)
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (newHotel) {
            setName(newHotel.HOTEL_NAME || '')
            setArea(newHotel.NBHD_NAME || '')
            setAddress(newHotel.ADDRESS_LINE1 || '')
            setGuest(newHotel.GUESTS || 0)
            setBedroom(newHotel.BEDROOMS || 0)
            setBathroom(newHotel.BATHROOMS || 0)
            setType(newHotel.TYPE || types[0].code)
        }
    }, [newHotel])

    const initialCards: Item[] = [
        {
            id: 1,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Area</span>
                    <InputText
                        value={area}
                        onChange={(e) => {
                            setArea(e.target.value)
                        }}
                        className="border"
                    />
                </div>
            ),
        },
        {
            id: 2,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Address</span>
                    <InputText
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border"
                    />
                </div>
            ),
        },
        {
            id: 3,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Guests</span>
                    <InputNumber
                        value={guest}
                        onValueChange={(e) => setGuest(Number(e.value))}
                        min={0}
                        max={100}
                        className="border"
                    />
                </div>
            ),
        },
        {
            id: 4,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Bedrooms</span>
                    <InputNumber
                        value={bedroom}
                        onValueChange={(e) => setBedroom(Number(e.value))}
                        min={0}
                        max={100}
                        className="border"
                    />
                </div>
            ),
        },
        {
            id: 5,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Bathrooms</span>
                    <InputNumber
                        value={bathroom}
                        onValueChange={(e) => setBathroom(Number(e.value))}
                        min={0}
                        max={100}
                        className="border"
                    />
                </div>
            ),
        },
        {
            id: 6,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Type</span>
                    <Dropdown
                        value={type}
                        onChange={(e) => setType(e.value)}
                        options={types}
                        optionLabel="name"
                        placeholder="Select a type"
                        className="border"
                    />
                </div>
            ),
        },
        {
            id: 7,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Coordinate</span>
                    <span>
                        {newHotel?.latitude}, {newHotel?.longitude}
                    </span>
                </div>
            ),
        },
        {
            id: 8,
            body: (
                <div className="grid w-full grid-cols-2">
                    <span>Email (Just to show I can validate)</span>
                    <InputText
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${validateEmail(email) ? '' : 'border-red-500'} border`}
                    />
                </div>
            ),
        },
    ]

    const showWarn = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.current.show({
            severity: 'warn',
            summary: 'Warning',
            detail: 'All data are saved in redux, now we need an API to send data and recall the map API to get new data',
            life: 3000,
        })
    }

    const handleClick = () => {
        const hotelData: FeatureProperties = {
            HOTEL_NAME: name.length ? name : 'default hotel',
            NBHD_NAME: area.length ? area : 'default area',
            ADDRESS_LINE1: address.length ? address : 'default address',
            PRICE: 1000,
            RATING: 5,
            BATHROOMS: bathroom ? bathroom : 1,
            BEDROOMS: bedroom ? bedroom : 1,
            GUESTS: guest ? guest : 1,
            CITY: 'aaa',
            COUNTRY: 'aaa',
            TYPE: type.length ? type : 'Entire Studio Apartment',
            latitude: newHotel?.latitude || 0,
            longitude: newHotel?.longitude || 0,
        }

        dispatch(setNewHotel(hotelData))
        showWarn()
    }

    const renderCard = useCallback((card: Item) => {
        return (
            <Pane
                key={card.id}
                className="w-full"
                resizable={{ x: false, y: false, xy: false }}
            >
                {card.body}
            </Pane>
        )
    }, [])

    return (
        <div className="flex w-full flex-col justify-between md:w-2/3">
            <Toast ref={toast} />
            <SortablePane direction="vertical" className="w-full" margin={16}>
                {initialCards.map((card) => renderCard(card))}
            </SortablePane>
            <Button
                label="confirm"
                className="mt-96 border border-slate-200 px-8 py-4"
                onClick={handleClick}
            />
        </div>
    )
}
