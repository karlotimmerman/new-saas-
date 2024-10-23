import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function POST() {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set(name, value, options);
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          },
        },
      }
    );

    // Get current user before logout
    const { data: { user } } = await supabase.auth.getUser();

    // Perform Supabase logout
    await supabase.auth.signOut();

    // Update Prisma if we had a user
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogout: new Date(),
        },
      });
    }

    // Clear cookies
    const cookies = cookieStore.getAll();
    cookies.forEach(cookie => {
      cookieStore.set(cookie.name, "", { maxAge: 0 });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
