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
import { Plus, CalendarIcon, Medal } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  BeltColorMap,
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
import SelectUser from "../SelectUser";
import { User } from "@/app/generated/prisma/client";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { cn } from "@/lib/utils";

type Props = {
  member: User;
  instructors: User[];
};

export default function AddPromotion({ member, instructors }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [belt, setBelt] = useState<Belt | undefined>(undefined);
  const [stripes, setStripes] = useState<number | undefined>(undefined);
  const [promotedAt, setPromotedAt] = useState<Date>(new Date());
  const [instructorId, setInstructorId] = useState<string | undefined>(
    undefined,
  );

  const resetForm = () => {
    setBelt(undefined);
    setStripes(undefined);
    setPromotedAt(new Date());
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
        toast.success("Promotion added successfully");
        resetForm();
        router.refresh();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to add promotion");
      setError(e.message || "Failed to add promotion");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Medal className="text-green-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form action={handleSubmit}>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Add Promotion</DialogTitle>
            <DialogDescription>
              Record a member&apos;s belt or stripe promotion.
            </DialogDescription>
          </DialogHeader>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Item variant="outline" size="xs" className="mt-3 bg-gray-100">
            <ItemMedia variant="icon">
              {member.belt === "WHITE" ? (
                <div className="relative inline-flex">
                  <Medal
                    className="absolute text-gray-400 size-10"
                    strokeWidth={3}
                  />
                  <Medal
                    className="relative text-white size-10"
                    strokeWidth={2}
                  />
                </div>
              ) : (
                <div className="relative inline-flex">
                  <Medal
                    className="absolute text-white size-10"
                    strokeWidth={3}
                  />
                  <Medal
                    className={cn(
                      "relative text-white size-10",
                      BeltColorMap[member.belt],
                    )}
                    strokeWidth={2}
                  />
                </div>
              )}
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {BeltOptions.find((b) => b.value === member.belt)?.label} Belt
              </ItemTitle>
              <ItemDescription>
                {member.stripes} Stripe{member.stripes === 1 ? "" : "s"}
              </ItemDescription>
            </ItemContent>
          </Item>

          <FieldGroup className="py-4 flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="belt">New Belt</FieldLabel>
              <SelectInput
                value={belt}
                onChange={(value: Belt) => setBelt(value as Belt)}
                options={BeltOptions}
                placeholder="Select belt"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="stripes">New Stripe Count</FieldLabel>
              <SelectInput
                value={stripes}
                onChange={(value: number) => setStripes(Number(value))}
                options={StripeOptions}
                placeholder="Select stripes"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="enrollmentDate">Promotion Date</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="enrollmentDate"
                    className="justify-start font-normal"
                  >
                    <CalendarIcon className="text-muted-foreground" />
                    {promotedAt ? (
                      format(promotedAt, "dd MMM yyyy")
                    ) : (
                      <span className="text-muted-foreground">Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={promotedAt}
                    onSelect={setPromotedAt}
                    defaultMonth={promotedAt}
                    required
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="instructorId">
                Promoting Instructor
              </FieldLabel>
              <SelectUser
                value={instructorId}
                onChange={(value) => setInstructorId(value)}
                options={instructors}
                placeholder="Select instructor"
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
              {isLoading ? "Adding..." : "Add Promotion"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
