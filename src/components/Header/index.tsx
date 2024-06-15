import Container from '../Container'
import { Logo } from '../../assets/icons.tsx'
import SearchBox from './SearchBox'

export default function Header() {
    return (
        <Container className="sticky top-0 flex items-center justify-between bg-white px-36 py-5 shadow-md">
            <div className="flex items-center gap-7">
                <Logo />
                <SearchBox />
            </div>
        </Container>
    )
}
