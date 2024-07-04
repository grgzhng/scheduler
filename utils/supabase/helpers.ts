import { redirect } from "next/navigation";
import { createClient } from "./server";

export const nonAuthedEligibleRoutes = ["/login", "/error", "/"];

export async function getAuthedUserId() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return data.user.id;
}
