import { Skeleton } from 'primereact/skeleton'

interface IHoverCard {
    isLoading?: boolean
    image?: string
    bedroom?: number
    bathroom?: number
    price?: number | string
}

const HoverCardImage = ({ image }: { image?: string }) => (
    <div className="h-36 w-32 min-w-[128px] overflow-hidden rounded-2xl md:w-1/2">
        {image ? (
            <img src={image} alt="" className="h-full w-full" />
        ) : (
            <Skeleton width="100%" height="100%" />
        )}
    </div>
)

export default function HoverCard({
    isLoading,
    image,
    bedroom,
    bathroom,
    price,
}: IHoverCard) {
    return (
        <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-white pb-2.5 text-sm font-light shadow-md">
            <HoverCardImage image={image} />
            <span className="font-extrabold">${price}</span>
            <div className="flex gap-1">
                {bedroom && (
                    <span>
                        {bedroom} bed{bedroom > 1 ? 's' : ''} |
                    </span>
                )}
                {bathroom && (
                    <span>
                        {bathroom} bath{bathroom > 1 ? 's' : ''}
                    </span>
                )}
            </div>
        </div>
    )
}
