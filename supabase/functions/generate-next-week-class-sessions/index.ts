import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { startOfWeek, addDays, endOfDay } from "date-fns";

const GYM_TIMEZONE = Deno.env.get("GYM_TIMEZONE") || "Australia/Brisbane";

const DAY_TO_INDEX: Record<string, number> = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

function zonedNow(tz: string = GYM_TIMEZONE): Date {
  return toZonedTime(new Date(), tz);
}

function toUtc(date: Date, tz: string = GYM_TIMEZONE): Date {
  return fromZonedTime(date, tz);
}

// weekOffset: 0 = current week, 1 = next week
function getWeekMondayZoned(weekOffset = 0, tz: string = GYM_TIMEZONE): Date {
  const now = zonedNow(tz);
  const monday = startOfWeek(now, { weekStartsOn: 1 });
  return addDays(monday, weekOffset * 7);
}

function formatGymDate(date: Date, tz: string = GYM_TIMEZONE): string {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    timeZone: tz,
  });
}

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let weekOffset = 1;
  try {
    const body = await req.json();
    if (typeof body?.weekOffset === "number") {
      weekOffset = body.weekOffset;
    }
  } catch {
    // No body provided — fall back to default (next week)
  }

  const weekMondayZoned = getWeekMondayZoned(weekOffset);
  const weekSundayZoned = addDays(weekMondayZoned, 6);

  const weekMonday = toUtc(weekMondayZoned);
  const weekSunday = toUtc(endOfDay(weekSundayZoned));

  const { data: schedules, error: schedulesError } = await supabase
    .from("ClassSchedule")
    .select("*")
    .eq("isActive", true);

  if (schedulesError) {
    console.error("Schedules error:", schedulesError);
    return Response.json({ error: schedulesError.message }, { status: 500 });
  }
  if (!schedules?.length) {
    return Response.json(
      { error: "No active schedules found" },
      { status: 404 },
    );
  }

  const { data: existingSessions } = await supabase
    .from("ClassSession")
    .select("scheduleId, scheduledDate")
    .in(
      "scheduleId",
      schedules.map((s) => s.id),
    )
    .gte("scheduledDate", weekMonday.toISOString())
    .lte("scheduledDate", weekSunday.toISOString());

  const existingKeys = new Set(
    (existingSessions ?? []).map(
      (s) => `${s.scheduleId}-${s.scheduledDate.split("T")[0]}`,
    ),
  );

  const sessionsToCreate = schedules
    .map((schedule) => {
      const zonedDate = addDays(
        weekMondayZoned,
        DAY_TO_INDEX[schedule.dayOfWeek],
      );
      const date = toUtc(zonedDate);
      const key = `${schedule.id}-${date.toISOString().split("T")[0]}`;
      if (existingKeys.has(key)) return null;
      return {
        id: crypto.randomUUID(),
        scheduleId: schedule.id,
        name: schedule.name,
        instructorId: schedule.instructorId,
        scheduledDate: date.toISOString(),
        isCancelled: false,
      };
    })
    .filter(Boolean);

  if (sessionsToCreate.length > 0) {
    const { error: insertError } = await supabase
      .from("ClassSession")
      .insert(sessionsToCreate);

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }
  }

  const weekLabel = `${formatGymDate(weekMonday)} – ${formatGymDate(weekSunday)}`;

  console.log(
    `[CRON] Created ${sessionsToCreate.length} sessions for ${weekLabel} (weekOffset=${weekOffset})`,
  );

  return Response.json({
    success: true,
    created: sessionsToCreate.length,
    skipped: schedules.length - sessionsToCreate.length,
    weekLabel,
  });
});
