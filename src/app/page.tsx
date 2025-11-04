import { Button } from "@/components/ui/button";
import { getUsers } from "@/server/user";
import { UserSelect} from '@/db/schema';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function Page() {
  const allUsers = (await getUsers()) as UserSelect[];
  console.log(111, allUsers);
  return (
    <div className="py-4">
      <div className="py-4 flex justify-end">
        <Button variant="default">Add <Plus /></Button>
      </div>
      <Table>
        <TableCaption>A list of users in system..</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{ user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt.toLocaleString()}</TableCell>
              <TableCell className="text-right">{user.updatedAt.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
