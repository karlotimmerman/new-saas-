import { createServerComponentClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export async function enroll2FA() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
  });
  if (error) throw error;
  return data;
}

export async function verify2FA(factorId: string, code: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: challengeData, error: challengeError } =
    await supabase.auth.mfa.challenge({ factorId });
  if (challengeError) throw challengeError;

  const { data, error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challengeData.id,
    code,
  });
  if (error) throw error;
  return data;
}

export async function unenroll2FA(factorId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) throw error;
  return data;
}

export async function get2FAFactors() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error) throw error;
  return data;
}
