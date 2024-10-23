import type { User } from '@supabase/supabase-js'

export type UserRole = 'admin' | 'team-owner' | 'user'

export interface TeamAccess {
  teamId: string
  role: 'owner' | 'member'
}

export interface AuthenticatedRequest {
  userId: string
  userRole: UserRole
  isAdmin: boolean
  isTeamOwner: boolean
  teamAccess?: TeamAccess[]
  sessionRefreshed?: boolean
}

export interface SessionUpdate {
  refreshed: boolean
  user: User | null
  error?: {
    code: string
    message: string
  }
}

export interface MiddlewareResponse {
  success: boolean
  redirect?: string
  error?: {
    code: string
    message: string
  }
}

export type RouteProtectionLevel = 'public' | 'protected' | 'admin' | 'team-owner'

// Define accessible routes for team owners
export const TEAM_OWNER_ROUTES = [
  '/usage',
  '/cost',
  '/settings',
  '/team',
  '/billing',
  '/limits'
] as const

export type TeamOwnerRoute = typeof TEAM_OWNER_ROUTES[number]

// Permission checker type
export type PermissionChecker = (
  userRole: UserRole,
  pathname: string
) => boolean