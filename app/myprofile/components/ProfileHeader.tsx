'use client'
import { useEffect, useState } from "react"
import { getUser } from '@/lib/auth'
import { createClient } from '@/utils/supabase/client'
import Image from "next/image"

const ProfileHeader = () => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
        // Check user on mount
        checkUser()

        // Listen for auth changes
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

            if (!currentUser) {
                console.log('No user found')
                return
            }

            const supabase = createClient()
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', currentUser.id)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                return
            }

            console.log('Profile data:', data)
            setProfile(data)

        } catch (error) {
            console.log('Catch error:', error)
        } finally {
            setLoading(false)
        }
    }
    
    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <p>Not logged in</p>
    }

    return (
        <>
            <div className="px-12 py-6 flex justify-center">
                <div className="flex max-w-7xl w-full">
                    <div className="flex w-1/5 border-2 justify-center items-center p-8 rounded-lg">
                        <Image src='window.svg' width={100} height = {100} alt="Picture" className="rounded-full overflow-hidden"/>
                    </div>
                    <div className="flex flex-col w-4/5 border-2 p-8 rounded-lg">
                        <h1 className="text-2xl font-bold">{user.email}</h1>
                        <p className="text-lg text-gray-600">
                            {profile ? profile.user_name : 'Loading profile...'}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader;