"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export function MembersView({
  groupUsers,
  group,
}: {
  groupUsers: any[];
  group: any;
}) {
  const membersInputRef = React.useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  return (
    <>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Add members</Label>
        <Textarea
          placeholder="Input emails of members to add with a new line in between"
          id="message"
          ref={membersInputRef}
        />
        <Button
          onClick={() => {
            const emailsToAdd = membersInputRef.current?.value
              .split("\n")
              .map((email) => email.trim());

            console.log(emailsToAdd);

            if (emailsToAdd != null) {
              const groupUsersToInsert = emailsToAdd.map((email) => {
                return {
                  group_id: group.id,
                  email: email,
                };
              });
              const query = supabase
                .from("groupUser")
                .insert(groupUsersToInsert);

              query.then((res) => {
                console.log(res);
              });
            }

            if (membersInputRef.current) {
              membersInputRef.current.value = "";
            }
          }}
        >
          Submit
        </Button>
      </div>
      <Table>
        <TableCaption>Members of {group.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Account Created</TableHead>
            <TableHead>Role Preferences</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupUsers.map((groupUser) => {
            return (
              <TableRow key={`${groupUser.email}-group-user`}>
                <TableCell>{groupUser.email}</TableCell>
                <TableCell>{(groupUser.user_id !== null).toString()}</TableCell>
                <TableCell>{groupUser.role_preferences}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
