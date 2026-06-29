import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getUserByEmail } from "@/app/actions/user";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return await getUserByEmail(user.email!);
});
