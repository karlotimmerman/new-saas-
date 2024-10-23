import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@/types/supabase"
import type { AuthenticatedRequest, UserRole } from "@/types/middleware"
import { prisma } from "@/lib/prisma"

// Function to determine user role from metadata
function determineUserRole(metadata: Record<string, unknown> | undefined): UserRole {
  if (metadata?.is_admin) return "admin"
  if (metadata?.is_team_owner) return "team-owner"
  return "user"
}

// Function to validate team access
async function validateTeamAccess(userId: string, teamId: string) {
  const member = await prisma.teamMember.findUnique({
    where: {
      teamId_userId: {
        teamId,
        userId
      }
    }
  })
  return member?.role || null
}

export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user) {
      // Determine user role
      const userRole = determineUserRole(session.user.user_metadata)
      
      // Add base user info to headers
      response.headers.set("x-user-id", session.user.id)
      response.headers.set("x-user-role", userRole)

      // Handle team context if present
      const teamId = session.user.user_metadata?.team_id as string | undefined
      if (teamId) {
        try {
          const teamRole = await validateTeamAccess(session.user.id, teamId)
          if (teamRole) {
            response.headers.set("x-team-id", teamId)
            response.headers.set("x-team-role", teamRole)
          }
        } catch (error) {
          console.error("Team validation error:", error)
        }
      }

      // Check if session needs refresh
      if (session.expires_at && session.expires_at * 1000 < Date.now() + 60_000) {
        const { data: refreshData } = await supabase.auth.refreshSession()
        if (refreshData.session) {
          response.headers.set("x-session-refreshed", "true")
        }
      }

      // Sync with Prisma (minimal sync in middleware)
      await prisma.user.update({
        where: { id: session.user.id },
        data: { lastActive: new Date() }
      }).catch(console.error) // Non-blocking update
    }

    return response
  } catch (error) {
    console.error("Session update error:", error)
    return response
  }
}

// Helper to get user info from request
export function getUserFromRequest(req: Request): AuthenticatedRequest {
  const userRole = req.headers.get("x-user-role") as UserRole | null
  const teamRole = req.headers.get("x-team-role") as string | null

  return {
    userId: req.headers.get("x-user-id") ?? "",
    userRole: userRole ?? "user",
    isAdmin: userRole === "admin",
    isTeamOwner: userRole === "team-owner",
    teamAccess: teamRole ? [{
      teamId: req.headers.get("x-team-id") ?? "",
      role: teamRole as "OWNER" | "ADMIN" | "MEMBER"
    }] : undefined,
    sessionRefreshed: req.headers.get("x-session-refreshed") === "true"
  }
}

// Helper to check team access
export function hasTeamAccess(
  req: Request,
  requiredRole: "OWNER" | "ADMIN" | "MEMBER" | "ANY" = "ANY"
): boolean {
  const user = getUserFromRequest(req)
  
  if (user.isAdmin) return true
  if (!user.teamAccess?.length) return false
  
  const teamRole = user.teamAccess[0].role
  if (requiredRole === "ANY") return true
  if (requiredRole === "OWNER") return teamRole === "OWNER"
  if (requiredRole === "ADMIN") return ["OWNER", "ADMIN"].includes(teamRole)
  return true
}