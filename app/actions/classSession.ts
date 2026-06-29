"use server";

import prisma from "@/lib/prisma";
import { DayOfWeek, DayOfWeekIndex } from "@/types/enums";
import { addDays, endOfDay } from "date-fns";
import {
  toUtc,
  getWeekMondayZoned,
  getWeekBounds,
  getTodayBounds,
  formatGymDate,
} from "@/lib/utils";

type GenerateResult = {
  created: number;
  skipped: number;
  weekLabel: string;
};

function getSessionDate(weekMondayZoned: Date, dayOfWeek: DayOfWeek): Date {
  const zonedDate = addDays(weekMondayZoned, DayOfWeekIndex[dayOfWeek]);
  return toUtc(zonedDate);
}

async function generateSessionsForWeek(
  weekOffset: number,
): Promise<GenerateResult> {
  const weekMondayZoned = getWeekMondayZoned(weekOffset);
  const weekSundayZoned = addDays(weekMondayZoned, 6);

  const weekMonday = toUtc(weekMondayZoned);
  const weekSunday = toUtc(endOfDay(weekSundayZoned));

  return await prisma.$transaction(async (tx) => {
    const activeSchedules = await tx.classSchedule.findMany({
      where: { isActive: true },
    });

    if (activeSchedules.length === 0) {
      throw new Error("No active class schedules found.");
    }

    const existingSessions = await tx.classSession.findMany({
      where: {
        scheduleId: { in: activeSchedules.map((s) => s.id) },
        scheduledDate: { gte: weekMonday, lte: weekSunday },
      },
      select: { scheduleId: true, scheduledDate: true },
    });

    const existingKeys = new Set(
      existingSessions.map(
        (s) => `${s.scheduleId}-${s.scheduledDate.toISOString().split("T")[0]}`,
      ),
    );

    const sessionsToCreate = activeSchedules
      .map((schedule) => {
        const scheduledDate = getSessionDate(
          weekMondayZoned,
          schedule.dayOfWeek,
        );
        const key = `${schedule.id}-${scheduledDate.toISOString().split("T")[0]}`;

        if (existingKeys.has(key)) return null;

        return {
          scheduleId: schedule.id,
          name: schedule.name,
          instructorId: schedule.instructorId,
          scheduledDate,
          isCancelled: false,
        };
      })
      .filter(Boolean) as {
      scheduleId: string;
      name: string;
      instructorId: string;
      scheduledDate: Date;
      isCancelled: boolean;
    }[];

    await tx.classSession.createMany({ data: sessionsToCreate });

    const weekLabel = `${formatGymDate(weekMonday)} – ${formatGymDate(weekSunday)}`;

    return {
      created: sessionsToCreate.length,
      skipped: activeSchedules.length - sessionsToCreate.length,
      weekLabel,
    };
  });
}

export async function generateNextWeekSessions(): Promise<GenerateResult> {
  return generateSessionsForWeek(1);
}

export async function generateCurrentWeekSessions(): Promise<GenerateResult> {
  return generateSessionsForWeek(0);
}

export async function getWeekClassSessions(weekOffset: number = 0) {
  const { start, end } = getWeekBounds(weekOffset);

  const sessions = await prisma.classSession.findMany({
    where: {
      scheduledDate: { gte: start, lte: end },
    },
    include: {
      Schedule: {
        select: {
          name: true,
          classType: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
        },
      },
      Instructor: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      Attendance: {
        select: {
          id: true,
        },
      },
    },
    orderBy: [{ scheduledDate: "asc" }, { Schedule: { startTime: "asc" } }],
  });

  return {
    sessions,
    weekLabel: `${formatGymDate(start)} – ${formatGymDate(end)}`,
    start,
    end,
  };
}

export async function getTodaySessions() {
  const { start, end } = getTodayBounds();

  return await prisma.classSession.findMany({
    where: {
      scheduledDate: {
        gte: start,
        lte: end,
      },
    },
    include: {
      Schedule: {
        select: {
          name: true,
          classType: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
        },
      },
      Instructor: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: [{ scheduledDate: "asc" }, { Schedule: { startTime: "asc" } }],
  });
}

export type WeekSessionsResult = Awaited<
  ReturnType<typeof getWeekClassSessions>
>;
export type WeekSession = WeekSessionsResult["sessions"][number];
export type TodaySessionsResult = Awaited<ReturnType<typeof getTodaySessions>>;
export type TodaySession = TodaySessionsResult[number];
