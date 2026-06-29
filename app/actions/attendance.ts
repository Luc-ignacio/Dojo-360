"use server";

import prisma from "@/lib/prisma";
import { getMonthBounds } from "@/lib/utils";

export async function createAttendance(memberId: string, sessionId: string) {
  return await prisma.$transaction(async (tx) => {
    const existing = await tx.attendance.findUnique({
      where: {
        memberId_sessionId: {
          sessionId,
          memberId,
        },
      },
    });

    if (existing) {
      throw new Error("You are already checked in for this session.");
    }

    return await tx.attendance.create({
      data: {
        memberId,
        sessionId,
      },
    });
  });
}

export async function getMemberAttendanceThisMonth(memberId: string) {
  const { start, end } = getMonthBounds();

  return await prisma.attendance.count({
    where: {
      memberId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });
}
