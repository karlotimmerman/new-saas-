import { NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = await request.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ session: data.session })
}
