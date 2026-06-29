"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAttendance } from "@/app/actions/attendance";
import { TodaySessionsResult } from "@/app/actions/classSession";
import SelectSession from "../SelectSession";
import { Play } from "lucide-react";
import { User } from "@/app/generated/prisma/client";

type Props = {
  sessions: TodaySessionsResult;
  user: User;
};

export default function CheckIn({ sessions, user }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const resetForm = () => {
    setSessionId(undefined);
    setError(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!sessionId) {
        throw new Error("Session ID is required");
      }

      const res = await createAttendance(user.id, sessionId);
      if (res) {
        toast.success(`Check In successful`);
        resetForm();
        router.refresh();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to Check In");
      setError(e.message || "Failed to Check In");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Play className="text-green-600" strokeWidth={3} /> Check In
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form action={handleSubmit}>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Check In</DialogTitle>
            <DialogDescription>
              Find a class below to check in. See you on the mats!
            </DialogDescription>
          </DialogHeader>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {sessions.length ? (
            <FieldGroup className="py-4 flex flex-col gap-4">
              <Field className="flex flex-col gap-2">
                <FieldLabel htmlFor="classType">
                  Today&apos;s Sessions
                </FieldLabel>
                <SelectSession
                  value={sessionId}
                  onChange={(value) => setSessionId(value)}
                  options={sessions}
                  placeholder="Select session"
                />
              </Field>
            </FieldGroup>
          ) : (
            <p className="py-4">
              No classes today. Rest up and get ready for the next session.
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={resetForm} variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={!sessionId || isLoading}>
              {isLoading ? "Checking in..." : `Check In`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
