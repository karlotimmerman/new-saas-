import { NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = await request.json()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/confirm`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ user: data.user })
}
