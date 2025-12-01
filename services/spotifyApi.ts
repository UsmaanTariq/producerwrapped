export async function getSpotifyToken() {
    const response = await fetch('/api/spotify/token')
    if (!response.ok) throw new Error('Failed to get token')
    const data = await response.json()
    console.log(data)
    return data.access_token
}

export async function searchArtist(artistName: string) {
    const response = await fetch(`/api/spotify/search-artist?name=${encodeURIComponent(artistName)}`)
    if (!response.ok) throw new Error('Failed to search artist')
    const data = await response.json()
    console.log(data)
    return data.artists
}

export async function searchTrack(trackName: string) {
    const response = await fetch(`/api/spotify/search-track?name=${encodeURIComponent(trackName)}`)
    if (!response.ok) throw new Error('Failed to search track')
    const data = await response.json()
    return data.tracks
}

export async function getArtistTracks(artistId: string) {
    const response = await fetch(`/api/spotify/artist-tracks?id=${artistId}`)
    if (!response.ok) throw new Error('Failed to get artist tracks')
    const data = await response.json()
    return data
}

const _getGenres = async (token: string) => {
    const result = await fetch('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json()
    return data.categories.items;
}