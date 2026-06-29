"use server";

import prisma from "@/lib/prisma";
import { ClassType, DayOfWeek } from "@/types/enums";

export async function createClassSchedule(
  name: string,
  classType: ClassType,
  dayOfWeek: DayOfWeek,
  startTime: string,
  endTime: string,
  instructorId: string,
) {
  const classSchedule = await prisma.classSchedule.create({
    data: {
      name,
      classType,
      dayOfWeek,
      startTime,
      endTime,
      instructorId,
    },
  });

  return classSchedule;
}

export async function getClassSchedules() {
  const classSchedules = await prisma.classSchedule.findMany({
    where: {
      isActive: true,
    },
    include: {
      Instructor: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return classSchedules;
}

export async function archiveClassSchedule(scheduleId: string) {
  const classSchedule = await prisma.classSchedule.update({
    where: {
      id: scheduleId,
    },
    data: {
      isActive: false,
    },
  });

  return classSchedule;
}
