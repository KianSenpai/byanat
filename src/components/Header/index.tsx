import Container from '../Container'
import { Logo } from '../../assets/icons.tsx'
import SearchBox from './SearchBox'
import Profile from './Profile'

export default function Header() {
    return (
        <Container className="sticky top-0 bg-white px-36 py-5 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-7">
                    <Logo />
                    <SearchBox />
                </div>
                <Profile />
            </div>
        </Container>
    )
}
