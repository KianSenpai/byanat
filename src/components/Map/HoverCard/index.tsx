import { Skeleton } from 'primereact/skeleton'
import hotel from '../../../assets/hotel.jpeg'

interface IHoverCard {
    isLoading?: boolean
    image?: string
    bedroom?: number
    bathroom?: number
    price?: number | string
}

const HoverCardImage = ({ image }: { image?: string }) => (
    <div className="h-36 w-32 min-w-[128px] max-w-[128px] overflow-hidden rounded-2xl md:w-1/2">
        {image ? (
            <img
                src={image}
                alt="Hotel"
                className="h-full w-full object-cover"
            />
        ) : (
            <Skeleton width="100%" height="100%" />
        )}
    </div>
)

const HoverCardLoading = () => (
    <div className="cy-loading flex flex-col items-center gap-2.5">
        <Skeleton width="50px" height="24px" />
        <div className="flex gap-5">
            <Skeleton width="50px" height="24px" />
            <Skeleton width="50px" height="24px" />
        </div>
    </div>
)

export default function HoverCard({
    isLoading = false,
    image,
    bedroom,
    bathroom,
    price,
}: IHoverCard) {
    return (
        <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-white pb-2.5 text-sm font-light shadow-md">
            <HoverCardImage image={isLoading ? undefined : image || hotel} />
            {isLoading ? (
                <HoverCardLoading />
            ) : (
                <>
                    {price && (
                        <span className="text-lg font-extrabold">${price}</span>
                    )}
                    <div className="flex gap-1">
                        {bedroom !== undefined && (
                            <span>
                                {bedroom} bed{bedroom !== 1 ? 's' : ''} |
                            </span>
                        )}
                        {bathroom !== undefined && (
                            <span>
                                {bathroom} bath{bathroom !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
