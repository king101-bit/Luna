import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@root/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (!token_hash || !type) {
    console.error("Missing token_hash or type");
    redirectTo.pathname = "/error";
    return NextResponse.redirect(redirectTo);
  }

  const supabase = await createClient(); // Await the createClient function

  try {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      console.error("OTP verification failed:", error);
      redirectTo.pathname = "/error";
      return NextResponse.redirect(redirectTo);
    }

    // OTP verification successful
    redirectTo.searchParams.delete("next");
    return NextResponse.redirect(redirectTo);
  } catch (error) {
    console.error("Unexpected error during OTP verification:", error);
    redirectTo.pathname = "/error";
    return NextResponse.redirect(redirectTo);
  }
}
