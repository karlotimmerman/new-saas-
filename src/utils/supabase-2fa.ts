import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export async function enroll2FA() {
  const supabase = createServerClient<Database>({
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookies().set(name, value, {
          ...options,
          // Add any missing properties required by Next.js cookies
          httpOnly: options.httpOnly ?? true,
          secure: options.secure ?? process.env.NODE_ENV === 'production',
        })
      },
      remove(name: string, options: CookieOptions) {
        cookies().set(name, '', {
          ...options,
          maxAge: 0,
          // Add any missing properties required by Next.js cookies
          httpOnly: options.httpOnly ?? true,
          secure: options.secure ?? process.env.NODE_ENV === 'production',
        })
      },
    }
  });

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
  });
  
  if (error) throw error;

  return data;
}
