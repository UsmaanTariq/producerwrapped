'use client'
import { ResponsiveContainer, BarChart, XAxis, Tooltip, YAxis, Bar } from "recharts"

const StreamsByArtist = ({streamsByArtist}: { streamsByArtist: any[]}) => {
    if (!streamsByArtist.length) return null

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toLocaleString()
    }

    return (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-neutral-900">Streams by Artist</h3>
                <p className="text-sm text-neutral-500 mt-1">Performance breakdown by artists you've worked with</p>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={streamsByArtist} margin={{ top: 20, right: 10, left: 10, bottom: 50 }}>
                <XAxis
                    dataKey="artist"
                    angle={-20}
                    height={60}
                    interval={0}
                    tick={{ fontSize: 11, fill: '#737373' }}
                    tickFormatter={(value: string) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
                />
                <YAxis hide />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-lg">
                                    <p className="font-semibold text-neutral-900 mb-2">{data.artist}</p>
                                    <p className="text-sm text-neutral-700">Total: <span className="font-semibold">{data.total_streams.toLocaleString()}</span></p>
                                    <p className="text-sm text-[#1DB954]">Spotify: {data.spotify_streams.toLocaleString()}</p>
                                    <p className="text-sm text-[#FF0000]">YouTube: {data.youtube_streams.toLocaleString()}</p>
                                    <p className="text-xs text-neutral-500 mt-1 pt-1 border-t border-neutral-100">{data.track_count} track{data.track_count !== 1 ? 's' : ''}</p>
                                </div>
                            )
                        }
                        return null
                    }}
                />
                <Bar 
                    dataKey="total_streams" 
                    fill="#404040"
                    radius={[8, 8, 0, 0]}
                    label={{
                        position: 'top',
                        formatter: (value: any) => typeof value === 'number' ? formatNumber(value) : value,
                        fontSize: 11,
                        fill: '#171717',
                        fontWeight: 600
                    }}
                />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StreamsByArtist;