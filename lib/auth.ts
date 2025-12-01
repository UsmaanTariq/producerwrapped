import { createClient } from '@/utils/supabase/client'

export async function signUp(email: string, password: string, username: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  
  if (!data.user) {
    throw new Error('No user returned from signup')
  }

  const {data: userData, error: userError} = await supabase
    .from("users")
    .insert([{
      user_id: data.user.id, 
      email: email, 
      user_name: username
    }])
  
  if (userError) throw userError
  
  return data
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) throw error
}

export async function getUser() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  return user
}

export async function getSession() {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  return session
}

