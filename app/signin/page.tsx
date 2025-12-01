'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth'
import Link from 'next/link'

export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signIn(email, password)
            // Redirect to dashboard after successful login
            router.push('/searchtrack')
        } catch (err: any) {
            setError(err.message || 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen relative">
                <div className="flex flex-col justify-center items-center max-w-4xl gap-2 p-20 shadow-xl bg-white rounded-lg">
                    <h1 className="text-center text-4xl font-sans font-bold">Sign In</h1>
                    <p className="mb-4">Welcome back to ProducerWrapped</p>
                    
                    {error && (
                        <div className="w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="w-full">
                        <div className="flex flex-col mb-8 gap-10">
                            <input 
                                type="email"
                                placeholder="Enter Email" 
                                className="p-2 pr-30 border-b-1 border-gray-500 outline-none focus:border-black transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input 
                                type="password"
                                placeholder="Enter Password" 
                                className="p-2 pr-30 border-b-1 border-gray-500 outline-none focus:border-black transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <button 
                                type="submit" 
                                className="w-full text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 rounded-md focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                            <p className="flex justify-center items-center text-sm text-gray-600">
                                Forgot your password?
                            </p>
                            <p className="flex justify-center items-center text-sm">
                                Don't have an account?{' '}
                                <Link href="/signup" className="ml-1 text-blue-600 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}