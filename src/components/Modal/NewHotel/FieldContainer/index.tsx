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
import { Checkbox } from 'primereact/checkbox'

interface Item {
    id: number
    body: ReactNode
    name: string
}

interface FormData {
    name: string
    area: string
    address: string
    guest: number
    bedroom: number
    bathroom: number
    type: string
    email: string
}

const types = [
    { name: 'Entire Studio Apartment', code: 'Entire Studio Apartment' },
    { name: 'Entire Home', code: 'Entire Home' },
    { name: 'Share with Super Host', code: 'Share with Super Host' },
]

const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

export default function FieldContainer() {
    const toast = useRef<Toast>(null)
    const dispatch = useDispatch()
    const newHotel = useSelector((state: RootState) => state.newHotel.hotel)

    const [fields, setFields] = useState<Item[]>([])
    const [formData, setFormData] = useState<FormData>({
        name: newHotel?.HOTEL_NAME || '',
        area: newHotel?.NBHD_NAME || '',
        address: newHotel?.ADDRESS_LINE1 || '',
        guest: newHotel?.GUESTS || 0,
        bedroom: newHotel?.BEDROOMS || 0,
        bathroom: newHotel?.BATHROOMS || 0,
        type: newHotel?.TYPE || types[0].code,
        email: '',
    })

    useEffect(() => {
        if (newHotel) {
            setFormData({
                name: newHotel.HOTEL_NAME || '',
                area: newHotel.NBHD_NAME || '',
                address: newHotel.ADDRESS_LINE1 || '',
                guest: newHotel.GUESTS || 0,
                bedroom: newHotel.BEDROOMS || 0,
                bathroom: newHotel.BATHROOMS || 0,
                type: newHotel.TYPE || types[0].code,
                email: '',
            })
        }
    }, [newHotel])

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const renderInput = (
        field: keyof FormData,
        label: string,
        isValid = true
    ) => (
        <div className="grid w-full grid-cols-2">
            <span>{label}</span>
            <InputText
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`${isValid ? '' : 'border-red-500'} border`}
            />
        </div>
    )

    const renderNumberInput = (field: keyof FormData, label: string) => (
        <div className="grid w-full grid-cols-2">
            <span>{label}</span>
            <InputNumber
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                value={formData[field]}
                onValueChange={(e) => handleInputChange(field, e.value)}
                min={0}
                max={100}
                className="border"
            />
        </div>
    )

    const renderDropdown = (field: keyof FormData, label: string) => (
        <div className="grid w-full grid-cols-2">
            <span>{label}</span>
            <Dropdown
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.value)}
                options={types}
                optionLabel="name"
                placeholder="Select a type"
                className="border"
            />
        </div>
    )

    const renderCoordinate = () => (
        <div className="grid w-full grid-cols-2">
            <span>Coordinate</span>
            <span>
                {newHotel?.latitude}, {newHotel?.longitude}
            </span>
        </div>
    )

    const initialCards: Item[] = [
        { id: 1, name: 'Area', body: renderInput('area', 'Area') },
        { id: 2, name: 'Address', body: renderInput('address', 'Address') },
        { id: 3, name: 'Guests', body: renderNumberInput('guest', 'Guests') },
        {
            id: 4,
            name: 'Bedrooms',
            body: renderNumberInput('bedroom', 'Bedrooms'),
        },
        {
            id: 5,
            name: 'Bathrooms',
            body: renderNumberInput('bathroom', 'Bathrooms'),
        },
        { id: 6, name: 'Type', body: renderDropdown('type', 'Type') },
        { id: 7, name: 'Coordinate', body: renderCoordinate() },
        {
            id: 8,
            name: 'Email',
            body: renderInput(
                'email',
                'Email (Just to show I can validate)',
                validateEmail(formData.email)
            ),
        },
    ]

    const showWarn = () => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Warning',
            detail: 'All data are saved in redux, now we need an API to send data and recall the map API to get new data',
            life: 3000,
        })
    }

    const handleClick = () => {
        const hotelData: FeatureProperties = {
            HOTEL_NAME: formData.name || 'default hotel',
            NBHD_NAME: formData.area || 'default area',
            ADDRESS_LINE1: formData.address || 'default address',
            PRICE: 1000,
            RATING: 5,
            BATHROOMS: formData.bathroom || 1,
            BEDROOMS: formData.bedroom || 1,
            GUESTS: formData.guest || 1,
            CITY: 'aaa',
            COUNTRY: 'aaa',
            TYPE: formData.type || 'Entire Studio Apartment',
            latitude: newHotel?.latitude || 0,
            longitude: newHotel?.longitude || 0,
        }

        dispatch(setNewHotel(hotelData))
        showWarn()
    }

    const renderCard = useCallback(
        (card: Item) => (
            <Pane
                key={card.id}
                className="my-4 w-full"
                resizable={{ x: false, y: false, xy: false }}
            >
                {card.body}
            </Pane>
        ),
        []
    )

    const onCategoryChange = (e: { checked: boolean; value: number }) => {
        const selectedCards = e.checked
            ? [...fields, initialCards.find((card) => card.id === e.value)!]
            : fields.filter((f) => f.id !== e.value)
        setFields(selectedCards)
    }

    return (
        <div className="flex w-full flex-col justify-between md:w-2/3">
            <Toast ref={toast} />
            <div className="flex flex-wrap gap-3">
                {initialCards.map((card) => (
                    <div key={card.id} className="flex items-center">
                        <Checkbox
                            inputId={card.name}
                            name="category"
                            value={card.id}
                            onChange={(e) =>
                                onCategoryChange({
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    checked: e.checked,
                                    value: card.id,
                                })
                            }
                            checked={fields.some((item) => item.id === card.id)}
                        />
                        <label htmlFor={card.name} className="ml-2">
                            {card.name}
                        </label>
                    </div>
                ))}
            </div>
            <SortablePane
                direction="vertical"
                className="h-56 w-full"
                margin={16}
            >
                {fields.map((card) => renderCard(card))}
            </SortablePane>
            <Button
                label="confirm"
                className="mt-96 border border-slate-200 px-8 py-4"
                onClick={handleClick}
            />
        </div>
    )
}
