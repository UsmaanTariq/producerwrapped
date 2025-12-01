import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const trackName = searchParams.get('name')

        if (!trackName) {
            return NextResponse.json({ error: 'Track name is required' }, { status: 400 })
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

        // Search for tracks
        const searchResult = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track&limit=20`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )

        const searchData = await searchResult.json()
        
        return NextResponse.json({
            tracks: searchData.tracks.items
        })
    } catch (error) {
        console.error('Error searching track:', error)
        return NextResponse.json({ error: 'Failed to search track' }, { status: 500 })
    }
}

