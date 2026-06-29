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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Clock8Icon, Clock9Icon, Plus } from "lucide-react";
import { useState } from "react";
import {
  ClassType,
  ClassTypeOptions,
  DayOfWeek,
  DaysOfWeekOptions,
} from "@/types/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SelectInput from "../SelectInput";
import SelectUser from "../SelectUser";
import { User } from "@/app/generated/prisma/client";
import { createClassSchedule } from "@/app/actions/classSchedule";

type Props = {
  instructors: User[];
};

export default function CreateClassSchedule({ instructors }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [classType, setClassType] = useState<ClassType | undefined>(undefined);
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | undefined>(undefined);
  const [instructorId, setInstructorId] = useState<string | undefined>(
    undefined,
  );

  const resetForm = () => {
    setClassType(undefined);
    setDayOfWeek(undefined);
    setInstructorId(undefined);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await createClassSchedule(
        formData.get("name") as string,
        classType,
        dayOfWeek,
        formData.get("startTime") as string,
        formData.get("endTime") as string,
        instructorId,
      );
      if (res) {
        toast.success(`Class Schedule added successfully`);
        resetForm();
        router.refresh();
      }
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
      setError(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="text-green-600" strokeWidth={3} /> Add Class Schedule
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form action={handleSubmit}>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Add Class Schedule</DialogTitle>
            <DialogDescription>
              Create a recurring class that will automatically generate sessions
              for your timetable.
            </DialogDescription>
          </DialogHeader>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <FieldGroup className="py-4 flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter class name"
                required
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="classType">Class Type</FieldLabel>
              <SelectInput
                value={classType}
                onChange={(value) => setClassType(value)}
                options={ClassTypeOptions}
                placeholder="Select class type"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="dayOfWeek">Day Of Week</FieldLabel>
              <SelectInput
                value={dayOfWeek}
                onChange={(value) => setDayOfWeek(value)}
                options={DaysOfWeekOptions}
                placeholder="Select day of week"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="time"
                  id="startTime"
                  name="startTime"
                  step="60"
                  defaultValue="08:00"
                  className="[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                <InputGroupAddon align="inline-start">
                  <Clock8Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="time"
                  id="endTime"
                  name="endTime"
                  step="60"
                  defaultValue="09:00"
                  className="[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                <InputGroupAddon align="inline-start">
                  <Clock9Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="instructorId">Instructor</FieldLabel>
              <SelectUser
                value={instructorId}
                onChange={(value) => setInstructorId(value)}
                options={instructors}
                placeholder="Select lead instructor"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={resetForm} variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : `Add Class Schedule`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
