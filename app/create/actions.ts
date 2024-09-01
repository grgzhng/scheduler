"use server";

import { getAuthedUser } from "@/utils/supabase/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createGroup(formData: FormData) {
  const supabase = createClient();
  const user = await getAuthedUser();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const name = formData.get("name") as string;

  const query = await supabase
    .from("group")
    .insert({
      name: name,
      admin_id: user.id
    })
    .select();

  if (query.error) {
    redirect("/error");
  }

  const createdGroupId = query.data[0].id;

  if (user.email != null) {
    await supabase.from("groupUser").insert({
      group_id: createdGroupId,
      email: user.email,
      user_id: user.id,
      admin_at: new Date().toISOString()
    });
  }

  redirect(`/group/${createdGroupId}`);
}
