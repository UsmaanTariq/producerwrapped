import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get Spotify token
    const tokenResult = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Basic ' +
          Buffer.from(
            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
          ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    })

    if (!tokenResult.ok) {
      console.error('Failed to get Spotify token', await tokenResult.text())
      return NextResponse.json(
        { error: 'Failed to get Spotify token' },
        { status: 500 }
      )
    }

    const tokenData = await tokenResult.json()
    const accessToken = tokenData.access_token as string

    // Get playlists using search (more reliable with client credentials)
    const searchResult = await fetch(
      'https://api.spotify.com/v1/search?q=top%20hits&type=playlist&limit=50&offset=0',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!searchResult.ok) {
      const errorText = await searchResult.text()
      console.error('Failed to fetch playlists from Spotify:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch playlists', details: errorText },
        { status: 500 }
      )
    }

    const searchData = await searchResult.json()

    // NOTE: Search endpoint returns `playlists.items`
    return NextResponse.json({
      playlists: searchData.playlists?.items || [],
    })
  } catch (error) {
    console.error('Error getting featured playlists:', error)
    return NextResponse.json(
      { error: 'Failed to get featured playlists' },
      { status: 500 }
    )
  }
}
