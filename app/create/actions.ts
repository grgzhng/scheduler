"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Group = {
  id: number;
  name: string;
  created_at: Date;
};

export async function createGroup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const name = formData.get("name") as string;

  const query = await supabase
    .from("group")
    .insert({
      name: name,
    })
    .select();

  console.log(query.error);

  if (query.error) {
    redirect("/error");
  }

  redirect(`/group/${query.data[0].id}`);
}
