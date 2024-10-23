'use server'

import { createAction } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function addUser(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createAction(cookieStore)

  const name = formData.get('name') as string
  const email = formData.get('email') as string

  const { data, error } = await supabase
    .from('users')
    .insert({ name, email })
    .select()

  if (error) {
    console.error('Error adding user:', error)
    return { success: false, error: error.message }
  }

  return { success: true, user: data[0] }
}
