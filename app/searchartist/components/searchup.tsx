'use client'

import { useState } from 'react'
import { searchArtist } from '@/services/spotifyApi'

const SearchUp = () => {
    const [artistName, setArtistName] = useState('')
    const [artists, setArtists] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        if (!artistName.trim()) return
        
        setLoading(true)
        try {
            const results = await searchArtist(artistName)
            setArtists(results)
            console.log('Artist results:', results)
        } catch (error) {
            console.error('Error searching artist:', error)
            alert('Failed to search artist. Check console for details.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen relative p-6">
                <div className="flex flex-col justify-center items-center max-w-4xl gap-2 p-20 shadow-xl">
                    <h1 className="text-center text-4xl font-sans font-bold">Search Artist</h1>
                    <div className="flex flex-col mb-8 gap-10">
                        <input 
                            placeholder="Artist Name" 
                            className="p-2 pr-30 border-b-1 border-gray-500"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <button 
                            type="button" 
                            className="w-full text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 rounded-md focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55 disabled:opacity-50"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search Artist'}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {artists.length > 0 && (
                    <div className="mt-8 w-full max-w-4xl">
                        <h2 className="text-2xl font-bold mb-4">Search Results:</h2>
                        <div className="grid gap-4">
                            {artists.map((artist) => (
                                <div 
                                    key={artist.id} 
                                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    {artist.images && artist.images[0] && (
                                        <img 
                                            src={artist.images[0].url} 
                                            alt={artist.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{artist.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            Followers: {artist.followers?.total.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Genres: {artist.genres?.join(', ') || 'N/A'}
                                        </p>
                                    </div>
                                    <a 
                                        href={artist.external_urls.spotify} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        View on Spotify
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchUp