import { Button } from "@/components/ui/button";
import { getUsers } from "@/server/user";
import { UserSelect } from "@/db/schema";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilLine, Plus } from "lucide-react";

import { UserAddForm } from "@/components/forms/user-add-form";
import { UserDeleteForm } from "@/components/forms/user-del-form";

export default async function Page() {
  const users = await getUsers();
  // 可以直接使用 error.ts 错误文件路由来捕获
  if (!users.ok) return <div>Error: {users.error}</div>;
  return (
    <div className="py-4">
      <div className="py-4 flex justify-end">
        <UserAddForm>
          <Button variant="default">
            Add <Plus />
          </Button>
        </UserAddForm>
      </div>
      <Table>
        <TableCaption>A list of users in system..</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                <TableCell>{user.updatedAt.toLocaleString()}</TableCell>
                <TableCell>
                  <UserAddForm record={user}>
                    <Button variant="ghost">
                      <PencilLine/>
                    </Button>
                  </UserAddForm>
                  <UserDeleteForm id={user.id}/>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
