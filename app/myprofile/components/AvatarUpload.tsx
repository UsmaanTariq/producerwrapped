// app/myprofile/components/AvatarUpload.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

interface AvatarUploadProps {
    userId: string
    currentAvatarUrl?: string
    onUploadComplete?: (url: string) => void
}

export default function AvatarUpload({ userId, currentAvatarUrl, onUploadComplete }: AvatarUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl)

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${userId}/avatar.${fileExt}`

            const supabase = createClient()

            // Upload image to storage
            const { error: uploadError } = await supabase.storage
                .from('avatar')
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatar')
                .getPublicUrl(fileName)

            // Update user profile with avatar URL
            console.log('Updating user with ID:', userId, 'URL:', publicUrl)
            const { error: updateError } = await supabase
                .from('users')
                .update({ avatar_url: publicUrl })
                .eq('user_id', userId)

            if (updateError) {
                console.error('Update error:', updateError)
                throw updateError
            }

            setAvatarUrl(publicUrl)
            onUploadComplete?.(publicUrl)
            
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Avatar Preview */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-zinc-800 border-4 border-zinc-700">
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                )}
            </div>

            {/* Upload Button */}
            <label className="cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                {uploading ? 'Uploading...' : 'Change Photo'}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                />
            </label>
        </div>
    )
}