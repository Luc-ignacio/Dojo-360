import { ClassSchedule } from "@/app/generated/prisma/client";

export type ClassScheduleWithInstructor = ClassSchedule & {
  Instructor: {
    name: string;
    avatarUrl?: string | null;
  };
};
