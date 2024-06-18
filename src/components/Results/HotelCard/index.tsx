import { Skeleton } from 'primereact/skeleton'
import {
    EntireHomeIcon,
    EntireStudioApartmentIcon,
    ShareWithSuperHostIcon,
    StarIcon,
} from '../../../assets/icons.tsx'

interface IHotelCard {
    isLoading?: boolean
    image?: string
    title?: string
    rating?: number | string
    area?: string
    guest?: number
    bedroom?: number
    bathroom?: number
    type?: string
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'Entire Studio Apartment':
            return <EntireStudioApartmentIcon />
        case 'Entire Home':
            return <EntireHomeIcon />
        case 'Share with Super Host':
            return <ShareWithSuperHostIcon />
        default:
            return null
    }
}

const HotelCardImage = ({ image }: { image?: string }) => (
    <div className="h-40 w-full overflow-hidden rounded-2xl md:w-1/2">
        {image ? (
            <img src={image} alt="" className="h-full w-full" />
        ) : (
            <Skeleton width="100%" height="100%" />
        )}
    </div>
)

const HotelCardLoading = () => (
    <div className="cy-hotelcard-loading flex w-full flex-col gap-3.5 p-2.5 md:w-1/2">
        <Skeleton width="100%" height="24px" />
        <div className="flex gap-5">
            <Skeleton width="48px" height="24px" />
            <Skeleton width="140px" height="24px" />
        </div>
        <div className="flex gap-5">
            <Skeleton width="60px" height="24px" />
            <Skeleton width="60px" height="24px" />
            <Skeleton width="60px" height="24px" />
        </div>
        <div className="flex items-center gap-2.5">
            <Skeleton width="28px" height="28px" borderRadius="50%" />
            <Skeleton width="112px" height="24px" />
        </div>
    </div>
)

const HotelCardData = ({
    title,
    rating,
    area,
    guest,
    bedroom,
    bathroom,
    type,
}: IHotelCard) => (
    <div className="cy-hotelcard-data flex w-full flex-col gap-3.5 p-2.5 text-sm font-light md:w-1/2">
        {title && <span className="text-lg font-extrabold">{title}</span>}
        <div className="flex items-center gap-5">
            {rating && (
                <div className="flex items-center gap-1">
                    <StarIcon />
                    <span>{rating}</span>
                </div>
            )}
            {area && <span>{area}</span>}
        </div>
        <div className="flex gap-1">
            {guest && (
                <span>
                    {guest} guest{guest > 1 ? 's' : ''} |
                </span>
            )}
            {bedroom && (
                <span>
                    {bedroom} bedroom{bedroom > 1 ? 's' : ''} |
                </span>
            )}
            {bathroom && (
                <span>
                    {bathroom} bathroom{bathroom > 1 ? 's' : ''}
                </span>
            )}
        </div>
        {type && (
            <div className="flex items-center gap-2.5">
                {getTypeIcon(type)}
                <span>{type}</span>
            </div>
        )}
    </div>
)

export default function HotelCard({
    isLoading,
    image,
    title,
    rating,
    area,
    guest,
    bedroom,
    bathroom,
    type,
}: IHotelCard) {
    return (
        <div className="cy-hotelcard flex w-full flex-col items-center justify-between gap-2.5 rounded-2xl bg-white p-2.5 shadow-md md:flex-row">
            {isLoading ? (
                <>
                    <HotelCardImage />
                    <HotelCardLoading />
                </>
            ) : (
                <>
                    <HotelCardImage image={image} />
                    <HotelCardData
                        title={title}
                        rating={rating}
                        area={area}
                        guest={guest}
                        bedroom={bedroom}
                        bathroom={bathroom}
                        type={type}
                    />
                </>
            )}
        </div>
    )
}
