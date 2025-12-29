'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, XAxis, YAxis, Bar, AreaChart, Area } from 'recharts'
import StreamsByArtist from "./graphs/StreamsByArtist"
import ProductionStreakGraph from "./ProductionStreakGraph"

interface ProfileInsightProps {
    userStats?: any
    loading?: boolean
    error?: string | null
}

const ProfileInsight = ({ userStats, loading, error }: ProfileInsightProps) => {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toLocaleString()
    }

    if (loading) {
        return (
            <div className="w-full bg-neutral-50 min-h-screen p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-neutral-200 rounded w-48 mb-6"></div>
                        <div className="h-64 bg-white rounded-xl border border-neutral-200 mb-6"></div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="h-32 bg-white rounded-xl border border-neutral-200"></div>
                            <div className="h-32 bg-white rounded-xl border border-neutral-200"></div>
                            <div className="h-32 bg-white rounded-xl border border-neutral-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full bg-neutral-50 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <p className="text-red-600 font-medium">Error loading insights: {error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-neutral-50 min-h-screen p-6">
            <div className="max-w-12xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-neutral-900">Your Insights</h1>
                        {userStats?.totalStreams?.total > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#1DB954] bg-opacity-10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[white]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path>
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-[#FF0000] bg-opacity-10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[white]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-neutral-900 bg-opacity-10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    {userStats?.totalStreams?.total > 0 && (
                        <div className="text-right">
                            <p className="text-sm text-neutral-500">Total Impact</p>
                            <p className="text-2xl font-bold text-neutral-900">
                                {formatNumber(userStats.totalStreams.total)}
                            </p>
                        </div>
                    )}
                </div>

                {/* Production Streak Graph */}
                <ProductionStreakGraph 
                    tracks={userStats?.trackReleaseDates || []} 
                    loading={loading} 
                />

                {userStats?.totalStreams?.total > 0 ? (
                    <>
                        {/* Platform Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Spotify Card */}
                            <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-[#1DB954] bg-opacity-10 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-[white]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                        </svg>
                                    </div>
                                    <div className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                                        {((userStats.totalStreams.spotify / userStats.totalStreams.total) * 100).toFixed(0)}%
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Spotify Streams</p>
                                    <p className="text-3xl font-bold text-neutral-900">
                                        {formatNumber(userStats.totalStreams.spotify)}
                                    </p>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        {userStats.totalStreams.spotify.toLocaleString()} total plays
                                    </p>
                                </div>
                            </div>

                            {/* YouTube Card */}
                            <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-[#FF0000] bg-opacity-10 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-[white]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </div>
                                    <div className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                                        {((userStats.totalStreams.youtube / userStats.totalStreams.total) * 100).toFixed(0)}%
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 mb-1">YouTube Views</p>
                                    <p className="text-3xl font-bold text-neutral-900">
                                        {formatNumber(userStats.totalStreams.youtube)}
                                    </p>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        {userStats.totalStreams.youtube.toLocaleString()} total views
                                    </p>
                                </div>
                            </div>

                            {/* Combined Total Card */}
                            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                        </svg>
                                    </div>
                                    <div className="text-xs font-medium text-neutral-400 bg-white bg-opacity-10 px-2 py-1 rounded-full">
                                        Combined
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-400 mb-1">Total Reach</p>
                                    <p className="text-3xl font-bold text-white">
                                        {formatNumber(userStats.totalStreams.total)}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Across all platforms
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Platform Distribution Donut */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-6">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Platform Distribution</h3>
                            <div className="flex items-center gap-8">
                                <ResponsiveContainer width="40%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Spotify', value: userStats.totalStreams.spotify },
                                                { name: 'YouTube', value: userStats.totalStreams.youtube }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={110}
                                            fill="#8884d8"
                                            dataKey="value"
                                            paddingAngle={2}
                                        >
                                            <Cell fill="#1DB954" />
                                            <Cell fill="#FF0000" />
                                        </Pie>
                                        <Tooltip formatter={(value: number) => value.toLocaleString()} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#1DB954]"></div>
                                                <span className="text-sm font-medium text-neutral-700">Spotify</span>
                                            </div>
                                            <span className="text-sm font-bold text-neutral-900">
                                                {((userStats.totalStreams.spotify / userStats.totalStreams.total) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-neutral-100 rounded-full h-2">
                                            <div 
                                                className="bg-[#1DB954] h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(userStats.totalStreams.spotify / userStats.totalStreams.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#FF0000]"></div>
                                                <span className="text-sm font-medium text-neutral-700">YouTube</span>
                                            </div>
                                            <span className="text-sm font-bold text-neutral-900">
                                                {((userStats.totalStreams.youtube / userStats.totalStreams.total) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-neutral-100 rounded-full h-2">
                                            <div 
                                                className="bg-[#FF0000] h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(userStats.totalStreams.youtube / userStats.totalStreams.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-neutral-200">
                                        <p className="text-sm text-neutral-500">
                                            Your content has reached <span className="font-bold text-neutral-900">{formatNumber(userStats.totalStreams.total)}</span> listeners across both platforms
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">No stream data available yet</h3>
                        <p className="text-neutral-500">Add some tracks to get started and see your insights!</p>
                    </div>
                )}

                {/* Charts Row - Top Tracks and Streams by Role */}
                {(userStats?.topTracks && userStats.topTracks.length > 0) || (userStats?.streamsByRole && userStats.streamsByRole.length > 0) ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Tracks Bar Chart */}
                        {userStats?.topTracks && userStats.topTracks.length > 0 && (
                            <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-neutral-900">Top 5 Tracks</h3>
                                    <p className="text-sm text-neutral-500 mt-1">Your most popular songs by total streams</p>
                                </div>
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart 
                                        data={userStats.topTracks}
                                        margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
                                    >
                                        <XAxis 
                                            dataKey="track_name"
                                            angle={-20}
                                            height={60}
                                            interval={0}
                                            tick={{ fontSize: 10, fill: '#737373' }}
                                            tickFormatter={(value: string) => 
                                                value.length > 12 ? `${value.substring(0, 12)}...` : value
                                            }
                                        />
                                        <YAxis hide />
                                        <Tooltip 
                                            formatter={(value: number) => value.toLocaleString()}
                                            labelFormatter={(label) => `Track: ${label}`}
                                            contentStyle={{ 
                                                backgroundColor: 'white', 
                                                border: '1px solid #e5e5e5',
                                                borderRadius: '8px',
                                                padding: '8px'
                                            }}
                                        />
                                        <Bar 
                                            dataKey="total_streams" 
                                            fill="#171717"
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
                        )}

                        {/* Streams by Role Bar Chart */}
                        {userStats?.streamsByRole && userStats.streamsByRole.length > 0 && (
                            <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-neutral-900">Streams by Role</h3>
                                    <p className="text-sm text-neutral-500 mt-1">Performance breakdown by production role</p>
                                </div>
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart 
                                        data={userStats.streamsByRole}
                                        margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
                                    >
                                        <XAxis 
                                            dataKey="role"
                                            angle={-20}
                                            height={60}
                                            interval={0}
                                            tick={{ fontSize: 10, fill: '#737373' }}
                                            tickFormatter={(value: string) => 
                                                value.length > 10 ? `${value.substring(0, 10)}...` : value
                                            }
                                        />
                                        <YAxis hide />
                                        <Tooltip 
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload
                                                    return (
                                                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-lg">
                                                            <p className="font-semibold text-neutral-900 mb-2">{data.role}</p>
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
                                            fill="#525252"
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
                        )}
                    </div>
                ) : null}
                {/* Streams Trend Area Chart */}
                {userStats?.streamsByDate && userStats.streamsByDate.length > 0 && (
                    <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-neutral-900">7-Day Stream Trends</h3>
                            <p className="text-sm text-neutral-500 mt-1">Your streaming performance over the past week</p>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <AreaChart
                                data={userStats.streamsByDate}
                                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                            >
                                <defs>
                                    <linearGradient id="colorSpotify" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#1DB954" stopOpacity={0.05}/>
                                    </linearGradient>
                                    <linearGradient id="colorYoutube" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#FF0000" stopOpacity={0.05}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="date"
                                    tickFormatter={(value: string) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                    }}
                                    tick={{ fontSize: 11, fill: '#737373' }}
                                    stroke="#e5e5e5"
                                />
                                <YAxis 
                                    tick={{ fontSize: 11, fill: '#737373' }}
                                    tickFormatter={(value: number) => {
                                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                                        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                                        return value.toString()
                                    }}
                                    stroke="#e5e5e5"
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload
                                            const date = new Date(data.date)
                                            return (
                                                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-lg">
                                                    <p className="font-semibold text-neutral-900 mb-2">
                                                        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                    </p>
                                                    <p className="text-sm text-neutral-700 mb-1">Total: <span className="font-semibold">{data.total_streams.toLocaleString()}</span></p>
                                                    <p className="text-sm text-[#1DB954]">Spotify: {data.spotify_streams.toLocaleString()}</p>
                                                    <p className="text-sm text-[#FF0000]">YouTube: {data.youtube_streams.toLocaleString()}</p>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="spotify_streams" 
                                    stackId="1"
                                    stroke="#1DB954" 
                                    fill="url(#colorSpotify)"
                                    strokeWidth={2}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="youtube_streams" 
                                    stackId="1"
                                    stroke="#FF0000" 
                                    fill="url(#colorYoutube)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-neutral-100">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#1DB954]"></div>
                                <span className="text-sm text-neutral-600">Spotify</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF0000]"></div>
                                <span className="text-sm text-neutral-600">YouTube</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Streams by Artist */}
                {userStats?.streamsByArtist && userStats.streamsByArtist.length > 0 && (
                    <StreamsByArtist streamsByArtist={userStats.streamsByArtist} />
                )}
            </div>
        </div>
    )
}

export default ProfileInsight;