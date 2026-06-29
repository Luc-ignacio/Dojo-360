"use client";

import { DataTable } from "@/components/ui/data-table";
import { ClassSession } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClassType,
  ClassTypeLabels,
  DayOfWeek,
  DayOfWeekLabels,
} from "@/types/enums";
import { CircleUserIcon } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

type SessionRow = ClassSession & {
  Instructor: {
    name: string;
    id: string;
    avatarUrl: string | null;
  };
  Attendance: {
    id: string;
  }[];
  Schedule: {
    name: string;
    classType: ClassType;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
  } | null;
};

const columns: ColumnDef<SessionRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "classType",
    header: "Type",
    cell: ({ row }) => {
      const schedule = row.original.Schedule;
      const classTypename = ClassTypeLabels[schedule?.classType as ClassType];

      return <div>{classTypename}</div>;
    },
  },
  {
    accessorKey: "scheduledDate",
    header: "Scheduled Date",
    cell: ({ row }) => {
      const date = row.getValue("scheduledDate") as Date;
      const formattedDate = formatDate(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "dayOfWeek",
    header: "Day of Week",
    cell: ({ row }) => {
      const schedule = row.original.Schedule;
      const dayOfWeek = schedule?.dayOfWeek;
      const dayOfWeekName = DayOfWeekLabels[dayOfWeek as DayOfWeek];

      return <div>{dayOfWeekName}</div>;
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const schedule = row.original.Schedule;
      const startTime = schedule?.startTime;

      return <div>{startTime}</div>;
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const schedule = row.original.Schedule;
      const endTime = schedule?.endTime;

      return <div>{endTime}</div>;
    },
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
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      const attendance = row.original.Attendance;

      return <div>{attendance.length}</div>;
    },
  },
];

export function ClassSessionsTable({
  data,
}: {
  data: ClassSession &
    {
      Instructor: {
        name: string;
        id: string;
        avatarUrl: string | null;
      };
      Attendance: {
        id: string;
      }[];
      Schedule: {
        name: string;
        classType: ClassType;
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
      } | null;
    }[];
}) {
  return <DataTable columns={columns} data={data} />;
}
