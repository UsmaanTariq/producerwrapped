import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const artistId = searchParams.get('id')

        if (!artistId) {
            return NextResponse.json({ error: 'Artist ID is required' }, { status: 400 })
        }

        // Get Spotify token
        const tokenResult = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')
            },
            body: 'grant_type=client_credentials'
        })

        const tokenData = await tokenResult.json()
        const accessToken = tokenData.access_token

        // Get artist's top tracks
        const topTracksResult = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )

        const topTracksData = await topTracksResult.json()

        // Get artist's albums to get more tracks
        const albumsResult = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=50`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )

        const albumsData = await albumsResult.json()
        
        return NextResponse.json({
            topTracks: topTracksData.tracks,
            albums: albumsData.items
        })
    } catch (error) {
        console.error('Error fetching artist tracks:', error)
        return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 })
    }
}

