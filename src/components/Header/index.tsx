import Container from '../Container'
import { Logo } from '../../assets/icons'
import SearchBox from './SearchBox'
import Profile from './Profile'

export default function Header() {
    return (
        <Container className="bg-white px-4 py-5 shadow-md md:px-36">
            <div className="flex items-center justify-center xl:justify-between">
                <div className="flex items-center gap-7">
                    <div className="hidden md:flex">
                        <Logo />
                    </div>
                    <SearchBox />
                </div>
                <Profile />
            </div>
        </Container>
    )
}
