"use server";

import { createServerActionClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { routes } from "@/config/routes";

interface LoginResult {
  error?: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

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
