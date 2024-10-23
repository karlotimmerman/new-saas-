import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function validateConnection() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .single();
    if (error) throw error;
    console.log("Successfully connected to Supabase. User count:", data.count);
    return true;
  } catch (error) {
    console.error("Error connecting to Supabase:", error);
    return false;
  }
}
