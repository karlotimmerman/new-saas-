"use server"

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Database } from "@/types/supabase";
import { routes } from "@/config/routes";

function getSupabase() {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
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
}

async function syncUserWithPrisma(user: Database["auth"]["users"]) {
  try {
    return await prisma.user.upsert({
      where: { id: user.id },
      update: {
        lastLogin: new Date(),
        email: user.email,
        isAdmin: user.user_metadata?.is_admin ?? false,
      },
      create: {
        id: user.id,
        email: user.email!,
        isAdmin: user.user_metadata?.is_admin ?? false,
        profile: {
          create: {
            fullName: user.user_metadata?.full_name,
          }
        },
        teamMembers: user.user_metadata?.team_id ? {
          create: {
            teamId: user.user_metadata.team_id,
            role: user.user_metadata?.is_team_owner ? "OWNER" : "MEMBER"
          }
        } : undefined
      }
    });
  } catch (error) {
    console.error('Error syncing user with Prisma:', error);
    throw error;
  }
}

export async function login(formData: FormData): Promise<{ error?: string }> {
  const supabase = getSupabase();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      // Sync with Prisma
      await syncUserWithPrisma(data.user);

      // Check for 2FA
      const { data: factorsData } = await supabase.auth.mfa.listFactors();

      if (factorsData?.totp && factorsData.totp.length > 0) {
        redirect(routes.twoFactorVerify);
      }

      redirect(routes.dashboard);
    }

    return { error: "Login failed" };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function signup(formData: FormData): Promise<{ error?: string }> {
  const supabase = getSupabase();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${routes.authCallback}`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await syncUserWithPrisma(data.user);
    }

    return {};
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'An unexpected error occurred' };
  }
}