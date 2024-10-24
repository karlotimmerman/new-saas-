import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"
import type { 
  MiddlewareResponse, 
  RouteProtectionLevel,
  UserRole,
  TeamOwnerRoute 
} from "@/types/middleware"
import { TEAM_OWNER_ROUTES } from "@/types/middleware"
import { routes } from "@/config/routes"

function determineRouteProtection(pathname: string): RouteProtectionLevel {
  if (pathname.startsWith("/(auth)")) return "public"
  if (pathname.startsWith("/@admin")) return "admin"
  if (TEAM_OWNER_ROUTES.some(route => pathname.includes(route))) return "team-owner"
  return "protected"
}

function hasTeamOwnerAccess(pathname: string): boolean {
  return TEAM_OWNER_ROUTES.some(route => pathname.includes(route))
}

function getUserRole(userMetadata: Record<string, any> | undefined): UserRole {
  if (userMetadata?.is_admin) return "admin"
  if (userMetadata?.is_team_owner) return "team-owner"
  return "user"
}

async function handleAuthenticatedRoute(
  supabase: ReturnType<typeof createMiddlewareClient>,
  req: NextRequest,
): Promise<MiddlewareResponse> {
  const { data: factorsData } = await supabase.auth.mfa.listFactors()
  
  if (
    factorsData?.totp.length > 0 &&
    !factorsData.totp[0].verified &&
    req.nextUrl.pathname !== routes.twoFactorVerify
  ) {
    return {
      success: false,
      redirect: routes.twoFactorVerify,
    }
  }

  return { success: true }
}

async function handleAdminRoute(
  supabase: ReturnType<typeof createMiddlewareClient>,
): Promise<MiddlewareResponse> {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user?.user_metadata?.is_admin) {
    return {
      success: false,
      redirect: "/unauthorized",
      error: {
        code: "UNAUTHORIZED",
        message: "Admin access required",
      },
    }
  }

  return { success: true }
}

async function handleTeamOwnerRoute(
  supabase: ReturnType<typeof createMiddlewareClient>,
  pathname: string
): Promise<MiddlewareResponse> {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    return {
      success: false,
      redirect: "/unauthorized",
      error: {
        code: "AUTH_ERROR",
        message: "Authentication error",
      },
    }
  }

  const userRole = getUserRole(user?.user_metadata)
  
  // Allow both admins and team owners
  if (userRole !== "admin" && userRole !== "team-owner") {
    return {
      success: false,
      redirect: "/unauthorized",
      error: {
        code: "INSUFFICIENT_PERMISSIONS",
        message: "Team owner or admin access required",
      },
    }
  }

  // Additional team-specific checks if needed
  if (userRole === "team-owner") {
    // You could add additional checks here, like verifying the team ID
    // matches the requested resource
  }

  return { success: true }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
