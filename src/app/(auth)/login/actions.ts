"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { routes } from "@/config/routes";

interface LoginResult {
  error?: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (
          name: string,
          value: string,
          options: {
            path: string;
            maxAge: number;
            sameSite: "lax" | "strict" | "none";
          },
        ) => cookieStore.set(name, value, options),
        remove: (name: string, options: { path: string }) =>
          cookieStore.set(name, "", { ...options, maxAge: 0 }),
      },
    },
  );

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid email or password format" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const { data: factorsData } = await supabase.auth.mfa.listFactors();

  if (factorsData?.totp && factorsData.totp.length > 0) {
    // User has 2FA enabled, redirect to 2FA verification page
    redirect(routes.twoFactorVerify);
  }

  // No 2FA, proceed with normal login
  redirect(routes.dashboard);
}

export async function signup(formData: FormData): Promise<LoginResult> {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid email or password format" };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
