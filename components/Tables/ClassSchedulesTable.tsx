"use client";

import { DataTable } from "@/components/ui/data-table";
import { ClassSchedule, User } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClassType,
  ClassTypeLabels,
  DayOfWeek,
  DayOfWeekLabels,
} from "@/types/enums";
import { CircleUserIcon } from "lucide-react";
import Image from "next/image";
import ArchiveSchedule from "../Class/ArchiveSchedule";
import { ClassScheduleWithInstructor } from "@/types/class";

type Props = {
  schedules: ClassScheduleWithInstructor;
};

export function ClassSchedulesTable({ schedules }: Props) {
  const columns: ColumnDef<ClassScheduleWithInstructor>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "classType",
      header: "Type",
      cell: ({ row }) => {
        const classTypeName =
          ClassTypeLabels[row.getValue("classType") as ClassType];

        return <div>{classTypeName}</div>;
      },
    },
    {
      accessorKey: "dayOfWeek",
      header: "Day of Week",
      cell: ({ row }) => {
        const dayOfWeekName =
          DayOfWeekLabels[row.getValue("dayOfWeek") as DayOfWeek];

        return <div>{dayOfWeekName}</div>;
      },
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
    },
    {
      accessorKey: "endTime",
      header: "End Time",
    },
    {
      accessorKey: "instructorId",
      header: "Instructor",
      cell: ({ row }) => {
        const instructorName = row.original.Instructor.name;
        const instructorAvatar = row.original.Instructor.avatarUrl;

        return (
          <div className="flex items-center gap-2">
            {instructorAvatar ? (
              <Image
                src={instructorAvatar}
                alt={instructorName}
                width={32}
                height={32}
                className="object-cover object-top w-10 h-10 rounded-full"
              />
            ) : (
              <CircleUserIcon
                className="bg-neutral-200 text-neutral-500 rounded-full"
                strokeWidth={1}
                size={32}
              />
            )}

            {instructorName}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const scheduleId = row.original.id;

        return <ArchiveSchedule scheduleId={scheduleId} />;
      },
    },
  ];

  return <DataTable columns={columns} data={schedules} />;
}
