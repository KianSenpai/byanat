import { ChevronIcon, PhoneIcon } from '../../../assets/icons'
import { Avatar } from 'primereact/avatar'

export default function Profile() {
    return (
        <div className="hidden items-center gap-12 xl:flex">
            <div className="flex items-center gap-1">
                <PhoneIcon />
                <span className="font-light">+968 7115 2122</span>
            </div>
            <div className="flex items-center gap-2.5">
                <Avatar label="K" shape="circle" />
                <span className="font-bold">Kian AliAkbari</span>
                <ChevronIcon />
            </div>
        </div>
    )
}
