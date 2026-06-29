import { NextResponse } from "next/server";

// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";
import { updateUserAfterInvite, getUserByEmail } from "@/app/actions/user";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // redirect URL
  let next = searchParams.get("next") ?? "/member";

  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/member";
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const { user } = data;

      const userEmail = user.email!;

      // Check if admin pre-registered this email
      const existingUser = await getUserByEmail(userEmail);

      if (!existingUser) {
        // Not invited — block access
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/auth/not-invited`);
      }

      // Link supabaseAuthId and sync avatar if not already done
      if (!existingUser.supabaseAuthId) {
        await updateUserAfterInvite(
          user.email!,
          user.id,
          user.user_metadata?.avatar_url,
        );
      }

      // Redirect based on user role
      if (existingUser.role === "ADMIN") {
        next = "/admin";
      } else {
        next = "/member";
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
