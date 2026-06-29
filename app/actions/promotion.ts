"use server";

import prisma from "@/lib/prisma";
import { getMonthBounds } from "@/lib/utils";
import { Belt } from "@/types/enums";

export async function addPromotion(
  memberId: string,
  newBelt: Belt,
  newStripes: number,
  instructorId: string,
  promotedAt: Date,
) {
  return await prisma.$transaction(async (tx) => {
    const member = await tx.user.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      throw new Error("Could not find member.");
    }

    return await tx.promotion.create({
      data: {
        memberId,
        oldBelt: member.belt,
        oldStripes: member.stripes,
        newBelt,
        newStripes,
        instructorId,
        promotedAt,
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
