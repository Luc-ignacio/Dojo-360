import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import {
  startOfWeek,
  startOfDay,
  endOfDay,
  addDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const formattedDate = date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}

const GYM_TIMEZONE = process.env.GYM_TIMEZONE || "Australia/Brisbane";

export function zonedNow(tz: string = GYM_TIMEZONE): Date {
  return toZonedTime(new Date(), tz);
}

export function toUtc(date: Date, tz: string = GYM_TIMEZONE): Date {
  return fromZonedTime(date, tz);
}

export function getNextWeekMonday(tz: string = GYM_TIMEZONE): Date {
  const now = zonedNow(tz);
  const thisMonday = startOfWeek(now, { weekStartsOn: 1 });
  return toUtc(addDays(thisMonday, 7), tz);
}

export function getWeekMondayZoned(
  weekOffset = 0,
  tz: string = GYM_TIMEZONE,
): Date {
  const now = zonedNow(tz);
  const monday = startOfWeek(now, { weekStartsOn: 1 });
  return addDays(monday, weekOffset * 7);
}

export function getMonthBounds(monthOffset = 0, tz: string = GYM_TIMEZONE) {
  const now = zonedNow(tz);

  const targetDate = new Date(now);
  targetDate.setMonth(targetDate.getMonth() + monthOffset);

  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  return {
    start: toUtc(monthStart, tz),
    end: toUtc(monthEnd, tz),
  };
}

export function getWeekBounds(weekOffset = 0, tz: string = GYM_TIMEZONE) {
  const now = zonedNow(tz);
  const monday = addDays(startOfWeek(now, { weekStartsOn: 1 }), weekOffset * 7);
  const sunday = endOfDay(addDays(monday, 6));

  return { start: toUtc(monday, tz), end: toUtc(sunday, tz) };
}

export function getTodayBounds(tz: string = GYM_TIMEZONE) {
  const now = zonedNow(tz);
  return {
    start: toUtc(startOfDay(now), tz),
    end: toUtc(endOfDay(now), tz),
  };
}

export function formatGymDate(date: Date, tz: string = GYM_TIMEZONE): string {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    timeZone: tz,
  });
}
