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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  BeltOptions,
  RoleLabels,
  StripeOptions,
  type Belt,
  type Role,
} from "@/types/enums";
import { toast } from "sonner";
import { createUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import SelectInput from "../SelectInput";

type Props = {
  role: Role;
};

export default function CreateUser({ role }: Props) {
  const router = useRouter();

  const roleName = RoleLabels[role];

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [belt, setBelt] = useState<Belt | undefined>(undefined);
  const [stripes, setStripes] = useState<number | undefined>(undefined);
  const [enrollmentDate, setEnrollmentDate] = useState<Date>(new Date());

  const resetForm = () => {
    setBelt(undefined);
    setStripes(undefined);
    setEnrollmentDate(new Date());
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await createUser(
        formData.get("name") as string,
        formData.get("email") as string,
        role,
        belt || "WHITE",
        Number(stripes),
        enrollmentDate ? enrollmentDate : new Date(),
      );

      if (res) {
        toast.success(`${roleName} added successfully`);
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
          <Plus className="text-green-600" strokeWidth={3} /> Add {roleName}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form action={handleSubmit}>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Add {roleName}</DialogTitle>
            <DialogDescription>
              Register a new {roleName?.toLowerCase()} and assign their belt,
              stripes, and enrollment details.
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
                placeholder={`Enter ${roleName.toLowerCase()} name`}
                required
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder={`Enter ${roleName.toLowerCase()} email`}
                required
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="belt">Belt</FieldLabel>
              <SelectInput
                value={belt}
                onChange={(value: Belt) => setBelt(value as Belt)}
                options={BeltOptions}
                placeholder="Select belt"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="stripes">Stripes</FieldLabel>
              <SelectInput
                value={stripes}
                onChange={(value: number) => setStripes(Number(value))}
                options={StripeOptions}
                placeholder="Select stripes"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="enrollmentDate">Enrollment Date</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="enrollmentDate"
                    className="justify-start font-normal"
                  >
                    <CalendarIcon className="text-muted-foreground" />
                    {enrollmentDate ? (
                      format(enrollmentDate, "dd MMM yyyy")
                    ) : (
                      <span className="text-muted-foreground">Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={enrollmentDate}
                    onSelect={setEnrollmentDate}
                    defaultMonth={enrollmentDate}
                    required
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={resetForm} variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : `Add ${roleName}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
