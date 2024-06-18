import Header from './components/Header'
import Container from './components/Container'
import WidgetContainer from './components/Widgets/WidgetContainer'
import MapComponent from './components/Map'
import Results from './components/Results'

export default function App() {
    return (
        <>
            <Header />
            <Container className="bg-slate-50 px-8 py-6">
                <div className="grid grid-cols-5">
                    <div className="col-span-2 flex flex-col gap-4">
                        <Results />
                    </div>
                    <div className="col-span-2">
                        <MapComponent />
                    </div>
                    <WidgetContainer />
                </div>
            </Container>
        </>
    )
}
