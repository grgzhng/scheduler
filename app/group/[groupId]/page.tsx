import { getAuthedUser } from "@/utils/supabase/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminView } from "./admin/admin_view";

export default async function GroupPage({
  params
}: {
  params: { groupId: string };
}) {
  const supabase = createClient();
  const user = await getAuthedUser();

  // Fetch group schedules also
  const [groupUsersQuery, groupQuery] = await Promise.all([
    supabase.from("groupUser").select().eq("group_id", params.groupId),
    supabase.from("group").select().eq("id", params.groupId)
  ]);

  if (groupUsersQuery.error || groupQuery.error) {
    redirect("/error");
  }

  const groupUsers = groupUsersQuery.data;
  const ownGroupUser = groupUsers.find(
    (groupUser) => groupUser.user_id === user.id
  );
  const isAdmin = ownGroupUser?.admin_at !== null;

  if (isAdmin) {
    // Choose from admin view, or own preferences/availabilities view
    return <AdminView groupUsers={groupUsers} group={groupQuery.data[0]} />;
  }
  return null;
}
