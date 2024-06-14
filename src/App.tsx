import HotelCard from './components/HotelCard'

export default function App() {
    return (
        <div className="w-screen">
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
    )
}
