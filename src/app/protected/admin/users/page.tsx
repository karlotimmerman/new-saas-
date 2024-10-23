import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function UsersPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: users, error } = await supabase.from('users').select('*')

  if (error) {
    console.error('Error fetching users:', error)
    return <div>Error loading users</div>
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  )
}
