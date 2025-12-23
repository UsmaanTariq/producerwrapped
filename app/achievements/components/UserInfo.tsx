import Image from "next/image"

interface UserProfile {
    user_name: string
    avatar_url: string | null
    email: string
}

interface UserInfoProps {
    userProfile: UserProfile | null
}

const UserInfo = ({userProfile}: UserInfoProps) => {
    const avatarUrl = userProfile?.avatar_url || '/default-avatar.png'
    
    return (
        <>
            <div className="flex items-center gap-6 border border-gray-300 rounded-xl p-8 bg-white shadow-md justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 ">
                    {userProfile?.avatar_url ? (
                        <Image 
                            src={userProfile.avatar_url} 
                            alt={userProfile.user_name} 
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                            {userProfile?.user_name?.charAt(0).toUpperCase() || '?'}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">{userProfile ? userProfile.user_name : 'Welcome'}</h1>
                    <h1 className="text-4xl font-bold mt-1">1,000,000 Streams</h1>
                </div>
            </div>
        </>
    )
}

export default UserInfo