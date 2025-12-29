'use client'

import { useEffect, useState } from 'react'
import { getFeaturedPlaylist } from '@/services/spotifyApi' // adjust path

export default function FeaturedPlaylists() {
  const [playlists, setPlaylists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        console.log('🔄 Starting to fetch playlists...')
        const data = await getFeaturedPlaylist()
        console.log('✅ Fetched playlists:', data)
        setPlaylists(data)
      } catch (err) {
        console.error('❌ Error fetching playlists:', err)
        setError('Failed to load featured playlists')
      } finally {
        setLoading(false)
        console.log('✨ Loading complete')
      }
    }
    load()
  }, [])

  const handleClick = () => {
    alert("BUTTON WORKS!!")
    console.log("🔘 Button clicked!")
    console.log("📋 Playlists:", playlists)
  }

  console.log('Current state:', { loading, error, playlistCount: playlists.length })

  if (loading) return (
    <div className="p-4 text-xl">
      Loading playlists... ⏳
    </div>
  )
  
  if (error) return (
    <div className="p-4">
      <p className="text-red-600 text-xl mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-3 bg-red-600 text-white rounded-lg"
      >
        Reload Page
      </button>
    </div>
  )

  return (
    <div className="p-4 relative z-50">
      <h1 className="text-2xl font-bold mb-4">Featured Playlists</h1>
      <button 
        onClick={handleClick} 
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer relative z-50"
        style={{ pointerEvents: 'auto' }}
      >
        Click Me 👆
      </button>
      <p className="mt-4 text-neutral-600">Found {playlists.length} playlists</p>
    </div>
  )
}
