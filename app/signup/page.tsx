'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth'
import Link from 'next/link'

export default function SignUp() {
    const router = useRouter()
    const [producerName, setProducerName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signUp(email, password, producerName)
            setSuccess(true)
            // Redirect to login after successful signup
            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } catch (err: any) {
            setError(err.message || 'Failed to sign up')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen relative">
                <div className="flex flex-col justify-center items-center max-w-4xl gap-2 p-20 shadow-xl bg-white rounded-lg">
                    <h1 className="text-center text-4xl font-sans font-bold">Sign Up</h1>
                    <p className="mb-4">Create your ProducerWrapped account</p>
                    
                    {error && (
                        <div className="w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="w-full p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            Account created! Check your email to verify. Redirecting to sign in...
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="w-full">
                        <div className="flex flex-col mb-8 gap-10">
                            <input 
                                placeholder="Producer Name" 
                                className="p-2 pr-30 border-b-1 border-gray-500 outline-none focus:border-black transition-colors"
                                value={producerName}
                                onChange={(e) => setProducerName(e.target.value)}
                            />
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
                                minLength={6}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <button 
                                type="submit" 
                                className="w-full text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 rounded-md focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                            <p className="flex justify-center items-center text-sm">
                                Already have an account?{' '}
                                <Link href="/signin" className="ml-1 text-blue-600 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}