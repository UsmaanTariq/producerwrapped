import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')
            },
            body: 'grant_type=client_credentials'
        })

        const data = await result.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get token' }, { status: 500 })
    }
}