import { Skeleton } from 'primereact/skeleton'

interface IHotelCard {
    isLoading: boolean
    image?: string
    title?: string
    rating?: number | string
    price?: string
    guest?: number
    bedroom?: number
    bathroom?: number
    type?: string
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'Entire Studio Apartment':
            return (
                <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="14.5" cy="14.5227" r="14" fill="#5E81F4" />
                    <g clip-path="url(#clip0_1_409)">
                        <path
                            d="M24.5 23.5H4.5V21.5H5.5V6.5C5.5 6.23478 5.60536 5.98043 5.79289 5.79289C5.98043 5.60536 6.23478 5.5 6.5 5.5H20.5C20.7652 5.5 21.0196 5.60536 21.2071 5.79289C21.3946 5.98043 21.5 6.23478 21.5 6.5V11.5H23.5V21.5H24.5V23.5ZM19.5 21.5H21.5V13.5H15.5V21.5H17.5V15.5H19.5V21.5ZM19.5 11.5V7.5H7.5V21.5H13.5V11.5H19.5ZM9.5 13.5H11.5V15.5H9.5V13.5ZM9.5 17.5H11.5V19.5H9.5V17.5ZM9.5 9.5H11.5V11.5H9.5V9.5Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_409">
                            <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(2.5 2.5)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )
        case 'Entire Home':
            return (
                <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="14.5" cy="14.5227" r="14" fill="#5E81F4" />
                    <path
                        d="M23.5 21.2327C23.5 21.4979 23.3946 21.7523 23.2071 21.9398C23.0196 22.1273 22.7652 22.2327 22.5 22.2327H6.5C6.23478 22.2327 5.98043 22.1273 5.79289 21.9398C5.60536 21.7523 5.5 21.4979 5.5 21.2327V10.7227C5.49989 10.5703 5.53462 10.4199 5.60152 10.283C5.66841 10.1461 5.76572 10.0263 5.886 9.93269L13.886 3.71069C14.0615 3.57414 14.2776 3.5 14.5 3.5C14.7224 3.5 14.9385 3.57414 15.114 3.71069L23.114 9.93269C23.2343 10.0263 23.3316 10.1461 23.3985 10.283C23.4654 10.4199 23.5001 10.5703 23.5 10.7227V21.2327ZM21.5 20.2327V11.2107L14.5 5.76669L7.5 11.2107V20.2327H21.5ZM9.5 16.2327H19.5V18.2327H9.5V16.2327Z"
                        fill="white"
                    />
                </svg>
            )
        case 'Share with Super Host':
            return (
                <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="14.5" cy="14.5227" r="14" fill="#5E81F4" />
                    <path
                        d="M14.5 6.3507L9.55 11.3007C8.57111 12.2797 7.90449 13.527 7.63445 14.8848C7.36442 16.2427 7.50308 17.6501 8.03292 18.9291C8.56275 20.2082 9.45996 21.3014 10.6111 22.0705C11.7622 22.8397 13.1156 23.2502 14.5 23.2502C15.8844 23.2502 17.2378 22.8397 18.3889 22.0705C19.54 21.3014 20.4373 20.2082 20.9671 18.9291C21.4969 17.6501 21.6356 16.2427 21.3656 14.8848C21.0955 13.527 20.4289 12.2797 19.45 11.3007L14.5 6.3507ZM14.5 3.52271L20.864 9.88671C22.1227 11.1454 22.9798 12.749 23.3271 14.4949C23.6743 16.2407 23.4961 18.0503 22.8149 19.6948C22.1337 21.3393 20.9802 22.7449 19.5001 23.7339C18.0201 24.7228 16.28 25.2506 14.5 25.2506C12.72 25.2506 10.9799 24.7228 9.49988 23.7339C8.01984 22.7449 6.86629 21.3393 6.1851 19.6948C5.50391 18.0503 5.32567 16.2407 5.67293 14.4949C6.02019 12.749 6.87734 11.1454 8.136 9.88671L14.5 3.52271ZM9.5 16.2507H19.5C19.5 17.5768 18.9732 18.8486 18.0355 19.7862C17.0979 20.7239 15.8261 21.2507 14.5 21.2507C13.1739 21.2507 11.9022 20.7239 10.9645 19.7862C10.0268 18.8486 9.5 17.5768 9.5 16.2507Z"
                        fill="white"
                    />
                    <circle cx="11.5" cy="13.5227" r="1" fill="white" />
                    <circle cx="17.5" cy="13.5227" r="1" fill="white" />
                </svg>
            )
        default:
            return <></>
    }
}

export default function HotelCard({
    isLoading,
    image,
    title,
    rating,
    price,
    guest,
    bedroom,
    bathroom,
    type,
}: IHotelCard) {
    return (
        <div className="flex w-full flex-col items-center justify-between gap-2.5 rounded-2xl bg-white p-2.5 md:flex-row">
            {isLoading ? (
                <>
                    <div className="h-40 w-full overflow-hidden rounded-2xl md:w-1/2">
                        <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="flex w-full flex-col gap-3.5 p-2.5 md:w-1/2">
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
                            <Skeleton
                                width="28px"
                                height="28px"
                                borderRadius="50%"
                            />
                            <Skeleton width="112px" height="24px" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="h-40 w-full overflow-hidden rounded-2xl md:w-1/2">
                        {image ? (
                            <img
                                src={image}
                                alt={''}
                                className="h-full w-full"
                            />
                        ) : (
                            <Skeleton width="100%" height="100%" />
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-3.5 p-2.5 text-sm font-light md:w-1/2">
                        {title && (
                            <span className="text-lg font-extrabold">
                                {title}
                            </span>
                        )}
                        <div className="flex items-center gap-5">
                            {rating && (
                                <div className="flex items-center gap-1">
                                    <svg
                                        width="15"
                                        height="14"
                                        viewBox="0 0 15 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.24888 1.02611C6.8358 0.0821344 8.20967 0.0821353 8.79659 1.02611L10.0561 3.05186C10.2626 3.38399 10.5907 3.62233 10.9703 3.71609L13.2862 4.28797C14.3653 4.55446 14.7899 5.86109 14.0734 6.71099L12.5361 8.53485C12.284 8.83388 12.1587 9.21952 12.1868 9.6096L12.3586 11.9888C12.4386 13.0975 11.3271 13.905 10.2974 13.4863L8.08777 12.5878C7.72548 12.4404 7.31999 12.4404 6.95771 12.5878L4.74803 13.4863C3.71835 13.905 2.60686 13.0975 2.68689 11.9888L2.85863 9.6096C2.88678 9.21952 2.76148 8.83388 2.50942 8.53485L0.972025 6.71098C0.255622 5.86109 0.680173 4.55446 1.75931 4.28797L4.07513 3.71609C4.45481 3.62233 4.78287 3.38399 4.98937 3.05186L6.24888 1.02611Z"
                                            fill="#F6C002"
                                        />
                                    </svg>
                                    <span>{rating}</span>
                                </div>
                            )}
                            {price && <span>{price}</span>}
                        </div>
                        <div className="flex gap-1">
                            {guest && (
                                <span>
                                    {guest} guest{guest > 1 ? 's' : ''} |
                                </span>
                            )}
                            {bedroom && (
                                <span>
                                    {bedroom} bedroom
                                    {bedroom > 1 ? 's' : ''} |
                                </span>
                            )}
                            {bathroom && (
                                <span>
                                    {bathroom} bathroom
                                    {bathroom > 1 ? 's' : ''}
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
                </>
            )}
        </div>
    )
}
