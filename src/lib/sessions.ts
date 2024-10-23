import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { Cache } from '@/lib/cache'
import { env } from '@/lib/env'

const sessionCache = new Cache<string>('sessions', 60) // 60 seconds TTL

// Define a type for cookie options
interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export async function getSession(force: boolean = false) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )

  // Check cache first unless force refresh is requested
  if (!force) {
    const cachedSession = await sessionCache.get('current')
    if (cachedSession) return JSON.parse(cachedSession)
  }

  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) {
    await sessionCache.del('current')
    return null
  }

  // Update last activity in Prisma
  if (session.user) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastActive: new Date() }
    })
  }

  // Cache the new session
  await sessionCache.set('current', JSON.stringify(session))
  
  return session
}

export async function refreshSession() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )

  const { data: { session }, error } = await supabase.auth.refreshSession()
  
  if (error || !session) {
    await sessionCache.del('current')
    return null
  }

  await sessionCache.set('current', JSON.stringify(session))
  
  return session
}
