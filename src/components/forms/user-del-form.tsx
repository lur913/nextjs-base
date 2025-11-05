'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useTransition } from 'react';

import { deleteUser } from '@/server/user';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function UserDeleteForm({
  id
} : {
  id: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  function handleDelete() {
    startTransition(async() => {
      try {
        await deleteUser(id)
        toast.success('User deleted successfully')
        router.refresh()
      } catch (error) {
        toast.error('Error deleting user')
      }
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash2/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction asChild>
            <Button onClick={handleDelete} variant="destructive">Continue</Button>
          </AlertDialogAction> */}
            <Button onClick={handleDelete} variant="destructive">
              {isPending ? <Spinner /> : 'Continue'}
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
