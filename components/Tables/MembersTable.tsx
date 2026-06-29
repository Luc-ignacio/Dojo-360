"use client";

import { DataTable } from "@/components/ui/data-table";
import { User } from "@/app/generated/prisma/client";
import Image from "next/image";
import { CircleUserIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Belt, BeltLabels, StripeLabels } from "@/types/enums";
import { formatDate } from "@/lib/utils";
import AddPromotion from "../Promotion/AddPromotion";

type Props = {
  members?: User[];
  instructors: User[];
};

export function MembersTable({ members, instructors }: Props) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.original.name;
        const avatarUrl = row.original.avatarUrl;

        return (
          <div className="flex items-center gap-2">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                width={32}
                height={32}
                className="object-cover object-top w-9 h-9 rounded-full"
              />
            ) : (
              <CircleUserIcon
                className="bg-neutral-200 text-neutral-500 w-9 h-9 rounded-full"
                strokeWidth={1}
                size={32}
              />
            )}

            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "belt",
      header: "Belt",
      cell: ({ row }) => {
        const beltLabel = BeltLabels[row.getValue("belt") as Belt];

        return <div>{beltLabel}</div>;
      },
    },
    {
      accessorKey: "stripes",
      header: "Stripes",
      cell: ({ row }) => {
        const stripeLabel = StripeLabels[row.getValue("stripes") as number];

        return <div>{stripeLabel}</div>;
      },
    },
    {
      accessorKey: "enrollmentDate",
      header: "Enrolled Since",
      cell: ({ row }) => {
        const enrollmentDate = row.getValue("enrollmentDate") as Date;
        const formattedDate = formatDate(enrollmentDate);

        return <div>{formattedDate}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const member = row.original;

        return <AddPromotion member={member} instructors={instructors} />;
      },
    },
  ];

  return <DataTable columns={columns} data={members || instructors} />;
}
