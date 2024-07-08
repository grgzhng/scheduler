import { getAuthedUser } from "@/utils/supabase/helpers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient();

  const { id: userId } = await getAuthedUser();

  let existingUserGroupsElement = null;

  const groupUsers = await supabase
    .from("groupUser")
    .select()
    .eq("user_id", userId)
    .not("admin_at", "is", null);

  if (groupUsers.error) {
    console.error("Error fetching groups for user");
  }

  if (groupUsers?.data && groupUsers.data.length !== 0) {
    const groups = await supabase
      .from("group")
      .select("name")
      .in(
        "id",
        groupUsers.data.map((groupUser) => groupUser.group_id)
      );

    if (groups.data) {
      existingUserGroupsElement = groupUsers.data.map((groupUser, idx) => {
        return (
          <Link
            href={`group/${groupUser.group_id}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            key={`group-${idx}`}
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {groups.data[idx].name}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Update availabilities or preferences
            </p>
          </Link>
        );
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Link
          href={"create"}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Create Group{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Set up a group to put together a schedule of responsibilities
          </p>
        </Link>
        {existingUserGroupsElement}
      </div>
    </main>
  );
}
