import { NextResponse } from "next/server";

import { readSupabaseEnv } from "@/lib/env";
import { upsertProfileForAuthUser } from "@/lib/supabase/profile-sync";
import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  if (!readSupabaseEnv()) {
    return NextResponse.redirect(new URL("/auth/auth-code-error", requestUrl.origin));
  }

  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/platform";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await upsertProfileForAuthUser(supabase, user);
      }
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL("/auth/auth-code-error", requestUrl.origin));
}
