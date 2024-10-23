import { NextResponse } from "next/server";
import { validateConnection } from "@/utils/supabase-admin";

export async function GET() {
  const isConnected = await validateConnection();

  if (isConnected) {
    return NextResponse.json({ message: "Successfully connected to Supabase" });
  } else {
    return NextResponse.json(
      { message: "Failed to connect to Supabase" },
      { status: 500 },
    );
  }
}
