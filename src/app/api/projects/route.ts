import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type ProjectItem } from "@/types/navigation"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Verify authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Fetch projects from your database
    const { data: projects, error: dbError } = await supabase
      .from("projects")
      .select("name, slug, icon")
      .eq("user_id", session.user.id)
    
    if (dbError) throw dbError

    // Transform the data into the expected format
    const formattedProjects: ProjectItem[] = projects.map(project => ({
      name: project.name,
      url: `/projects/${project.slug}`,
      icon: project.icon
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error("Error loading projects:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Optional: Add POST method for creating new projects
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { name, icon } = body

    const { data, error: dbError } = await supabase
      .from("projects")
      .insert([
        {
          name,
          icon,
          user_id: session.user.id,
          slug: name.toLowerCase().replace(/\s+/g, "-")
        }
      ])
      .select()
      .single()

    if (dbError) throw dbError

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating project:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}