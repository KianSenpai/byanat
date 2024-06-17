import HotelCard from './components/HotelCard'
import Header from './components/Header'
import Container from './components/Container'
import WidgetContainer from './components/Widgets/WidgetContainer'

export default function App() {
    return (
        <>
            <Header />
            <Container className="bg-slate-50 px-8 py-6">
                <div className="grid grid-cols-5">
                    <div className="col-span-2 flex flex-col gap-4">
                        <HotelCard
                            isLoading={false}
                            title="hello"
                            rating={3.2}
                            bedroom={2}
                            guest={3}
                            type="Entire Home"
                            bathroom={1}
                            price="10$"
                        />
                        <HotelCard
                            isLoading={false}
                            title="hello"
                            rating={3.2}
                            bedroom={2}
                            guest={3}
                            type="Entire Home"
                            bathroom={1}
                            price="10$"
                        />
                        <HotelCard
                            isLoading={false}
                            title="hello"
                            rating={3.2}
                            bedroom={2}
                            guest={3}
                            type="Entire Home"
                            bathroom={1}
                            price="10$"
                        />
                    </div>
                    <div className="col-span-2"></div>
                    <WidgetContainer />
                </div>
            </Container>
        </>
    )
}
