"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { MembersView } from "./members_view";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";

enum View {
  MEMBERS,
  ROLES,
  SCHEDULES,
}

export function AdminView({
  groupUsers,
  group,
}: {
  groupUsers: any[];
  group: any;
}) {
  const [view, setView] = React.useState<View>(View.MEMBERS);

  const [roles, setRoles] = React.useState<any[]>(group.roles || []);

  const supabase = createClient();

  const roleInputRef = React.useRef<HTMLInputElement>(null);
  const roleDescriptionInputRef = React.useRef<HTMLInputElement>(null);

  console.log(roles);

  return (
    <div>
      <div className="flex flex-row">
        <div onClick={() => setView(View.MEMBERS)}>Users</div>
        <div onClick={() => setView(View.ROLES)}>Roles</div>
        <div onClick={() => setView(View.SCHEDULES)}>Schedules</div>
      </div>

      {view === View.MEMBERS && (
        <MembersView group={group} groupUsers={groupUsers} />
      )}
      {view === View.ROLES && (
        <>
          {roles.length === 0 ? (
            <div>{`No roles in ${group.name}. Create a role below to get started!`}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role: any) => {
                  return (
                    <TableRow key={role.id}>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add a new role</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      placeholder="Name of the role"
                      ref={roleInputRef}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      placeholder="Description of the role"
                      ref={roleDescriptionInputRef}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={async () => {
                  if (
                    roleInputRef.current == null ||
                    roleDescriptionInputRef.current == null
                  ) {
                    return;
                  }
                  const newRoles = [...roles];
                  newRoles.push({
                    name: roleInputRef.current.value,
                    description: roleDescriptionInputRef.current.value,
                  });
                  console.log({ newRoles });

                  const x = await supabase
                    .from("group")
                    .select()
                    .eq("id", group.id);

                  console.log({ x });
                  console.log(JSON.stringify(newRoles));

                  const rolesQuery = await supabase
                    .from("group")
                    .update({ roles: newRoles })
                    .eq("id", group.id)
                    .select();

                  if (rolesQuery.error) {
                    console.warn("Error submitting role: ", rolesQuery.error);
                  }

                  if (rolesQuery.data != null) {
                    const newRolesData = rolesQuery.data[0].roles;
                    setRoles(newRolesData);
                  }

                  roleInputRef.current.value = "";
                  roleDescriptionInputRef.current.value = "";

                  roleInputRef.current.focus();
                }}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
