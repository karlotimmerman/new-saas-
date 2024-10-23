import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { AuthError, SessionError } from "@/lib/errors"
import { prisma } from "@/lib/prisma"
import type { UserRole } from "@/types/middleware"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

function determineUserRole(metadata: Record<string, unknown> | undefined): UserRole {
  if (metadata?.is_admin) return "admin"
  if (metadata?.is_team_owner) return "team-owner"
  return "user"
}

export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) throw new AuthError(error.message, "AUTH_ERROR")
  if (!user) throw new SessionError("No user found")

  const userRole = determineUserRole(user.user_metadata)
  const teamId = user.user_metadata?.team_id as string | undefined

  // Sync with Prisma
  const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email,
      isAdmin: userRole === "admin",
      lastActive: new Date(),
      // Update team membership if exists
      teamMembers: teamId ? {
        upsert: {
          where: {
            teamId_userId: {
              teamId,
              userId: user.id
            }
          },
          create: {
            teamId,
            role: userRole === "team-owner" ? "OWNER" : "MEMBER"
          },
          update: {
            role: userRole === "team-owner" ? "OWNER" : "MEMBER"
          }
        }
      } : undefined
    },
    create: {
      id: user.id,
      email: user.email!,
      isAdmin: userRole === "admin",
      profile: {
        create: {
          fullName: user.user_metadata?.full_name,
        }
      },
      // Create team membership if exists
      teamMembers: teamId ? {
        create: {
          teamId,
          role: userRole === "team-owner" ? "OWNER" : "MEMBER"
        }
      } : undefined
    },
    include: {
      profile: true,
      teamMembers: {
        include: {
          team: {
            include: {
              settings: true
            }
          }
        }
      }
    }
  })

  return { 
    user, 
    dbUser,
    role: userRole,
    teams: dbUser.teamMembers.map(member => ({
      id: member.team.id,
      role: member.role,
      settings: member.team.settings
    }))
  }
}

export async function getUserTeams(userId: string) {
  return prisma.teamMember.findMany({
    where: { userId },
    include: {
      team: {
        include: {
          settings: true,
          members: {
            include: {
              user: {
                include: {
                  profile: true
                }
              }
            }
          }
        }
      }
    }
  })
}

export async function checkTeamAccess(userId: string, teamId: string) {
  const member = await prisma.teamMember.findUnique({
    where: {
      teamId_userId: {
        teamId,
        userId
      }
    },
    include: {
      team: {
        include: {
          settings: true
        }
      }
    }
  })

  if (!member) {
    throw new AuthError("Team access denied", "TEAM_ACCESS_DENIED")
  }

  return {
    role: member.role,
    team: member.team
  }
}

export async function createTeam(
  ownerId: string,
  data: { name: string; slug: string }
) {
  const team = await prisma.team.create({
    data: {
      name: data.name,
      slug: data.slug,
      owner: { connect: { id: ownerId } },
      members: {
        create: {
          userId: ownerId,
          role: "OWNER"
        }
      },
      settings: {
        create: {
          maxMembers: 5,
          allowInvites: true
        }
      }
    },
    include: {
      settings: true,
      members: {
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }
      }
    }
  })

  // Update user metadata in Supabase
  const supabase = createClient()
  await supabase.auth.updateUser({
    data: {
      is_team_owner: true,
      team_id: team.id
    }
  })

  return team
}

export async function inviteToTeam(
  teamId: string,
  inviterUserId: string,
  email: string
) {
  // Check if inviter has permission
  const member = await checkTeamAccess(inviterUserId, teamId)
  if (member.role !== "OWNER" && member.role !== "ADMIN") {
    throw new AuthError("Not authorized to invite members", "UNAUTHORIZED")
  }

  // Check team limits
  if (member.team.settings?.maxMembers) {
    const currentMembers = await prisma.teamMember.count({
      where: { teamId }
    })
    if (currentMembers >= member.team.settings.maxMembers) {
      throw new Error("Team member limit reached")
    }
  }

  // Create invitation
  return prisma.teamInvite.create({
    data: {
      teamId,
      email,
      senderId: inviterUserId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  })
}