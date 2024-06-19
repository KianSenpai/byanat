import update from 'immutability-helper'
import { ReactNode, useCallback, useState, useEffect } from 'react'
import FieldCard from '../FieldCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'

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
    const newHotel = useSelector((state: RootState) => state.newHotel.hotel)
    const [area, setArea] = useState(newHotel?.NBHD_NAME || '')
    const [address, setAddress] = useState(newHotel?.ADDRESS_LINE1 || '')
    const [guest, setGuest] = useState(newHotel?.GUESTS || 0)
    const [bedroom, setBedroom] = useState(newHotel?.BEDROOMS || 0)
    const [bathroom, setBathroom] = useState(newHotel?.BATHROOMS || 0)
    const [type, setType] = useState(newHotel?.TYPE || types[0].code)
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (newHotel) {
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
    ]
    const [cards, setCards] = useState<Item[]>(initialCards)

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })
        )
    }, [])

    const renderCard = useCallback(
        (card: Item, index: number) => {
            return (
                <FieldCard
                    key={card.id}
                    index={index}
                    id={card.id}
                    moveCard={moveCard}
                >
                    {card.body}
                </FieldCard>
            )
        },
        [moveCard]
    )

    return (
        <div className="flex w-full flex-col gap-2 md:w-2/3">
            {cards.map((card, i) => renderCard(card, i))}
            <div className="grid w-full grid-cols-2">
                <span>Email (Just to show I can validate)</span>
                <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${validateEmail(email) ? '' : 'border-red-500'} border`}
                />
            </div>
        </div>
    )
}
