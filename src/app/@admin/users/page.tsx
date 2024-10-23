import { createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Database } from '@/types/supabase'
import { Metadata } from 'next'
import { routes } from '@/config/routes'

export const metadata: Metadata = {
  title: 'User Management | Admin Dashboard',
  description: 'Manage users of the SKY DUST AI platform',
}

export default async function UsersPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  
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
          <li key={user.id}>
            {user.name || 'Unnamed'} ({user.email})
            {user.is_admin && (
              <Link href={routes.adminDashboard} className="ml-2 text-blue-500 hover:underline">
                Admin Dashboard
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
