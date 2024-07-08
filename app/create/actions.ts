"use server";

import { getAuthedUser } from "@/utils/supabase/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Group = {
  id: number;
  name: string;
  created_at: Date;
};

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
      admin_id: user.id,
    })
    .select();

  if (query.error) {
    redirect("/error");
  }

  const createdGroupId = query.data[0].id;

  await supabase.from("groupUser").insert({
    group_id: createdGroupId,
    user_id: user.id,
    email: user.email,
    admin_at: new Date(),
  });

  redirect(`/group/${createdGroupId}`);
}
