import Header from './components/Header'
import Container from './components/Container'
import WidgetContainer from './components/Widgets/WidgetContainer'
import MapComponent from './components/Map'
import Results from './components/Results'
import HotelInfo from './components/Modal/HotelInfo'

export default function App() {
    return (
        <div className="h-screen w-screen overflow-scroll bg-slate-50">
            <Header />
            <Container className="px-8 py-6">
                <div className="grid w-full grid-cols-5 gap-8">
                    <div className="col-span-2">
                        <Results />
                    </div>
                    <div className="col-span-3 h-full xl:col-span-2">
                        <MapComponent />
                    </div>
                    <WidgetContainer />
                </div>
                <HotelInfo />
            </Container>
        </div>
    )
}
