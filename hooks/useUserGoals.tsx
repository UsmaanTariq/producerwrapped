// hooks/useProfileInsights.ts
'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getUser } from '@/lib/auth'
import { getUserGoals } from '@/lib/database/goals'

type UseUserGoalsResult = {
  user: any | null
  userGoals: any | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useUserGoals(): UseUserGoalsResult {
  const supabase = useMemo(() => createClient(), [])

  const [user, setUser] = useState<any | null>(null)
  const [userGoals, setUserGoals] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1) Load initial user + subscribe to auth changes
  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        setLoading(true)
        const currentUser = await getUser()
        if (mounted) setUser(currentUser ?? null)
      } catch (e: any) {
        if (mounted) setError(e?.message ?? 'Failed to load user')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  // 2) Fetch stats whenever user.id changes
  const fetchStats = async (userId: string) => {
    setError(null)
    setLoading(true)
    try {
      const data = await getUserGoals(userId)
      setUserGoals(data)
      console.log(userGoals)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load stats')
      setUserGoals(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user?.id) {
      setUserGoals(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const data = await getUserGoals(user.id)
        if (!cancelled) setUserGoals(data)
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load stats')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id])

  return {
    user,
    userGoals,
    loading,
    error,
    refetch: async () => {
      if (!user?.id) return
      await fetchStats(user.id)
    },
  }
}
