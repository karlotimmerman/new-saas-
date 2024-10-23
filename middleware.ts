// Root middleware.ts

import { createMiddlewareClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the user is authenticated
  if (!session && !req.nextUrl.pathname.startsWith("/(auth)")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session) {
    // Check for 2FA
    const { data: factorsData } = await supabase.auth.mfa.listFactors();
    if (
      factorsData?.totp.length > 0 &&
      req.nextUrl.pathname !== "/(auth)/2fa-verify"
    ) {
      return NextResponse.redirect(new URL("/(auth)/2fa-verify", req.url));
    }

    // Check for admin access
    if (req.nextUrl.pathname.startsWith("/@admin")) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // Assuming you have an 'is_admin' field in your user metadata
      if (!user?.user_metadata?.is_admin) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
