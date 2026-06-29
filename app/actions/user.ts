"use server";

import prisma from "@/lib/prisma";
import { Belt, Role } from "@/types/enums";

export async function createUser(
  name: string,
  email: string,
  role: Role,
  belt: Belt,
  stripes: number,
  enrollmentDate: Date,
) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
      belt,
      stripes,
      enrollmentDate,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function updateUserAfterInvite(
  email: string,
  supabaseAuthId: string,
  avatarUrl: string,
) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      supabaseAuthId,
      avatarUrl,
    },
  });

  return user;
}

export async function getUsers(roles: Role[]) {
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: roles,
      },
    },
    include: {
      _count: true,
    },
    orderBy: {
      enrollmentDate: "desc",
    },
  });

  return users;
}

export async function getMembersEnrolledThisMonth() {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const users = await prisma.user.count({
    where: {
      role: "MEMBER",
      enrollmentDate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
  });

  return users;
}
