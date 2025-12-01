import Navbar from "../components/navbar";
import ProfileHeader from "./components/ProfileHeader";
import TrackSection from "./components/TrackSection";

export default function MyProfile() {

    const getTracks = async () => {
        
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <ProfileHeader />
                <TrackSection />
            </div>
        </>
    )
}