"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { archiveClassSchedule } from "@/app/actions/classSchedule";
import { Archive, CircleFadingPlusIcon, Loader, Trash2 } from "lucide-react";

type Props = {
  scheduleId: string;
};

export default function ArchiveSchedule({ scheduleId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      const res = await archiveClassSchedule(scheduleId);

      if (res) {
        toast.success(`Class Schedule archived successfully`);

        router.refresh();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to archive schedule");
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} variant="destructive">
          {isLoading ? <Loader className="animate-spin" /> : <Archive />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Archive />
          </AlertDialogMedia>
          <AlertDialogTitle>Archive schedule?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive this schedule? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeactivate} variant="destructive">
            Archive
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
