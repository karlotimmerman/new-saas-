import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/utils/supabase/middleware";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const user = getUserFromRequest(req);

  if (!user.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const teams = await prisma.teamMember.findMany({
    where: { userId: user.userId },
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
  });

  return NextResponse.json(teams);
}

export async function POST(req: Request) {
  const user = getUserFromRequest(req);
  
  if (!user.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { name, slug } = body;

  const team = await prisma.team.create({
    data: {
      name,
      slug,
      owner: { connect: { id: user.userId } },
      members: {
        create: {
          userId: user.userId,
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
      members: true
    }
  });

  return NextResponse.json(team);
}