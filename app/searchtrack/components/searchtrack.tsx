'use client'
import { createClient } from '@/utils/supabase/client'

import { useState } from 'react'
import { searchTrack } from '@/services/spotifyApi'
import { convertSegmentPathToStaticExportFilename } from 'next/dist/shared/lib/segment-cache/segment-value-encoding'
import AddButton from './addtrack'
import Image from 'next/image'
const SearchTrack = () => {
    const extractTracks = async () => {
        const supabase = createClient()
        const { data: tracks} = await supabase.from("tracks").select();

        return { data: tracks}
    }

    const [trackName, setTrackName] = useState('')
    const [tracks, setTracks] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        if (!trackName.trim()) return
        
        setLoading(true)
        try {
            const results = await searchTrack(trackName)
            setTracks(results)
            console.log('Track results:', results)
        } catch (error) {
            console.error('Error searching track:', error)
            alert('Failed to search track. Check console for details.')
        } finally {
            setLoading(false)
        }
    }

    const handleTrackAdd = async () => {

    }

    return (
        <div className="flex gap-6 px-8 py-8 min-h-screen">
            {/* Left Sidebar - Search & Filters */}
            <div className="w-96 flex-shrink-0">
                <div className="sticky top-8 space-y-6">
                    {/* Search Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Track</h1>
                            <p className="text-sm text-gray-600">Search for songs to add to your credits</p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                    placeholder="Search for a track..." 
                                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    value={trackName}
                                    onChange={(e) => setTrackName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <button 
                                type="button" 
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg font-semibold px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching...
                                    </span>
                                ) : 'Search'}
                            </button>
                        </div>
                    </div>

                    {/* Placeholder for future features */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Tips</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Search by track name or artist</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Add your role after selecting a track</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Track streams update automatically</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side - Results */}
            <div className="flex-1 min-w-0">
                {tracks.length > 0 ? (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Search Results <span className="text-gray-500 font-normal">({tracks.length})</span>
                        </h2>
                        <div className="space-y-4">
                            {tracks.map((track) => (
                                <div 
                                    key={track.id} 
                                    className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                                >
                                    {track.album?.images && track.album.images[0] && (
                                        <Image
                                            src={track.album.images[0].url} 
                                            alt={track.name}
                                            className="h-20 w-20 rounded-lg object-cover shadow-sm flex-shrink-0"
                                            height={80}
                                            width={80}
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 truncate">{track.name}</h3>
                                        <p className="text-sm text-gray-600 truncate">
                                            {track.artists?.map((artist: any) => artist.name).join(', ')}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {track.album?.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                {new Date(track.album?.release_date).getFullYear()}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md">
                                                Popularity: {track.popularity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        <a 
                                            href={track.external_urls.spotify} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] text-center text-sm whitespace-nowrap font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                            Spotify
                                        </a>
                                        <AddButton 
                                            trackID={track.id}
                                            artist={track.artists?.map((artist: any) => artist.name).join(', ')}
                                            albumName={track.album.name}
                                            releaseDate={track.album.release_date}
                                            trackName={track.name}
                                            score={track.popularity}
                                            spotify_url={track.external_urls.spotify}
                                            image_url={track.album?.images[0].url}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-16 text-center border border-gray-200 h-full flex flex-col items-center justify-center">
                        {loading ? (
                            <>
                                <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900">Searching...</h3>
                            </>
                        ) : trackName ? (
                            <>
                                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-600">Try searching with a different track name</p>
                            </>
                        ) : (
                            <>
                                <svg className="w-20 h-20 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Search for Tracks</h3>
                                <p className="text-gray-600 max-w-md">Enter a track name in the search box to find songs and add them to your production credits</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchTrack

