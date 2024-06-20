import Header from './components/Header'
import Container from './components/Container'
import WidgetContainer from './components/Widgets/WidgetContainer'
import MapComponent from './components/Map'
import Results from './components/Results'
import HotelInfo from './components/Modal/HotelInfo'
import Footer from './components/Footer'

export default function App() {
    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-50">
            <Header />
            <Container className="h-full px-4 py-6">
                <div
                    className="grid h-full w-full grid-cols-5 gap-8"
                    style={{ height: 'calc(100vh - 250px)' }}
                >
                    <div className="col-span-2 hidden md:flex">
                        <Results />
                    </div>
                    <div className="col-span-5 h-full md:col-span-3 xl:col-span-2">
                        <MapComponent />
                    </div>
                    <div className="hidden h-full xl:flex">
                        <WidgetContainer />
                    </div>
                </div>
                <Footer />
                <HotelInfo />
            </Container>
        </div>
    )
}
