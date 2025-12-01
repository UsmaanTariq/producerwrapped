import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

interface AddButtonProps {
    trackID: string
    artist: string
    albumName: string
    releaseDate: string
    trackName: string
    score: number
}

const addButton = ({trackID, artist, albumName, releaseDate, trackName, score}: AddButtonProps) => {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const addTrack = async () => {
        console.log('Adding track:', trackID)
        try {
            setLoading(true)
            const {data: {user}, error: userError} = await supabase.auth.getUser()

            if (userError || !user) {
                console.error('User not authenticated:', userError)
                alert('Please sign in to add tracks')
                return
            }

            const {data: uploadedTrack, error } = await supabase.from("tracks").insert([{
                track_id: trackID,
                artist_name: artist,
                album_name: albumName,
                track_name: trackName,
                popularity: score
            }]).select().single()


            if (error) {
                console.log('Error saving track: ', error)
                return
            } 
            
            if (!uploadedTrack) {
                console.error('No track data returned')
                return
            }

            console.log("Track saved successfully!")

            const trackId = uploadedTrack.id

            const {error: userTrackError} = await supabase.from('user_tracks').insert([{
                user_id: user.id, 
                track_id: trackId
            }])

            if (userTrackError) {
                console.error('Error relating to user: ', userTrackError)
            } else {
                console.log('Track added for user successfully')
                alert('Track added to your collection!')
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={() => addTrack()}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? 'Adding...' : 'Add Track'}
        </button>
    )
}

export default addButton