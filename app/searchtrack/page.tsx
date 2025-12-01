import Navbar from '../components/navbar'
import SearchTrack from './components/searchtrack'

export default function SearchTrackPage() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col h-screen justify-center items-center">
                <SearchTrack />
            </div>
        </>
    )
}

