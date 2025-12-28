'use client'
import { useEffect, useState } from "react"
import { getUser } from '@/lib/auth'
import { createClient } from '@/utils/supabase/client'
import AvatarUpload from "./AvatarUpload"

interface ProfileHeaderProps {
    userStats?: any
    userProfile?: {
        user_name: string
        avatar_url: string | null
        email: string
    } | null
    loading?: boolean
}

const ProfileHeader = ({ userStats, userProfile, loading: statsLoading }: ProfileHeaderProps) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUser()

        const supabase = createClient()
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const checkUser = async () => {
        try {
            const currentUser = await getUser()
            setUser(currentUser)
        } catch (error) {
            console.log('Catch error:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toLocaleString()
    }

    const getMemberDuration = (createdAt: string) => {
        const created = new Date(createdAt)
        const now = new Date()
        const diffMs = now.getTime() - created.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        
        if (diffDays < 30) return `${diffDays} days`
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`
        const years = Math.floor(diffDays / 365)
        const months = Math.floor((diffDays % 365) / 30)
        return months > 0 ? `${years}y ${months}m` : `${years} year${years > 1 ? 's' : ''}`
    }

    if (loading) {
        return (
            <div className="px-6 md:px-12 py-8 flex justify-center items-center min-h-[320px] bg-neutral-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"></div>
                    <p className="text-sm text-neutral-500">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="px-6 md:px-12 py-8 flex justify-center items-center min-h-[320px] bg-neutral-50">
                <div className="text-center">
                    <p className="text-lg text-neutral-600 font-medium">Not logged in</p>
                    <p className="text-sm text-neutral-400 mt-1">Please sign in to view your profile</p>
                </div>
            </div>
        )
    }

    const totalStreams = userStats?.totalStreams?.total || 0
    const trackCount = userStats?.trackCount || 0
    const avgStreamsPerTrack = trackCount > 0 ? Math.round(totalStreams / trackCount) : 0

    return (
        <div className="px-6 md:px-12 py-8 bg-neutral-100">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                    {/* Main Profile Section */}
                    <div className="p-8 md:p-10">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            {/* Avatar Section */}
                            <div className="flex-shrink-0">
                                <AvatarUpload 
                                    userId={user.id} 
                                    currentAvatarUrl={userProfile?.avatar_url || undefined}
                                    onUploadComplete={(url) => {
                                        console.log('Avatar updated:', url)
                                    }}
                                />
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-block px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-full mb-3">
                                    Producer
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                                    {userProfile?.user_name || 'Producer'}
                                </h1>
                                <p className="text-neutral-500 mb-4">
                                    {userProfile?.email || user?.email}
                                </p>
                                
                                {/* Quick Stats Inline */}
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-neutral-600">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Member for {getMemberDuration(user.created_at)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                        {trackCount} track{trackCount !== 1 ? 's' : ''} produced
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="border-t border-neutral-200 bg-neutral-50">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
                            <div className="p-6 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                                    {statsLoading ? '—' : formatNumber(totalStreams)}
                                </p>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">
                                    Total Streams
                                </p>
                            </div>
                            <div className="p-6 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                                    {statsLoading ? '—' : trackCount}
                                </p>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">
                                    Tracks
                                </p>
                            </div>
                            <div className="p-6 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                                    {statsLoading ? '—' : formatNumber(avgStreamsPerTrack)}
                                </p>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">
                                    Avg per Track
                                </p>
                            </div>
                            <div className="p-6 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                                    {new Date(user.created_at).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        year: 'numeric' 
                                    })}
                                </p>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">
                                    Joined
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;