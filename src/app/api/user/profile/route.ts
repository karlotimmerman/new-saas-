import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type UserNavItem } from "@/types/navigation"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Verify authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Fetch additional user profile data if needed
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", session.user.id)
      .single()

    if (profileError) throw profileError

    const userData: UserNavItem = {
      name: profile.full_name || session.user.email?.split("@")[0] || "User",
      email: session.user.email || "",
      avatar: profile.avatar_url || ""
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error loading user profile:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Optional: Add PATCH method for updating user profile
export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { name, avatar } = body

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        avatar_url: avatar,
        updated_at: new Date().toISOString()
      })
      .eq("id", session.user.id)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating user profile:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}