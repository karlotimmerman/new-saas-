import { createServerClient, CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

// Utility to get authenticated user
async function getAuthenticatedUser() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, {
              ...options,
              // Add any missing properties required by Next.js cookies
              httpOnly: options.httpOnly ?? true,
              secure: options.secure ?? process.env.NODE_ENV === 'production',
            })
          } catch {
            // Handle cookie error in development
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, '', {
              ...options,
              maxAge: 0,
              // Add any missing properties required by Next.js cookies
              httpOnly: options.httpOnly ?? true,
              secure: options.secure ?? process.env.NODE_ENV === 'production',
            })
          } catch {
            // Handle cookie error in development
          }
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Unauthorized')
  
  return user
}

// Secure database operations
export async function getProjects() {
  const user = await getAuthenticatedUser()
  
  return prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createProject(data: CreateProjectInput) {
  const user = await getAuthenticatedUser()
  
  return prisma.project.create({
    data: {
      ...data,
      userId: user.id // Ensure project is created for authenticated user
    }
  })
}

// Example of admin-only operation
export async function getAllUsers() {
  const user = await getAuthenticatedUser()
  
  // Check if user is admin using Supabase metadata
  if (!user.user_metadata?.is_admin) {
    throw new Error('Forbidden')
  }
  
  return prisma.user.findMany({
    include: { profile: true }
  })
}
